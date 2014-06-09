function AddressBook(userName, password) {
  this.userName = userName;
  this.password = password;
}

function Contact(id, name, street, city, state, zip, phone, addressBookUrl) {
  this.id = id;
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.phone = phone;
  this._links = {
      addressBook: {
        href:addressBookUrl
      }
  };
}
