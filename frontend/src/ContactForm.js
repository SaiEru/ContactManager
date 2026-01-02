import { useState } from "react";

function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const isValid =
    form.name &&
    form.phone &&
    (!form.email || /\S+@\S+\.\S+/.test(form.email));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    await fetch("https://contact-manager-backend.onrender.com/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    onAdd();
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Enter your Name*"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Enter Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Enter Phone(No.)*"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        placeholder="Enter Message(optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button disabled={!isValid}>Submit</button>
    </form>
  );
}

export default ContactForm;
