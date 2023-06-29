import styles from "../../../styles/Form.module.css";
import Router from "next/router";

export default function FormEditContact({
  appointment,
  customers,
  caregivers,
}) {
  // Customers and Caregivers Object Array
  const data = {
    customers: JSON.parse(customers),
    caregivers: JSON.parse(caregivers),
  };
  // Available Timeslots
  const timeSlots = [
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
  ];

  // The start Time of the Appointment
  const startDateTime = new Date(appointment.date);
  // Need to add one hour because of Timezone
  startDateTime.setHours(startDateTime.getHours() - 1);

  // The end Time of the Appointment
  const endDateTime = new Date(appointment.date);
  // Need to add one hour because of Timezone
  endDateTime.setHours(endDateTime.getHours() - 1);
  // Calculate end hour time
  endDateTime.setHours(
    startDateTime.getMinutes() == 30
      ? endDateTime.getHours() + 1
      : endDateTime.getHours()
  );
  // Calculate end minute time
  endDateTime.setMinutes(startDateTime.getMinutes() == 30 ? 0 : 30);

  // Get the time as string from start to end (08:00-8:30)
  const stringDateTime =
    startDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) +
    "-" +
    endDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Handle submit of the form
  const handleSubmit = async (event) => {
    // Prevent default action of form
    event.preventDefault();

    // get date of appointment
    let date = new Date(event.target.date.value);
    // get the start time of the timeslot
    let time = event.target.timeSlot.value.split("-")[0];
    // get the hour of the start time
    let hour = parseInt(time.split(":")[0]);
    // get the minute of the start time
    let minute = parseInt(time.split(":")[1]);
    // set the hour
    date.setHours(hour + 1);
    // set the minute
    date.setMinutes(minute);

    // fetch api call to edit an appointment
    const response = await fetch("/api/appointment/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: appointment._id,
        customer_id: event.target.customer.value,
        caregiver_id: event.target.caregiver.value,
        date: date,
      }),
    });
    Router.reload(window.location.pathname);
  };

  return (
    <>
      <h1>Termin Bearbeiten:</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.textInputContainer}>
          <label htmlFor="customer">Kunden auswählen: </label>
          <select
            name="customer"
            defaultValue={appointment.customer_id}
            required={true}
          >
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
          <select
            name="caregiver"
            defaultValue={appointment.caregiver_id}
            required={true}
          >
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
            defaultValue={new Date(appointment.date)
              .toISOString()
              .substring(0, 10)}
          />
        </div>
        <div className={styles.textInputContainer}>
          <label htmlFor="timeSlot">Uhrzeit auswählen: </label>
          <select name="timeSlot" required={true} defaultValue={stringDateTime}>
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
