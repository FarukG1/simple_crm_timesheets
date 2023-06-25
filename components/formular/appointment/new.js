import styles from "../../../styles/Form.module.css";
import Router from "next/router";

export default function FormNewContact() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/appointment/new", {
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
    Router.reload(window.location.pathname);
  };
  return (
    <>
      <h1>Neuen Kontakt hinzufügen:</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.optionContainer}>
          <div className={styles.option}>
            <input type="radio" name="type" id="customer" value="customer" />
            <label htmlFor="customer">Kunde</label>
          </div>
          <div className={styles.option}>
            <input type="radio" name="type" id="caregiver" value="caregiver" />
            <label htmlFor="caregiver">Pflegekraft</label>
          </div>
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Im Pflegeheim: </label>
          <input type="checkbox" name="inhouse" />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Nachname: </label>
          <input
            type="text"
            name="lastname"
            placeholder="Nachname eingeben..."
          />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Vorname: </label>
          <input type="text" name="name" placeholder="Vorname eingeben..." />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">Geburtsdatum: </label>
          <input type="date" name="birthdate" />
        </div>
        <div className={styles.adressContainer}>
          <div className={styles.adressInput}>
            <label htmlFor="id">Straße: </label>
            <input type="text" name="street" placeholder="Straße eingeben..." />
          </div>
          <div className={styles.adressInput}>
            <label htmlFor="id">Hausnummer: </label>
            <input
              type="number"
              name="nr"
              placeholder="Hausnummer eingeben..."
            />
          </div>
        </div>
        <div className={styles.adressContainer}>
          <div className={styles.adressInput}>
            <label htmlFor="id">PLZ: </label>
            <input type="number" name="zip" placeholder="PLZ eingeben..." />
          </div>
          <div className={styles.adressInput}>
            <label htmlFor="id">Stadt: </label>
            <input type="text" name="city" placeholder="Stadt eingeben..." />
          </div>
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="id">E-Mail: </label>
          <input type="email" name="email" placeholder="E-Mail eingeben..." />
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
