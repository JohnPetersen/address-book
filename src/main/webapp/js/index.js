var contactsUrl = null;
var addressBookUrl = null;
var bloodhound = null;

function makeContactButtons(contact) {
  return '<button onclick="displayEditor(\'' + contact._links.self.href + '\')" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil"></span></button> <button onclick="deleteContact(\'' + contact._links.self.href + '\')" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove"></span></button>'
}

function display(contactArray) {
  contactArray.sort(function(a,b) {a.name.localeCompare(b.name)});
  $("#contact-table").empty();
  
  $.each(contactArray, function(i, contact) {
    $('<tr>').append($('<td>').text(contact.name),
        $('<td>').text(contact.street), $('<td>').text(contact.city),
        $('<td>').text(contact.state), $('<td>').text(contact.zip),
        $('<td>').text(contact.phone),
        $('<td>').html(makeContactButtons(contact)))
        .appendTo("#contact-table");
  });
}

function loadAddressBook() {
  // Load the user's address book.
  $.ajax({
    url : contactsUrl,
    type : "GET",
    dataType : "json",
    cache : false
  })
  .done(
      function(data, textStatus) {
        console.log("Received contacts for url %s.\n   Status: %s\n%o",
            contactsUrl, textStatus, data);
        var contactArray = [];
        if (data.hasOwnProperty("_embedded")) {
          contactArray = data._embedded.contacts;
        }
        updateSearch(contactArray);
        display(contactArray);
      })
  .fail(
      function(jqXHR, textStatus, errorThrown) {
        console
            .error(
                "Failed to get contacts for url %s.\n   Status: %s\n   Error Thrown: %s\n   XHR: %o",
                contactsUrl, textStatus, errorThrown, jqXHR);
      });
}

function deleteContact(targetContactUrl) {
  $.ajax({
    url : targetContactUrl,
    type : "DELETE",
    dataType : "json"
  })
  .done(
      function(data, textStatus) {
        console.log("Deleted contact %s.\n   Status: %s\n%o",
            targetContactUrl, textStatus, data);
        loadAddressBook();
      })
  .fail(
      function(jqXHR, textStatus, errorThrown) {
        console
            .error(
                "Failed to delete contact %s.\n   Status: %s\n   Error Thrown: %s\n   XHR: %o",
                targetContactUrl, textStatus, errorThrown, jqXHR);
      });
}

function saveContact() {
  // Pull values from modalAddEditContact dialog's fields.
  var contactId = null;
  if ($("#txtContactId").val() != null) {
    contactId = parseInt($("#txtContactId").val(),10);
  }
  var contact = new Contact(contactId,
      $("#txtContactName").val(),
      $("#txtContactStreet").val(),
      $("#txtContactCity").val(),
      $("#txtContactState").val(),
      $("#txtContactZip").val(),
      $("#txtContactPhone").val(),
      addressBookUrl);
  
  var jsonString = JSON.stringify(contact);
  console.log("Adding or updating contact, JSON: %s", jsonString);
  $.ajax({
    url : "/contacts",
    type : "POST",
    contentType: "application/json",
    data : jsonString
  })
  .done(
      function(data, textStatus) {
        console.log("Updated contact.\n   Status: %s\n%o",
            textStatus, contact);
        loadAddressBook();
      })
  .fail(
      function(jqXHR, textStatus, errorThrown) {
        console
            .error(
                "Failed to create or updated contact.\n   Status: %s\n   Error Thrown: %s\n   XHR: %o",
                textStatus, errorThrown, jqXHR);
      });
}

function createUser(name, password) {
  var jsonString = JSON.stringify(new AddressBook(name, password));
  console.log("Creating user, JSON: %s", jsonString);
  $.ajax({
    url : "/addressbooks",
    type : "POST",
    contentType: "application/json",
    data : jsonString
  })
  .done(
      function(data, textStatus) {
        console.log("Created user %s.\n   Status: %s\n%o",
            name, textStatus, data);
        checkUser(name, password);
      })
  .fail(
      function(jqXHR, textStatus, errorThrown) {
        console
            .error(
                "Failed to create user %s.\n   Status: %s\n   Error Thrown: %s\n   XHR: %o",
                name, textStatus, errorThrown, jqXHR);
      });
}

function checkUser(name, password) {
  console.log("doSignIn( %s, %s )", name, password);
  var queryUrl = "/addressbooks/search/findByUserNameAndPassword?name=" + 
      encodeURIComponent(name) + "&pw=" + encodeURIComponent(password);
  $.ajax({
    url : queryUrl,
    type : "GET",
    dataType : "json",
    cache : false
  })
  .done(
      function(data, textStatus) {
        console.log("Checking user %s.\n   Status: %s\n%o",
            name, textStatus, data);
        if (data.hasOwnProperty("_embedded")) {
          addressBookUrl = data._embedded.addressbooks[0]._links.self.href;
          contactsUrl = data._embedded.addressbooks[0]._links.contacts.href;
          loadAddressBook();
          $("#modalSignIn").modal("hide");
        } else {
          $("#signInMessage").show();
        }
      })
  .fail(
      function(jqXHR, textStatus, errorThrown) {
        console
            .log(
                "Failed to get user %s.\n   Status: %s\n   Error Thrown: %s\n   XHR: %o",
                name, textStatus, errorThrown, jqXHR);
        $("#signInMessage").show();
  });
}

function displayEditor(subjectUrl) {
  if (subjectUrl != null) {
    $("#modalAddEditContactLabel").text("Edit Contact");
    // TODO populate the editor with the selected contact.
    $("#modalAddEditContact").modal("show");
  } else {
    $("#modalAddEditContactLabel").text("New Contact");
    $("#modalAddEditContact").modal("show");
  }
}

function updateSearch(contactArray) {
  bloodhound.clear();
  bloodhound.add(contactArray);
}

$(document).ready(function() {

  // Wire up buttons
  $("#btnRegister").click(function(e) {
    console.log("Register clicked : ", e);
    createUser($("#txtName").val(), $("#txtPassword").val());
  });
  $("#btnSignIn").click(function(e) {
    console.log("Sign In clicked : ", e);
    checkUser($("#txtName").val(), $("#txtPassword").val());  
  });
  $("#btnSaveContact").click(function(e) {
    console.log("Save clicked : ", e);
    saveContact();
    $("#modalAddEditContact").modal("hide");
  });
  $("#btnAddEditContact").click(function(e) {
    displayEditor(null);
  });

  // Initialize new/edit dialog, but do not display it
  $("#modalAddEditContact").modal({
    show: false
  });
  $('#modalAddEditContact').on('shown.bs.modal', function () {
    $('#txtContactName').focus();
  });
  
  // Initialize the search box & engine
  bloodhound = new Bloodhound({
    name: 'bloodhound',
    local: [],
    datumTokenizer: function(d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });
  bloodhound.initialize();
  $("#txtSearch").typeahead(null, {
    name: 'bloodhound',
    displayKey: 'name',
    source: bloodhound.ttAdapter()
  });
  
  // Display the modal login dialog
  $("#modalSignIn").modal({
    backdrop : "static",
    keyboard : false
  });
  $('#modalSignIn').on('shown.bs.modal', function () {
    $('#txtName').focus();
  });
});