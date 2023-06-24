import Head from "next/head";
import styles from "../styles/Home.module.css";
import toolbar from "../styles/Toolbar.module.css";
import NavBar from "../components/navbar";
import CustomerList from "../components/customer_list";
import CaregiverList from "../components/caregiver_list";
import FormNewContact from "../components/form_new";
import FormEditContact from "../components/form_edit";
import clientPromise from "../lib/mongodb";
import Modal from "react-modal";
import { useState } from "react";

export default function Kontakte({ customers, caregivers }) {
  const [ModalState, setModalState] = useState({ value: false, modal: "new" });
  const [listType, setListType] = useState("customer");
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
    },
  };
  return (
    <>
      <Head>
        <title>Kontakte</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <div className={toolbar.container}>
          <div className={toolbar.buttonContainer}>
            <div className={toolbar.searchContainer}>
              <div className={toolbar.textInput}>
                <input type="text" placeholder="Nach Einträgen suchen..." />
              </div>
              <button className={toolbar.searchButton}>Suchen</button>
            </div>
            <div className={toolbar.buttons}>
              <select
                className={toolbar.selectButton}
                defaultValue={listType}
                onClick={() => setListType("customer")}
              >
                <option value="customer">Kunden</option>
                <option value="caregiver">Pflegekraft</option>
              </select>
              <button
                className={toolbar.newButton}
                onClick={() => setModalState({ value: true, state: "new" })}
              >
                + Neu
              </button>
              <button
                className={toolbar.editButton}
                onClick={() => setModalState({ value: true, state: "edit" })}
              >
                Bearbeiten
              </button>
              <button
                className={toolbar.deleteButton}
                onClick={() => setModalState({ value: true, state: "delete" })}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
        {listType == "customer" && <CustomerList customers={customers} />}
        {listType == "caregiver" && <CaregiverList caregivers={caregivers} />}
        <Modal
          isOpen={ModalState.value}
          onRequestClose={() => setModalState({ value: false, state: "" })}
          style={customStyles}
          ariaHideApp={false}
        >
          {ModalState.state == "new" && <FormNewContact />}
          {ModalState.state == "edit" && (
            <FormEditContact customers={customers} caregivers={caregivers} />
          )}
        </Modal>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("swe-projekt");

    const customers = await db
      .collection("kunde")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    const caregivers = await db
      .collection("pflegekraft")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return {
      props: {
        customers: JSON.stringify(customers),
        caregivers: JSON.stringify(caregivers),
      },
    };
  } catch (e) {
    console.error(e);
  }
}
