package com.example.metalops.controller;

import com.example.metalops.dto.CustomerDto;
import com.example.metalops.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private CustomerService customerService;

    // REST API to POST new Customer
    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customerDto){
        CustomerDto savedCustomer = customerService.createCustomer(customerDto);
        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }

    // REST API for getting customer by ID
    @GetMapping("{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable("id") Long customerId){
        CustomerDto fetchedCustomer = customerService.getCustomerById(customerId);
        return new ResponseEntity<>(fetchedCustomer, HttpStatus.OK);
    }

    // REST API to get all customers
    @GetMapping
    public ResponseEntity<List<CustomerDto>> getAllCustomers(){
        List<CustomerDto> customerDtoList = customerService.getAllCustomers();
        return new ResponseEntity<>(customerDtoList, HttpStatus.OK);
    }

    // REST API to get count of customers
    @GetMapping("/count")
    public ResponseEntity<Integer> getCustomerCount(){
        return new ResponseEntity<>(customerService.totalCustomers(), HttpStatus.OK);
    }

    // REST API to Delete customer by ID
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCustomerById(@PathVariable("id") Long customerId){
        customerService.deleteCustomerById(customerId);
        return ResponseEntity.ok("Employee deleted successfully with id - "+ customerId);
    }

    // REST API to Update customer by ID
    @PutMapping("{id}")
    public ResponseEntity<CustomerDto> updateCustomerById(@PathVariable("id") Long customerId, @RequestBody CustomerDto customerDto){
        CustomerDto updatedCustomerDto = customerService.updateCustomer(customerId, customerDto);
        return ResponseEntity.ok(updatedCustomerDto);
    }
}
