
insert into address_book(user_name, password) values ('John', 'password')
insert into contact(address_book_id, name, street, city, state, zip, phone) values (1, 'Sara', '123 Main St', 'Sacramento', 'CA', '95818', '9165551212'), (1, 'Max', null, null, null, null, '9165551234'), (1, 'Some Realy Long Name', '123 ABC Avenue', 'Sacramento', 'CA', '95818', '9165551212')

insert into address_book(user_name, password) values ('Ken', 'password')
insert into contact(address_book_id, name, street, city, state, zip, phone) values (2, 'Scott Jones', '123 Main St', 'Folsom', 'CA', '95630', '9165551212'), (2, 'Parker', null, null, null, null, '9165554321'), (2, 'Another Realy Long Name', '123 ABC Avenue', 'Sacramento', 'CA', '95818', '9165551212')

