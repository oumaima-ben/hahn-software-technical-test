package com.ats.atssoftwarepro.mapper;

import com.ats.atssoftwarepro.dto.OrderItemRecord;
import com.ats.atssoftwarepro.dto.OrderRecord;
import com.ats.atssoftwarepro.entity.Order;
import com.ats.atssoftwarepro.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "user.id", target = "userId")
    OrderRecord toDto(Order order);

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    OrderItemRecord toOrderItemDto(OrderItem orderItem);
}
