package com.ats.atssoftwarepro.service;

import com.ats.atssoftwarepro.dto.OrderItemRequest;
import com.ats.atssoftwarepro.dto.OrderRecord;
import com.ats.atssoftwarepro.dto.OrderRequest;
import com.ats.atssoftwarepro.entity.Order;
import com.ats.atssoftwarepro.entity.OrderItem;
import com.ats.atssoftwarepro.entity.Product;
import com.ats.atssoftwarepro.entity.User;
import com.ats.atssoftwarepro.exceptions.AppException;
import com.ats.atssoftwarepro.exceptions.ResourceNotFoundException;
import com.ats.atssoftwarepro.mapper.OrderMapper;
import com.ats.atssoftwarepro.repository.OrderRepository;
import com.ats.atssoftwarepro.repository.ProductRepository;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional
    public OrderRecord createOrder(@NotNull OrderRequest orderRequest) {
        log.info("Creating Order for user: {}", getCurrentUser().getEmail());
        Order order = new Order();
        order.setUser(getCurrentUser());
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal[] totalAmount = {BigDecimal.ZERO};

        orderRequest.items().forEach(itemRequest -> {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemRequest.productId()));

            if (product.getStockQuantity() < itemRequest.quantity()) {
                throw new AppException("Insufficient stock for product: " + product.getName(), HttpStatus.BAD_REQUEST);
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.quantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);

            totalAmount[0] = totalAmount[0].add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.quantity())));

            // Decrease stock
            product.setStockQuantity(product.getStockQuantity() - itemRequest.quantity());
            productRepository.save(product);
        });

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount[0]);

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);

    }

    @Override
    public List<OrderRecord> getMyOrders() {
        return orderRepository.findByUserId(getCurrentUser().getId()).stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            if (product != null) {
                product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                productRepository.save(product);
            }
        }

        User user = order.getUser();

        //Remove the connection between order and user
        if (user != null) {
            user.getOrders().remove(order);
        }

        orderRepository.delete(order);

    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
