package com.example.metalops.dto;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class OrderDto {
    private Long orderId;
    private Long  customerId;
    private Date orderDate;
    private String orderStatus;
    private Double totalAmount;
    private String paymentStatus;

    @Override
    public String toString() {
        return "OrderDto{" +
                "orderId=" + orderId +
                ", customerId=" + customerId +
                ", orderDate=" + orderDate +
                ", orderStatus= " + orderStatus +
                ", totalAmount= " + totalAmount +
                ", paymentStatus= " + paymentStatus+
                '}';
    }
}
