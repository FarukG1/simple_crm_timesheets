import styles from "../styles/ContactTable.module.css";
import { useState } from "react";

export default function CaregiverList({ caregivers }) {
  const [data, setData] = useState(JSON.parse(caregivers));
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nachname, Vorname</th>
          <th>Geburtsdatum</th>
          <th>Straße & Hausnummer</th>
          <th>PLZ</th>
          <th>Stadt</th>
          <th>E-Mail</th>
          <th>Im Pflegeheim</th>
        </tr>
      </thead>
      <tbody>
        {data.map((caregiver) => {
          return (
            <tr key={caregiver._id}>
              <th>
                {caregiver.lastname}, {caregiver.name}
              </th>
              <th>
                {new Date(Date.parse(caregiver.birthdate)).toLocaleDateString(
                  "de-DE"
                )}
              </th>
              <th>
                {caregiver.adress.street} {caregiver.adress.nr}
              </th>
              <th>{caregiver.adress.zip}</th>
              <th>{caregiver.adress.city}</th>
              <th>{caregiver.email}</th>
              <th>{caregiver.inhouse == "true" ? <>Ja</> : <>Nein</>}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
