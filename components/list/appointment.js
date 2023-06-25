import styles from "../../styles/ContactTable.module.css";
import table from "../../styles/CalenderTable.module.css";
import { useEffect, useState } from "react";

export default function AppointmentList({
  appointments,
  customers,
  caregiver,
}) {
  const [data, setData] = useState({
    appointments: JSON.parse(appointments),
    customers: JSON.parse(customers),
  });
  const [rows, setRows] = useState([
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
  const searchFilter = (array) => {
    return array.filter((element) => element.pflegekraft_id == caregiver._id);
  };
  const filtered = searchFilter(data.appointments);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Uhrzeit</th>
          <th>Montag</th>
          <th>Dienstag</th>
          <th>Mittwoch</th>
          <th>Donnerstag</th>
          <th>Freitag</th>
          <th>Samstag</th>
          <th>Sonntag</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          let montag = {};
          let dienstag = {};
          let mittwoch = {};
          let donnerstag = {};
          let freitag = {};
          let samstag = {};
          let sonntag = {};

          filtered.forEach((appointment) => {
            let date = new Date(Date.parse(appointment.date));
            let time = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            let customer = data.customers.find(
              (customer) => customer._id === appointment.kunde_id
            );
            if (time == row.split("-")[0]) {
              switch (date.getDay()) {
                case 0:
                  sonntag = customer;
                  break;
                case 1:
                  montag = customer;
                  break;
                case 2:
                  dienstag = customer;
                  break;
                case 3:
                  mittwoch = customer;
                  break;
                case 4:
                  donnerstag = customer;
                  break;
                case 5:
                  freitag = customer;
                  break;
                case 6:
                  samstag = customer;
                  break;
              }
            }
          });
          return (
            <tr key={index}>
              <th>{row}</th>
              <td>
                {montag.hasOwnProperty("_id")
                  ? montag.lastname + ", " + montag.name
                  : ""}
              </td>
              <td>
                {dienstag.hasOwnProperty("_id")
                  ? dienstag.lastname + ", " + dienstag.name
                  : ""}
              </td>
              <td>
                {mittwoch.hasOwnProperty("_id")
                  ? mittwoch.lastname + ", " + mittwoch.name
                  : ""}
              </td>
              <td>
                {donnerstag.hasOwnProperty("_id")
                  ? donnerstag.lastname + ", " + donnerstag.name
                  : ""}
              </td>
              <td>
                {freitag.hasOwnProperty("_id")
                  ? freitag.lastname + ", " + freitag.name
                  : ""}
              </td>
              <td>
                {samstag.hasOwnProperty("_id")
                  ? samstag.lastname + ", " + samstag.name
                  : ""}
              </td>
              <td>
                {sonntag.hasOwnProperty("_id")
                  ? sonntag.lastname + ", " + sonntag.name
                  : ""}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
