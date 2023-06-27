import styles from "../../styles/Table.module.css";
import { useState } from "react";

export default function CustomerList({ customers, query }) {
  const [data, setData] = useState(JSON.parse(customers));

  const searchFilter = (array) => {
    return array.filter((element) =>
      (element.name + " " + element.lastname)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  };

  const filtered = searchFilter(data);

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
        {filtered.map((customer) => {
          return (
            <tr key={customer._id}>
              <th>
                {customer.lastname}, {customer.name}
              </th>
              <th>
                {new Date(Date.parse(customer.birthdate)).toLocaleDateString(
                  "de-DE",
                  { timeZone: "UTC" }
                )}
              </th>
              <th>
                {customer.adress.street} {customer.adress.nr}
              </th>
              <th>{customer.adress.zip}</th>
              <th>{customer.adress.city}</th>
              <th>{customer.email}</th>
              <th>{customer.inhouse ? <>Ja</> : <>Nein</>}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
