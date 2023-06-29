import styles from "../../styles/Table.module.css";
import { useEffect, useState } from "react";
import moment from "moment";

export default function AppointmentList({
  appointments,
  customers,
  caregiver,
  selectedWeek,
  onSelectedAppointment,
}) {
  // Customers and caregivers Object Array and filtered array
  const [data, setData] = useState({
    appointments: JSON.parse(appointments),
    customers: JSON.parse(customers),
    filtered: [],
  });
  const rows = [
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
  // The selected item
  const [selectedItem, setSelectedItem] = useState({});

  // Filter function, gets only the appointments of the given caregiver
  const caregiverFilter = (array) => {
    return array.filter((element) => element.caregiver_id == caregiver._id);
  };
  // Filter function, gets only the appointments in the given week
  const dateFilter = (array) => {
    return array.filter((element) =>
      moment(moment(element.date).format("YYYY-MM-DD"))
        .locale("de")
        .isBetween(selectedWeek.weekStart, selectedWeek.weekEnd, "days", "[]")
    );
  };
  // Calculates wich styles to use
  const calculateStyle = (object) => {
    if (object.hasOwnProperty("appointment")) {
      if (object.appointment.hasOwnProperty("_id")) {
        if (selectedItem._id == object.appointment._id) {
          return styles.selectedItem;
        }
        return styles.existingItem;
      }
    }
  };

  // Set filtered list when the week or the caregiver changes
  useEffect(() => {
    setData({
      ...data,
      filtered: caregiverFilter(dateFilter(data.appointments)),
    });
  }, [selectedWeek.weekStart, selectedWeek.weekEnd, caregiver]);
  useEffect(() => {
    onSelectedAppointment(selectedItem);
  }, [selectedItem]);
  useEffect(() => {
    setData({
      ...data,
      filtered: caregiverFilter(dateFilter(data.appointments)),
    });
  }, []);

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
          let montag = { appointment: {}, customer: {} };
          let dienstag = { appointment: {}, customer: {} };
          let mittwoch = { appointment: {}, customer: {} };
          let donnerstag = { appointment: {}, customer: {} };
          let freitag = { appointment: {}, customer: {} };
          let samstag = { appointment: {}, customer: {} };
          let sonntag = { appointment: {}, customer: {} };

          data.filtered.forEach((appointment) => {
            let date = new Date(Date.parse(appointment.date));
            date.setHours(date.getHours() - 1);
            let time = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            let customer = data.customers.find(
              (customer) => customer._id === appointment.customer_id
            );
            if (time == row.split("-")[0]) {
              switch (date.getDay()) {
                case 0:
                  sonntag = { appointment: appointment, customer: customer };
                  break;
                case 1:
                  montag = { appointment: appointment, customer: customer };
                  break;
                case 2:
                  dienstag = { appointment: appointment, customer: customer };
                  break;
                case 3:
                  mittwoch = { appointment: appointment, customer: customer };
                  break;
                case 4:
                  donnerstag = { appointment: appointment, customer: customer };
                  break;
                case 5:
                  freitag = { appointment: appointment, customer: customer };
                  break;
                case 6:
                  samstag = { appointment: appointment, customer: customer };
                  break;
              }
            }
          });
          return (
            <tr key={index}>
              <th>{row}</th>

              <td
                className={calculateStyle(montag)}
                onClick={() => {
                  if (montag.appointment.hasOwnProperty("_id")) {
                    setSelectedItem(montag.appointment);
                  }
                }}
              >
                {montag.customer.hasOwnProperty("_id")
                  ? montag.customer.lastname + ", " + montag.customer.name
                  : ""}
              </td>

              <td
                className={calculateStyle(dienstag)}
                onClick={() => {
                  if (dienstag.appointment.hasOwnProperty("_id")) {
                    setSelectedItem(dienstag.appointment);
                  }
                }}
              >
                {dienstag.customer.hasOwnProperty("_id")
                  ? dienstag.customer.lastname + ", " + dienstag.customer.name
                  : ""}
              </td>

              <td
                className={calculateStyle(mittwoch)}
                onClick={() => {
                  if (mittwoch.appointment.hasOwnProperty("_id")) {
                    setSelectedItem(mittwoch.appointment);
                  }
                }}
              >
                {mittwoch.customer.hasOwnProperty("_id")
                  ? mittwoch.customer.lastname + ", " + mittwoch.customer.name
                  : ""}
              </td>

              <td
                className={calculateStyle(donnerstag)}
                onClick={() => {
                  if (donnerstag.appointment.hasOwnProperty("_id")) {
                    setSelectedItem(donnerstag.appointment);
                  }
                }}
              >
                {donnerstag.customer.hasOwnProperty("_id")
                  ? donnerstag.customer.lastname +
                    ", " +
                    donnerstag.customer.name
                  : ""}
              </td>

              <td
                className={calculateStyle(freitag)}
                onClick={() => {
                  if (freitag.appointment.hasOwnProperty("_id")) {
                    setSelectedItem(freitag.appointment);
                  }
                }}
              >
                {freitag.customer.hasOwnProperty("_id")
                  ? freitag.customer.lastname + ", " + freitag.customer.name
                  : ""}
              </td>

              <td
                className={calculateStyle(samstag)}
                onClick={() => {
                  if (samstag.appointment.hasOwnProperty("_id")) {
                    setSelectedItem(samstag.appointment);
                  }
                }}
              >
                {samstag.customer.hasOwnProperty("_id")
                  ? samstag.customer.lastname + ", " + samstag.customer.name
                  : ""}
              </td>

              <td
                className={calculateStyle(sonntag)}
                onClick={() => {
                  if (sonntag.appointment.hasOwnProperty("_id")) {
                    setSelectedItem(sonntag.appointment);
                  }
                }}
              >
                {sonntag.customer.hasOwnProperty("_id")
                  ? sonntag.customer.lastname + ", " + sonntag.customer.name
                  : ""}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
