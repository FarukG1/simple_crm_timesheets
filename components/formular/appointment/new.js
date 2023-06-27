import styles from "../../../styles/Form.module.css";
import Router from "next/router";
import { useState } from "react";

export default function FormNewContact({ customers, caregivers }) {
  const [data, setData] = useState({
    customers: JSON.parse(customers),
    caregivers: JSON.parse(caregivers),
  });
  const [timeSlots, setTimeSlots] = useState([
    "08:00-08:30",
    "08:30-09:00",
    "09:00-09:30",
    "09:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "12:00-12:30",
    "12:30-13:00",
    "13:00-13:30",
    "13:30-14:00",
    "14:00-14:30",
    "14:30-15:00",
    "15:00-15:30",
    "15:30-16:00",
    "16:00-16:30",
    "16:30-17:00",
    "17:00-17:30",
    "17:30-18:00",
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let date = new Date(event.target.date.value);
    let time = event.target.timeSlot.value.split("-")[0];
    let hour = parseInt(time.split(":")[0]);
    let minute = parseInt(time.split(":")[1]);
    date.setHours(hour + 1);
    date.setMinutes(minute);
    const response = await fetch("/api/appointment/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: event.target.customer.value,
        caregiver_id: event.target.caregiver.value,
        date: date,
      }),
    });
    Router.reload(window.location.pathname);
  };
  return (
    <>
      <h1>Neuen Termin hinzufügen:</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.textInputContainer}>
          <label htmlFor="customer">Kunden auswählen: </label>
          <select name="customer" required={true}>
            {data.customers.map((customer) => {
              return (
                <option key={customer._id} value={customer._id}>
                  {customer.lastname}, {customer.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="caregiver">Pflegekraft auswählen: </label>
          <select name="caregiver" required={true}>
            {data.caregivers.map((caregiver) => {
              return (
                <option key={caregiver._id} value={caregiver._id}>
                  {caregiver.lastname}, {caregiver.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="date">Datum: </label>
          <input
            type="date"
            name="date"
            required={true}
            defaultValue={new Date().toISOString().substring(0, 10)}
          />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="timeSlot">Uhrzeit auswählen: </label>
          <select name="timeSlot" required={true}>
            {timeSlots.map((timeSlot, index) => {
              return (
                <option key={index} value={timeSlot}>
                  {timeSlot}
                </option>
              );
            })}
          </select>
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
