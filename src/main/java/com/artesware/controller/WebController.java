package com.artesware.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.artesware.entity.Customer;
import com.artesware.entity.Sale;
import com.artesware.service.CustomerRepository;
import com.artesware.service.SaleRepository;

@RestController
public class WebController {

	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private SaleRepository saleRepository;
	
	@GetMapping("/customers")
	public List<Customer> getCustomers() {
		return (List<Customer>) customerRepository.findAll();
	}
	
	@GetMapping("/sales")
	public List<Sale> getSales() {
		return (List<Sale>) saleRepository.findAll();
	}
	
	@PostMapping("/addCustomer")
	@ResponseBody
	public Customer addCustomer(@RequestBody Map newCustomer) {
		System.out.println(newCustomer);
		Customer cust = new Customer();
		cust.setName((String) newCustomer.get("name"));
		cust.setEmail((String) newCustomer.get("email"));
		cust.setAge(Integer.valueOf(newCustomer.get("age").toString()));
		customerRepository.save(cust);
		return cust;
	}
	
	@PostMapping("/updateCustomer")
	@ResponseBody
	public Customer updateCustomer(@RequestBody Map editingCustomer) {
		System.out.println(editingCustomer);
		Long id = Long.valueOf(editingCustomer.get("id").toString());
		Customer cust = customerRepository.findOne(id);
		if(cust != null) {
			cust.setName((String) editingCustomer.get("name"));
			cust.setEmail((String) editingCustomer.get("email"));
			cust.setAge(Integer.valueOf(editingCustomer.get("age").toString()));
			customerRepository.save(cust);
			return cust;
		}
		return null;
	}
}