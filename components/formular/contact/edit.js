import styles from "../../../styles/Form.module.css";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function FormEditContact({ customers, caregivers }) {
  // Customers and caregivers Object Array
  const data = {
    customers: JSON.parse(customers),
    caregivers: JSON.parse(caregivers),
  };
  // Contact type ("customer" or "caregiver")
  const [ContactType, setContactType] = useState("customer");
  // The selected contact
  const [selectedContact, setSelectedContact] = useState({});
  // The edited contact
  const [editedContact, setEditedContact] = useState({});

  // Set edited contact to selected contact when a contact is selected
  useEffect(() => {
    setEditedContact(selectedContact);
  }, [selectedContact]);

  // Set selected contact on given contact type when contact type changes
  useEffect(() => {
    if (ContactType == "customer") {
      setSelectedContact(data.customers[0]);
    }
    if (ContactType == "caregiver") {
      setSelectedContact(data.caregivers[0]);
    }
  }, [ContactType]);
  useEffect(() => {
    if (ContactType == "customer") {
      setSelectedContact(data.customers[0]);
    }
    if (ContactType == "caregiver") {
      setSelectedContact(data.caregivers[0]);
    }
  }, []);

  // Handle submit of the form
  const handleSubmit = async (event) => {
    // Prevent default action of form
    event.preventDefault();

    // fetch api call to edit a contact
    const response = await fetch("/api/contact/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Contact-Type": ContactType,
      },
      body: JSON.stringify({
        _id: selectedContact._id,
        name: editedContact.name,
        lastname: editedContact.lastname,
        birthdate: new Date(editedContact.birthdate),
        adress: {
          street: editedContact.adress.street,
          nr: editedContact.adress.nr,
          zip: editedContact.adress.zip,
          city: editedContact.adress.city,
        },
        email: editedContact.email,
        inhouse: editedContact.inhouse,
      }),
    });
    Router.reload(window.location.pathname);
  };

  return (
    <>
      <h1>Kontakt Bearbeiten:</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.optionContainer}>
          <div className={styles.option}>
            <input
              type="radio"
              name="type"
              id="customer"
              value="customer"
              onChange={() => setContactType("customer")}
              defaultChecked={true}
            />
            <label htmlFor="customer">Kunde</label>
          </div>
          <div className={styles.option}>
            <input
              type="radio"
              name="type"
              id="caregiver"
              value="caregiver"
              onChange={() => setContactType("caregiver")}
            />
            <label htmlFor="caregiver">Pflegekraft</label>
          </div>
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="select">Kontakt zum Bearbeiten auswählen: </label>
          <select
            name="select"
            className={styles.textSelect}
            onChange={(event) => {
              if (ContactType == "customer") {
                data.customers.forEach((customer) => {
                  if (customer._id == event.target.value) {
                    setSelectedContact(customer);
                  }
                });
              }
              if (ContactType == "caregiver") {
                data.caregivers.forEach((caregiver) => {
                  if (caregiver._id == event.target.value) {
                    setSelectedContact(caregiver);
                  }
                });
              }
            }}
          >
            {ContactType == "customer" &&
              data.customers.map((customer) => {
                return (
                  <option key={customer._id} value={customer._id}>
                    {customer.lastname}, {customer.name}
                  </option>
                );
              })}
            {ContactType == "caregiver" &&
              data.caregivers.map((caregiver) => {
                return (
                  <option key={caregiver._id} value={caregiver._id}>
                    {caregiver.lastname}, {caregiver.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Im Pflegeheim: </label>
          <input
            type="checkbox"
            name="inhouse"
            defaultChecked={selectedContact.inhouse}
            onChange={(event) =>
              setEditedContact({
                ...editedContact,
                inhouse: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Nachname: </label>
          <input
            type="text"
            name="lastname"
            placeholder="Nachname eingeben..."
            required={true}
            defaultValue={selectedContact.lastname}
            onChange={(event) =>
              setEditedContact({
                ...editedContact,
                lastname: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Vorname: </label>
          <input
            type="text"
            name="name"
            placeholder="Vorname eingeben..."
            required={true}
            defaultValue={selectedContact.name}
            onChange={(event) =>
              setEditedContact({
                ...editedContact,
                name: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Geburtsdatum: </label>
          <input
            type="date"
            name="birthdate"
            required={true}
            defaultValue={
              selectedContact.birthdate
                ? new Date(selectedContact.birthdate)
                    .toISOString()
                    .substring(0, 10)
                : ""
            }
            onChange={(event) =>
              setEditedContact({
                ...editedContact,
                birthdate: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.adressContainer}>
          <div className={styles.adressInput}>
            <label htmlFor="id">Straße: </label>
            <input
              type="text"
              name="street"
              placeholder="Straße eingeben..."
              required={true}
              defaultValue={
                selectedContact.adress === undefined
                  ? null
                  : selectedContact.adress.street
              }
              onChange={(event) =>
                setEditedContact({
                  ...editedContact,
                  adress: {
                    ...editedContact.adress,
                    street: event.target.value,
                  },
                })
              }
            />
          </div>
          <div className={styles.adressInput}>
            <label htmlFor="id">Hausnummer: </label>
            <input
              type="number"
              name="nr"
              placeholder="Hausnummer eingeben..."
              required={true}
              defaultValue={
                selectedContact.adress === undefined
                  ? null
                  : selectedContact.adress.nr
              }
              onChange={(event) =>
                setEditedContact({
                  ...editedContact,
                  adress: {
                    ...editedContact.adress,
                    nr: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className={styles.adressContainer}>
          <div className={styles.adressInput}>
            <label htmlFor="id">PLZ: </label>
            <input
              type="number"
              name="zip"
              placeholder="PLZ eingeben..."
              required={true}
              defaultValue={
                selectedContact.adress === undefined
                  ? null
                  : selectedContact.adress.zip
              }
              onChange={(event) =>
                setEditedContact({
                  ...editedContact,
                  adress: {
                    ...editedContact.adress,
                    zip: event.target.value,
                  },
                })
              }
            />
          </div>
          <div className={styles.adressInput}>
            <label htmlFor="id">Stadt: </label>
            <input
              type="text"
              name="city"
              placeholder="Stadt eingeben..."
              required={true}
              defaultValue={
                selectedContact.adress === undefined
                  ? null
                  : selectedContact.adress.city
              }
              onChange={(event) =>
                setEditedContact({
                  ...editedContact,
                  adress: {
                    ...editedContact.adress,
                    city: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">E-Mail: </label>
          <input
            type="email"
            name="email"
            placeholder="E-Mail eingeben..."
            required={true}
            defaultValue={selectedContact.email}
            onChange={(event) =>
              setEditedContact({
                ...editedContact,
                email: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.submitContainer}>
          <button type="submit" name="submit">
            Speichern
          </button>
        </div>
      </form>
    </>
  );
}
