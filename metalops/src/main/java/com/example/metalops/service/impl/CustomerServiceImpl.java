package com.example.metalops.service.impl;

import com.example.metalops.dto.CustomerDto;
import com.example.metalops.entity.Customer;
import com.example.metalops.exception.ResourceNotFoundException;
import com.example.metalops.mapper.CustomerMapper;
import com.example.metalops.repository.CustomerRepository;
import com.example.metalops.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository; //Injecting Dependency

    @Override
    public CustomerDto createCustomer(CustomerDto customerDto) {
        //Converting because we need to save Customer into the repository & not CustomerDto
        Customer customer = CustomerMapper.mapToCustomer(customerDto);
        Customer savedCustomer = customerRepository.save(customer);

        return CustomerMapper.mapToCustomerDto(savedCustomer);
    }

    @Override
    public CustomerDto getCustomerById(Long customerId) {
        Customer fetchedCustomer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with Id - "+customerId));
        return CustomerMapper.mapToCustomerDto(fetchedCustomer);
    }

    @Override
    public List<CustomerDto> getAllCustomers() {
        List<Customer> customerList = customerRepository.findAll();
        return customerList.stream().map(CustomerMapper::mapToCustomerDto).toList();
    }

    @Override
    public Integer totalCustomers() {
        return customerRepository.totalCustomers();
    }

    @Override
    public void deleteCustomerById(Long customerId) {
        customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer with id - "+customerId+" not found."));
        customerRepository.deleteById(customerId);
    }

    @Override
    public CustomerDto updateCustomer(Long customerId, CustomerDto customerDto) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found."));

        customer.setName(customerDto.getName());
        customer.setAddress(customerDto.getAddress());
        customer.setEmail(customerDto.getEmail());
        customer.setContact(customerDto.getContact());
        customer.setAddress(customerDto.getAddress());
        customer.setCompanyName(customerDto.getCompanyName());

        customerRepository.save(customer);
        return CustomerMapper.mapToCustomerDto(customer);
    }


}
