package com.example.metalops.mapper;

import com.example.metalops.dto.CustomerDto;
import com.example.metalops.entity.Customer;

public class CustomerMapper {

    public static Customer mapToCustomer (CustomerDto customerDto) {
        return new Customer(
                customerDto.getCustomerId(),
                customerDto.getName(),
                customerDto.getCompanyName(),
                customerDto.getAddress(),
                customerDto.getContact(),
                customerDto.getEmail()
        );
    }

    public static CustomerDto mapToCustomerDto(Customer customer) {
        return new CustomerDto(
                customer.getCustomerId(),
                customer.getName(),
                customer.getCompanyName(),
                customer.getAddress(),
                customer.getContact(),
                customer.getEmail()

        );
    }
}
