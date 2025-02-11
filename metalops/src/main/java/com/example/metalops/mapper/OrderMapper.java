package com.example.metalops.mapper;

import com.example.metalops.dto.OrderDto;
import com.example.metalops.entity.Order;

public class OrderMapper {

    public static OrderDto mapToOrderDto(Order order){
        return new OrderDto(
                order.getOrderId(),
                order.getCustomerId(),
                order.getOrderDate(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                order.getPaymentStatus()
        );
    }

    public static Order mapToOrder(OrderDto orderDto){
        return new Order(
                orderDto.getOrderId(),
                orderDto.getCustomerId(),
                orderDto.getOrderDate(),
                orderDto.getOrderStatus(),
                orderDto.getTotalAmount(),
                orderDto.getPaymentStatus()
        );
    }
}
