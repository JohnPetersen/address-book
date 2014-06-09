# address-book

A RESTful address book application.

## Prerequisites
- Java 1.7
- Maven 3
- An internet connection

## Building
1. mvn clean package

## Running
1. java -jar target\address-book-0.0.1-SNAPSHOT.jar
  2. -OR-  mvn spring-boot:run
2. http://localhost:8080/

## TODOs/bugs
1. New Contact entities are created, but not associated with the AddressBook.
2. The update dialog does not populate with the Contact's current data.
3. The search dialog does not filter the contact table.
4. The search dialog should be on the same level as the page heading.
5. Display an error message when trying to register with a name that is in use.
