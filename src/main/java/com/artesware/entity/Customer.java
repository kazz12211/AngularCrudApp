package com.artesware.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class Customer {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String name;
	private String email;
	private Integer age;
	@OneToMany(cascade={CascadeType.REMOVE,CascadeType.REFRESH}, fetch=FetchType.LAZY)
	private List<Sale> sales;
	
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
		
	public List<Sale> getSales() {
		return sales;
	}
	public String toString() {
		return "Customer[id: " + id + ", name: " + name + ", email: " + email + ", age: " + age + "]";
	}
}
