import styles from "../styles/FormNew.module.css";
import { useState } from "react";

export default function FormEditContact({ customers, caregivers }) {
  const [data, setData] = useState({
    customers: JSON.parse(customers),
    caregivers: JSON.parse(caregivers),
  });
  const [ContactType, setContactType] = useState(null);
  const [selectedContact, setSelectedContact] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/new_contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Contact-Type": event.target.type.value,
      },
      body: JSON.stringify({
        name: event.target.name.value,
        lastname: event.target.lastname.value,
        birthdate: new Date(event.target.birthdate.value),
        adress: {
          street: event.target.street.value,
          nr: event.target.nr.value,
          zip: event.target.zip.value,
          city: event.target.city.value,
        },
        email: event.target.email.value,
        inhouse: event.target.inhouse.checked,
      }),
    });
  };
  return (
    <>
      <h1>Kontakt Bearbeiten:</h1>
      <div className={styles.optionContainer}>
        <div className={styles.option}>
          <input
            type="radio"
            name="type"
            id="customer"
            value="customer"
            onChange={() => setContactType("customer")}
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Im Pflegeheim: </label>
          <input
            type="checkbox"
            name="inhouse"
            defaultChecked={selectedContact.inhouse}
            onChange={(event) =>
              setSelectedContact({
                ...selectedContact,
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
            defaultValue={selectedContact.lastname}
            onChange={(event) =>
              setSelectedContact({
                ...selectedContact,
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
            defaultValue={selectedContact.name}
            onChange={(event) =>
              setSelectedContact({
                ...selectedContact,
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
            defaultValue={new Date(
              Date.parse(selectedContact.birthdate)
            ).toLocaleDateString("de-DE", { timeZone: "UTC" })}
            onChange={(event) =>
              setSelectedContact({
                ...selectedContact,
                name: event.target.value,
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
              defaultValue={selectedContact.adress.street}
              onChange={(event) =>
                setSelectedContact({
                  ...selectedContact,
                  adress: {
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
              defaultValue={selectedContact.adress.nr}
              onChange={(event) =>
                setSelectedContact({
                  ...selectedContact,
                  adress: {
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
              defaultValue={selectedContact.adress.zip}
              onChange={(event) =>
                setSelectedContact({
                  ...selectedContact,
                  adress: {
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
              defaultValue={selectedContact.adress.city}
              onChange={(event) =>
                setSelectedContact({
                  ...selectedContact,
                  adress: {
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
            defaultValue={selectedContact.email}
            onChange={(event) =>
              setSelectedContact({
                ...selectedContact,
                email: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.submitContainer}>
          <button type="submit" name="submit">
            Erstellen
          </button>
        </div>
      </form>
    </>
  );
}
