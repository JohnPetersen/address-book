package com.petersen.john.addressbook.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.petersen.john.addressbook.domain.AddressBook;
import com.petersen.john.addressbook.domain.Contact;

@RepositoryRestResource(collectionResourceRel = "contacts", path = "contacts")
public interface ContactRepository extends
		PagingAndSortingRepository<Contact, Long> {
	Contact findByAddressBookAndName(AddressBook addressBook, String name);
}
