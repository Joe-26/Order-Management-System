package com.example.metalops.repository;

import com.example.metalops.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT ROUND(SUM(totalAmount), 2) FROM Order")
    Double sumTotal();

    @Query("SELECT COUNT(orderStatus) FROM Order WHERE orderStatus = 'Delivered'")
    Double countOrdersDelivered();

    @Query("SELECT COUNT(orderStatus) FROM Order WHERE orderStatus = 'Processing'")
    Double countOrdersProcessing();

    @Query("SELECT ROUND(SUM(totalAmount), 2) FROM Order WHERE paymentStatus = 'Pending'")
    Double sumPaymentPending();
}
