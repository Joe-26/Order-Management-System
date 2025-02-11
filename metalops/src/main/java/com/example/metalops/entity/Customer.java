package com.example.metalops.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name= "customers")
public class Customer {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long customerId;

    @Column(
            name = "customer_name",
            unique = true,
            nullable = false
    )
    private String name;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_address")
    private String address;

    @Column(name = "customer_contact")
    private String contact;

    @Column(
            name = "customer_email",
            nullable = false,
            unique = true
    )
    private String email;
}
