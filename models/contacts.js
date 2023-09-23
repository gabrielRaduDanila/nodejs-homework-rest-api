const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
    // console.table(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.filter((c) => c.id === contactId);
    if (contact.length > 0) {
      return contact;
    } else {
      return { message: 'no contact found' };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(newContacts);
    return { message: 'contact deleted' };
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const indexToUpdate = contacts.findIndex((item) => item.id === contactId);
    if (indexToUpdate !== -1) {
      contacts[indexToUpdate].name = body.name
        ? body.name
        : contacts[indexToUpdate].name;
      contacts[indexToUpdate].email = body.email
        ? body.email
        : contacts[indexToUpdate].email;
      contacts[indexToUpdate].phone = body.phone
        ? body.phone
        : contacts[indexToUpdate].phone;
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return { statusCode: 200, message: contacts };
    } else {
      return { statusCode: 404, message: { message: 'Not found' } };
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
