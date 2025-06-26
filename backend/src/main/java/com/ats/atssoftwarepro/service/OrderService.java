package com.ats.atssoftwarepro.service;

import com.ats.atssoftwarepro.dto.OrderRecord;
import com.ats.atssoftwarepro.dto.OrderRequest;

import java.util.List;

public interface OrderService {
    OrderRecord createOrder(OrderRequest orderRequest);
    List<OrderRecord> getMyOrders();
    void deleteOrder(Long orderId);
}
