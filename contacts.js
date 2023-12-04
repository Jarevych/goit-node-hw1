const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts () {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8')
        const contacts = JSON.parse(data)
        return contacts
    } catch (err) {
    console.error(err.message)
        return[]
    }
  }
  
  async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8')
        const contacts = JSON.parse(data)
        const contact = contacts.find((c) => c.id === contactId)
        return contact || null
    } catch (err) {
    console.error(err.massage)
        return null
    }  }
  
  async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8')
        const contacts = JSON.parse(data)
        const removedContact = contacts.find((c) => c.id === contactId)
        const updatedContacts = contacts.filter((c) => c.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
        return removedContact
    } catch (err) {
    console.error(err.massage)
        return null
    }  }
  
  async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8')
        const contacts = JSON.parse(data)
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            phone,
        };
        const updatedContacts = [...contacts, newContact]
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
        return newContact
    } catch (err) {
    console.error(err.massage)
        return null
    }  
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
 