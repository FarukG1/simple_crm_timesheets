import styles from "../styles/Form.module.css";
import home from "../styles/Home.module.css";
import { useState } from "react";

export default function FormUser({ birthdate, versicherung, beginn }) {
  const [data, setData] = useState({
    first_name: String(),
    last_name: String(),
    birthdate: birthdate,
    phone_number: String(),
    email: String(),
    adress: String(),
    city: String(),
    postcode: Number(),
    versicherung: versicherung,
    beginn: beginn,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");
    fetch("/api/email", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        console.log("Response succeeded!");
      }
    });
  };

  return (
    // We pass the event to the handleSubmit() function on submit.
    <form className={styles.form}>
      {/* FIRST AND LAST NAME */}
      <div>
        <label htmlFor="first_name">Vorname</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          onChange={(event) => {
            setData({ ...data, first_name: event.target.value });
          }}
        />
        <label htmlFor="last_name">Nachname</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          onChange={(event) => {
            setData({ ...data, last_name: event.target.value });
          }}
        />
      </div>
      {/* BIRTHDATE */}
      <div>
        <label htmlFor="birthdate">Geburts Datum</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={data.birthdate}
          onChange={(event) => {
            setData({ ...data, birthdate: event.target.value });
          }}
        />
      </div>
      {/* VERSICHERUNGS BEGINN */}
      <div>
        <label htmlFor="beginn">Versicherungsbeginn</label>
        <input
          type="date"
          id="beginn"
          name="beginn"
          value={data.beginn}
          onChange={(event) => {
            setData({ ...data, beginn: event.target.value });
          }}
        />
      </div>
      {/* PHONE NUMBER */}
      <div>
        <label htmlFor="phone_number">Telefon Nummer</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          onChange={(event) => {
            setData({ ...data, phone_number: event.target.value });
          }}
        />
      </div>
      {/* EMAIL */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(event) => {
            setData({ ...data, email: event.target.value });
          }}
        />
      </div>
      <input
        className={home.links}
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      />
    </form>
  );
}
