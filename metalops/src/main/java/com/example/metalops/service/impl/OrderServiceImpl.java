package com.example.metalops.service.impl;

import com.example.metalops.dto.CustomerDto;
import com.example.metalops.dto.OrderDto;
import com.example.metalops.entity.Customer;
import com.example.metalops.entity.Order;
import com.example.metalops.exception.ResourceNotFoundException;
import com.example.metalops.mapper.CustomerMapper;
import com.example.metalops.mapper.OrderMapper;
import com.example.metalops.repository.OrderRepository;
import com.example.metalops.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;

    @Override
    public List<OrderDto> getAllOrder() {
        List<Order> orderList = orderRepository.findAll();

        return orderList.stream().map(OrderMapper::mapToOrderDto).toList();
    }

    @Override
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with id - " + orderId + " not found."));
        return OrderMapper.mapToOrderDto(order);
    }

    @Override
    public List<Double> getDashboardData() {
        return List.of(

                orderRepository.sumTotal(),
                orderRepository.sumPaymentPending(),
                orderRepository.countOrdersDelivered(),
                orderRepository.countOrdersProcessing()
        );
    }

    @Override
    public List<String> getTopCustomers() {
        return orderRepository.top3customers();
    }

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        Order newOrder = OrderMapper.mapToOrder(orderDto);
        Order savedOrder = orderRepository.save(newOrder);
        return OrderMapper.mapToOrderDto(savedOrder);
    }

    @Override
    public OrderDto updateOrder(Long orderId, OrderDto orderDto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with id - " + orderId + " not found."));

        order.setCustomerId(orderDto.getCustomerId() != null ? orderDto.getCustomerId() : order.getCustomerId());
        order.setOrderDate(orderDto.getOrderDate() != null ? orderDto.getOrderDate() : order.getOrderDate());
        order.setOrderStatus(orderDto.getOrderStatus() != null ? orderDto.getOrderStatus(): order.getOrderStatus());
        order.setTotalAmount(orderDto.getTotalAmount() != null ? orderDto.getTotalAmount(): order.getTotalAmount());
        order.setPaymentStatus(orderDto.getPaymentStatus() != null ? orderDto.getPaymentStatus(): order.getPaymentStatus());

        orderRepository.save(order);
        return OrderMapper.mapToOrderDto(order);
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderRepository.findById(orderId)
                        .orElseThrow(() -> new ResourceNotFoundException("Order with id - " + orderId + " not found."));
        orderRepository.deleteById(orderId);
    }

}
