const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // Choose any port you prefer

app.use(bodyParser.json());
app.use(cors());

// Sample data
let contacts = [
  {
    id: 1,
    firstName: 'Arif',
    lastName: 'Rahman',
    numberPhone: '1234567890',
    address: 'Jaksel',
  },
  {
    id: 2,
    firstName: 'Jamal',
    lastName: 'Smith',
    numberPhone: '9876543210',
    address: 'Jakbar',
  },
];

// Route: Get all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Route: Get a single contact by ID
app.get('/contacts/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Route: Create a new contact
app.post('/contacts', (req, res) => {
  const newContact = req.body;
  newContact.id = contacts.length + 1;
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Route: Update a contact by ID
app.put('/contacts/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  const updatedContact = req.body;

  contacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      return { ...contact, ...updatedContact };
    }
    return contact;
  });

  res.json(updatedContact);
});

// Route: Delete a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  contacts = contacts.filter((contact) => contact.id !== contactId);
  res.json({ message: 'Contact deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});