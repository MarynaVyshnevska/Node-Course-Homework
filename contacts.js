const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // console.log(contacts);
    return contacts;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const rezult = contacts.find(contact => contact.id === contactId);
    if (!rezult) {
        return null;
    };
    return rezult;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();

    const i = contacts.findIndex(contact => contact.id === contactId);
    if (i === -1) {
        return null;
    };

    const updateContacts = contacts.filter((_, idx) => idx !== i);
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    
    return contacts[i];
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { name: name, email: email, phone: phone, id: uuidv4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}



module.exports = { listContacts, getContactById, removeContact, addContact };