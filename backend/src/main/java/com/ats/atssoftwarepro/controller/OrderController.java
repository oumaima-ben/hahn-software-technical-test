package com.ats.atssoftwarepro.controller;

import com.ats.atssoftwarepro.dto.OrderRecord;
import com.ats.atssoftwarepro.dto.OrderRequest;
import com.ats.atssoftwarepro.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Orders", description = "APIs for managing user orders")
@SecurityRequirement(name = "jwtAuth")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Create a new order from a list of products")
    @PostMapping
    public ResponseEntity<OrderRecord> createOrder(@Valid @RequestBody OrderRequest orderRequest) {
        OrderRecord createdOrder = orderService.createOrder(orderRequest);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all orders for the currently authenticated user")
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderRecord>> getMyOrders() {
        return ResponseEntity.ok(orderService.getMyOrders());
    }

    @Operation(summary = "Delete an order by its ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

}
