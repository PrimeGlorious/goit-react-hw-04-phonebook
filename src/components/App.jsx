import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts && savedContacts.length !== 0) {
      setContacts([...savedContacts]);
    }
  }, []);

  useEffect(() => {
    const savedContacts = JSON.stringify(contacts);

    if (savedContacts) {
      localStorage.setItem('contacts', savedContacts);
    }
  }, [contacts]);

  const onInputChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const onDeleteBtn = (contactId) => {
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts([...newContacts]);
  }

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const addContact = (name, number) => {
    const names = contacts.map(contact => contact.name);
    const currentName = name;
    const currentNumber = number;
    if (!names.includes(currentName)) {
      const randomId = nanoid();

      setContacts([
        ...contacts,
        {
          name: currentName,
          id: randomId,
          number: currentNumber,
        },
      ]);
    } else {
      alert(`${currentName} already added!  `);
    }
  };

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact}/>

        <h2>Contacts</h2>
        <Filter onInputChange={onInputChange} filter={filter} />
        {contacts.length > 0 &&
          <ContactList filteredContacts={filteredContacts} onDeleteBtn={onDeleteBtn}
        />}
      </div>
    )
};
