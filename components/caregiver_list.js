import styles from "../styles/Form.module.css";
import home from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CaregiverList({ caregivers }) {
  const [data, setData] = useState([{}]);
  return (
    <table>
      <thead>
        <tr>
          <th>Nachname</th>
          <th>Vorname</th>
          <th>Geburtsdatum</th>
          <th>Straße & Hausnummer</th>
          <th>PLZ</th>
          <th>Stadt</th>
          <th>E-Mail</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Nachname</th>
          <th>Vorname</th>
          <th>Geburtsdatum</th>
          <th>Straße & Hausnummer</th>
          <th>PLZ</th>
          <th>Stadt</th>
          <th>E-Mail</th>
          <th>ID</th>
        </tr>
      </tbody>
    </table>
  );
}
