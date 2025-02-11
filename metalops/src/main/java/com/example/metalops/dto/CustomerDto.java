package com.example.metalops.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
    private Long customerId;
    private String name;
    private String companyName;
    private String address;
    private String contact;
    private String email;
}
