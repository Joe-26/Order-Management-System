package com.example.metalops.controller;

import com.example.metalops.dto.CustomerDto;
import com.example.metalops.dto.OrderDto;
import com.example.metalops.entity.Order;
import com.example.metalops.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private OrderService orderService;

    //REST API to get All Orders
    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders(){
        return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
    }

    // REST API to get the Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<List<Double>> getTotalRevenue(){
        return new ResponseEntity<>(orderService.getDashboardData(), HttpStatus.OK);
    }

    //REST API to get Order By ID
    @GetMapping("{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable("id") Long orderId){
        return new ResponseEntity<>(orderService.getOrderById(orderId), HttpStatus.OK);
    }

    //REST API to create an Order
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto){
        OrderDto createdOrderDto = orderService.createOrder(orderDto);
        return new ResponseEntity<>(createdOrderDto, HttpStatus.CREATED);
    }

    // REST API for updating an order
    @PutMapping("{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable("id") Long orderId, @RequestBody OrderDto orderDto){
        OrderDto updateOrderDto = orderService.updateOrder(orderId, orderDto);
        return new ResponseEntity<>(updateOrderDto, HttpStatus.OK);
    }

    // REST API for deleting an order
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable("id") Long orderId){
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok("Order ID - "+orderId+" Deleted");
    }


}
