import styles from "../styles/ContactTable.module.css";
import { useEffect, useState } from "react";

export default function CustomerList({ customers }) {
  const [data, setData] = useState(JSON.parse(customers));
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
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {data.map((customer) => {
          return (
            <tr key={customer._id}>
              <th>
                {customer.lastname}, {customer.name}
              </th>
              <th>
                {new Date(Date.parse(customer.birthdate)).toLocaleDateString(
                  "de-DE"
                )}
              </th>
              <th>
                {customer.adress.street} {customer.adress.nr}
              </th>
              <th>{customer.adress.zip}</th>
              <th>{customer.adress.city}</th>
              <th>{customer.adress.email}</th>
              <th>{customer.adress.id}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
