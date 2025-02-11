package com.example.metalops.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long orderId;

    @Column(name = "customer_id")
    private Long  customerId;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "payment_status")
    private String paymentStatus;
}
