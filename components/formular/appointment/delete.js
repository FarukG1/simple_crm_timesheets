import styles from "../../../styles/Form.module.css";
import Router from "next/router";

export default function FormDeleteAppointment({ appointment }) {
  // Handle submit of the form
  const handleSubmit = async (event) => {
    // Prevent default action of form
    event.preventDefault();
    // fetch api call to delete an appointment
    const response = await fetch("/api/appointment/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: appointment._id,
      }),
    });
    Router.reload(window.location.pathname);
  };
  return (
    <>
      <h1>Termin Löschen:</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Sicher das Sie diesen Termin löschen wollen?</h2>
        <div className={styles.submitDeleteContainer}>
          <button type="submit" name="submit">
            Löschen
          </button>
        </div>
      </form>
    </>
  );
}
