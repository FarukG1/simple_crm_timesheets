import styles from "../../../styles/Form.module.css";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function FormDeleteContact({ customers, caregivers }) {
  // Customers and caregivers Object Array
  const data = {
    customers: JSON.parse(customers),
    caregivers: JSON.parse(caregivers),
  };
  // Contact type ("customer" or "caregiver")
  const [ContactType, setContactType] = useState("customer");
  // The selected contact
  const [selectedContact, setSelectedContact] = useState({});

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

    // fetch api call to delete a contact
    const response = await fetch("/api/contact/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Contact-Type": ContactType,
      },
      body: JSON.stringify({
        _id: selectedContact._id,
      }),
    });
    Router.reload(window.location.pathname);
  };

  return (
    <>
      <h1>Kontakt Löschen:</h1>
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
          <label htmlFor="customer">Kontakt zum löschen auswählen: </label>
          <select
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
        <div className={styles.submitDeleteContainer}>
          <button type="submit" name="submit">
            Löschen
          </button>
        </div>
      </form>
    </>
  );
}
