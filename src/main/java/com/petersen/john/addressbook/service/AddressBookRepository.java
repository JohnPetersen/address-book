package com.petersen.john.addressbook.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.petersen.john.addressbook.domain.AddressBook;

@RepositoryRestResource(collectionResourceRel = "addressbooks", path = "addressbooks")
public interface AddressBookRepository extends
		PagingAndSortingRepository<AddressBook, Long> {
	AddressBook findByUserName(@Param("name") String userName);
	AddressBook findByUserNameAndPassword(@Param("name") String userName,
			@Param("pw") String password);
}
