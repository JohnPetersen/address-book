package com.petersen.john.addressbook.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.NaturalId;

@Entity
public class AddressBook implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;

	@Column(unique = true, nullable = false)
	@NaturalId
	private String userName;

	@Column(nullable = false)
	private String password;

	@OneToMany(mappedBy = "addressBook")
	private Set<Contact> contacts;

	protected AddressBook() {
	}

	public AddressBook(String userName, String password) {
		this.userName = userName;
		this.password = password;
	}

	public Long getId() {
		return id;
	}
	
	public String getUserName() {
		return userName;
	}

	public String getPassword() {
		return password;
	}

	public Set<Contact> getContacts() {
		return contacts;
	}

}
