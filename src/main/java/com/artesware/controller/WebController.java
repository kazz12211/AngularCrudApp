package com.artesware.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
	public Customer addCustomer(@RequestBody Map<String, Object> newCustomer) {
		System.out.println("Inserting");
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
	public Customer updateCustomer(@RequestBody Map<String, Object> editingCustomer) {
		System.out.println("Updating");
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
	
	@PostMapping("/deleteCustomer")
	@ResponseBody
	public Map<String, Object> deleteCustomer(@RequestBody Map<String, Object> customer) {
		System.out.println("Deleting");
		System.out.println(customer);
		Long id = Long.valueOf(customer.get("id").toString());
		customerRepository.delete(id);
		return customer;
		
	}
	
	static private DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss.S'Z'");
	
	@PostMapping("/updateSale")
	@ResponseBody
	public Sale updateSale(@RequestBody Map<String, Object> editingSale) {
		System.out.println("Updating");
		System.out.println(editingSale);
		Long id = Long.valueOf(editingSale.get("id").toString());
		Sale sale = saleRepository.findOne(id);
		if(sale != null) {
			try {
				sale.setSaleDate(DATE_FORMAT.parse(editingSale.get("saleDate").toString()));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			sale.setPrice(Double.valueOf(editingSale.get("price").toString()));
			sale.setProductName((String) editingSale.get("productName"));
			sale.setQuantity(Integer.valueOf(editingSale.get("quantity").toString()));
			saleRepository.save(sale);
			return sale;
		}
		return null;
	}
}