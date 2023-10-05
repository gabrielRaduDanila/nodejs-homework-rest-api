const Contact = require('./schemas/Schema');

async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error('Error to read contacts:', error);
    throw error;
  }
}

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
    return { message: 'no contact found' };
  }
};

const removeContact = async (contactId) => {
  try {
    const resp = await Contact.findByIdAndRemove(contactId);
    if (!resp) {
      return { message: 'the provided ID does not exist' };
    }
    return { message: 'contact deleted' };
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    await Contact.create(body);
    const newContacts = await Contact.find();
    return { statusCode: 200, message: newContacts };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 400,
      message: { message: 'a required field is not ok' },
    };
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return { statusCode: 200, message: updatedContact };
  } catch (error) {
    console.log(error.message);
    return { statusCode: 400, message: 'Invalid contactId' };
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    if (typeof body.favorite !== 'boolean') {
      return { statusCode: 400, message: 'Invalid favorite field' };
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      {
        new: true,
      }
    );
    return { statusCode: 200, message: updatedContact };
  } catch (error) {
    console.log(error.message);
    return { statusCode: 400, message: 'Invalid contactId' };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
