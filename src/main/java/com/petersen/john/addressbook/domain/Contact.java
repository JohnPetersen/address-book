package com.petersen.john.addressbook.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.NaturalId;

@Entity
public class Contact implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;

	@ManyToOne()
	@JoinColumn(name = "address_book_id")
	private AddressBook addressBook;

	@Column(nullable = false)
	@NaturalId
	private String name;

	@Column(nullable = true)
	private String street;

	@Column(nullable = true)
	private String city;

	@Column(nullable = true)
	private String state;

	@Column(nullable = true)
	private String zip;

	@Column(nullable = true)
	private String phone;

	protected Contact() {
	}

	public Contact(String name, String street, String city, String state,
			String zip, String phone) {
		this.name = name;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public AddressBook getAddressBook() {
		return addressBook;
	}

	public String getName() {
		return name;
	}

	public String getStreet() {
		return street;
	}

	public String getCity() {
		return city;
	}

	public String getState() {
		return state;
	}

	public String getZip() {
		return zip;
	}

	public String getPhone() {
		return phone;
	}

}
