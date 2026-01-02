import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch(
      "https://contactmanager-backend-m8wo.onrender.com/api/contacts"
    );
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <h2>Contact Manager</h2>
      <ContactForm onAdd={fetchContacts} />
      <ContactList contacts={contacts} onDelete={fetchContacts} />
    </div>
  );
}

export default App;
