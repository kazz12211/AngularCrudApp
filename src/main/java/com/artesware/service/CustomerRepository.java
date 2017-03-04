package com.artesware.service;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.artesware.entity.Customer;

public interface CustomerRepository extends PagingAndSortingRepository<Customer, Long> {

}
