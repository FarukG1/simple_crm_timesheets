import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../components/navbar";
import styles from "../styles/Search.module.css";
import home from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import clientPromise from "../lib/mongodb";

export default function Search({ insurances }) {
  const router = useRouter();
  const data = JSON.parse(router.query.data);
  const [insurancesData, setInsurancesData] = useState(
    JSON.parse(insurances[0].json)
  );
  const [allowedArray, setAllowedArray] = useState(calculate());

  function calculate() {
    let _array = Array();
    insurancesData.forEach((insurance) => {
      let allowed = true;
      insurance.questions.forEach((question) => {
        data.map((formValue) => {
          if (question.formname == formValue.formname) {
            if (!question.value || question.value == null) allowed = allowed;
            else if (
              (question.value == "true" && formValue.value == "true") ||
              question.value < formValue.value
            )
              allowed = false;
          }
        });
      });
      if (allowed) _array.push(insurance);
    });
    _array.sort((a, b) => {
      return b.weight - a.weight;
    });
    console.log(_array);
    return _array;
  }
  return (
    <>
      <Head>
        <title>Search - App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={home.main}>
        <div className={styles.list}>
          <ul>
            {allowedArray.map((insurance) => {
              return (
                <li key={allowedArray.indexOf(insurance)}>
                  <h2>{insurance.name}</h2>
                  <p>{insurance.description}</p>
                  <Link
                    className={home.links}
                    href={{
                      pathname: `/versicherung/`,
                      query: data,
                    }}
                  >
                    Weiter
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("fairsichern");

    const insurances = await db
      .collection("insurances")
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    return {
      props: { insurances: JSON.parse(JSON.stringify(insurances)) },
    };
  } catch (e) {
    console.error(e);
  }
}
