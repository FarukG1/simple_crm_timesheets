import styles from "../../../styles/Form.module.css";
import { useEffect, useState } from "react";

export default function FormDeleteContact({ customers, caregivers }) {
  const [data, setData] = useState({
    customers: JSON.parse(customers),
    caregivers: JSON.parse(caregivers),
  });
  const [ContactType, setContactType] = useState("customer");
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    setSelectedContact(data.customers[0]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
            data.caregivers.map((customer) => {
              return (
                <option key={customer._id} value={caregiver._id}>
                  {customer.lastname}, {customer.name}
                </option>
              );
            })}
        </select>
        <div className={styles.submitContainer}>
          <button type="submit" name="submit">
            Speichern
          </button>
        </div>
      </form>
    </>
  );
}
