package com.example.metalops.service;

import com.example.metalops.dto.OrderDto;

import java.util.List;

public interface OrderService {
    // GET Methods
    List<OrderDto> getAllOrder();
    OrderDto getOrderById(Long orderId);
    List<Double> getDashboardData();


    //POST Methods
    OrderDto createOrder(OrderDto orderDto);

    //PUT Method
    OrderDto updateOrder(Long orderId, OrderDto orderDto);

    // DELETE Method
    void deleteOrder(Long orderId);
}
