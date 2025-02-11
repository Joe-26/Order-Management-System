package com.example.metalops.service;

import com.example.metalops.dto.CustomerDto;

import java.util.List;

public interface CustomerService {

    // POST method
    CustomerDto createCustomer(CustomerDto customerDto);

    // GET methods
    CustomerDto getCustomerById(Long customerId);
    List<CustomerDto> getAllCustomers();

    Integer totalCustomers();

    //DELETE method
    void deleteCustomerById(Long customerId);

    //UPDATE method
    CustomerDto updateCustomer(Long customerId, CustomerDto customerDto);
}
