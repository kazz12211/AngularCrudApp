package com.artesware.service;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.artesware.entity.Sale;

public interface SaleRepository extends PagingAndSortingRepository<Sale, Long> {

}
