const express = require('express');

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  res.status(200);
  const data = await listContacts();
  res.json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    res.status(200);
    const contact = await getContactById(id);
    res.json(contact);
  } else {
    res.status(404);
    res.json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.email || !body.phone) {
    res.status(400);
    res.json({ message: 'missing required name field' });
    return;
  }
  res.status(201);
  const data = await addContact(body);
  res.json(data);
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    res.status(200);
    const data = await removeContact(id);
    res.json(data);
  } else {
    res.status(404);
    res.json({ message: 'Not found' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ message: 'missing fields' });
  } else {
    const { statusCode, message } = await updateContact(contactId, body);
    res.status(statusCode);
    res.json(message);
  }
});

module.exports = router;
