"use client";
import styles from "/styles/contacts.module.css";
import { Table } from "/lib/types";
import { get } from "/lib/database";
import { useEffect, useState } from "react";

export default function Contacts() {
  const [customerData, setCustomerData] = useState(get(Table.Customer));
  return (
    <main className={styles.main}>
      {customerData.map(<div>{customers.name}</div>)}
    </main>
  );
}
