import Head from "next/head";
import NavBar from "../components/navbar";
import home from "../styles/Home.module.css";
import styles from "../styles/Settings.module.css";
import clientPromise from "../lib/mongodb";
import { useEffect, useState } from "react";

export default function Settings({ questions, insurances }) {
  const [questionsData, setQuestionsData] = useState(
    JSON.parse(questions[0].json)
  );
  const [insurancesData, setInsurancesData] = useState(
    JSON.parse(insurances[0].json)
  );
  return (
    <>
      <Head>
        <title>Settings - App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={home.main}>
        <div className={styles.container}>
          {questionsData.map((question) => {
            return (
              <div
                className={styles.questionContainer}
                key={questionsData.indexOf(question)}
              >
                <div className={styles.questionLabel}>
                  <label>Frage:</label>
                  <input
                    className={styles.longTextInput}
                    type="text"
                    id="question"
                    defaultValue={question.question}
                    onChange={(event) => {
                      const nextValue = questionsData;
                      nextValue[questionsData.indexOf(question)].question =
                        event.target.value;
                      setQuestionsData(nextValue);
                    }}
                  />
                </div>
                <div className={styles.questionLabel}>
                  <label>Typ:</label>
                  <select
                    name={question.formname}
                    id="question"
                    defaultValue={question.type}
                    onChange={(event) => {
                      const nextValue = questionsData;
                      nextValue[questionsData.indexOf(question)].type =
                        event.target.value;
                      setQuestionsData(nextValue);
                    }}
                  >
                    <option value="date">Datum</option>
                    <option value="number">Zahl</option>
                    <option value="choice">Auswahl</option>
                  </select>
                </div>
                <div className={styles.questionLabel}>
                  <label>Suchbar:</label>
                  <div
                    className={styles.question}
                    defaultValue={question.searchable}
                    onChange={(event) => {
                      const nextValue = questionsData;
                      nextValue[questionsData.indexOf(question)].searchable =
                        event.target.value;
                      setQuestionsData(nextValue);
                    }}
                  >
                    <div className={styles.check}>
                      <label htmlFor="yes">Ja</label>
                      <input
                        type="radio"
                        id="yes"
                        name={question.formname}
                        value={true}
                        defaultChecked={
                          question.searchable == "true" ? true : false
                        }
                      />
                      <label htmlFor="no">Nein</label>
                      <input
                        type="radio"
                        id="no"
                        name={question.formname}
                        value={false}
                        defaultChecked={
                          question.searchable == "false" ? true : false
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.questionLabel}>
                  <label>Form Name:</label>
                  <input
                    className={styles.shortTextInput}
                    type="text"
                    id="question"
                    defaultValue={question.formname}
                    onChange={(event) => {
                      const nextValue = questionsData;
                      nextValue[questionsData.indexOf(question)].formname =
                        event.target.value;
                      setQuestionsData(nextValue);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <div className={styles.buttonContainer} key="buttons">
            <button
              className={styles.links}
              onClick={async () => {
                setQuestionsData([
                  ...questionsData,
                  {
                    type: String(),
                    question: String(),
                    searchable: Boolean(),
                    formname: String(),
                  },
                ]);
              }}
            >
              Hinzufügen
            </button>
            <button
              className={styles.links}
              onClick={async () => {
                setQuestionsData(questionsData.slice(0, -1));
              }}
            >
              Letztes Entfernen
            </button>
            <button
              className={styles.links}
              onClick={async () => {
                let res = await fetch("/api/questions", {
                  method: "POST",
                  body: JSON.stringify({
                    json: JSON.stringify(questionsData),
                    created: new Date(),
                  }),
                });
              }}
            >
              Speichern
            </button>
          </div>
        </div>

        <div className={styles.container}>
          {insurancesData.map((insurance) => {
            return (
              <div
                className={styles.insuranceContainer}
                key={insurancesData.indexOf(insurance)}
              >
                <div className={styles.insuranceLabel}>
                  <label>Name:</label>
                  <input
                    className={styles.shortTextInput}
                    type="text"
                    id="question"
                    defaultValue={insurance.name}
                    onChange={(event) => {
                      const nextValue = insurancesData;
                      nextValue[insurancesData.indexOf(insurance)].name =
                        event.target.value;
                      setInsurancesData(nextValue);
                    }}
                  />
                </div>
                <div className={styles.insuranceLabel}>
                  <label>Beschreibung:</label>
                  <textarea
                    className={styles.longTextInput}
                    id="question"
                    defaultValue={insurance.description}
                    onChange={(event) => {
                      const nextValue = insurancesData;
                      nextValue[insurancesData.indexOf(insurance)].description =
                        event.target.value;
                      setInsurancesData(nextValue);
                    }}
                  />
                </div>
                <div className={styles.insuranceLabel}>
                  <label>Wichtung:</label>
                  <input
                    className={styles.shortTextInput}
                    type="number"
                    id="question"
                    defaultValue={insurance.weight}
                    onChange={(event) => {
                      const nextValue = insurancesData;
                      nextValue[insurancesData.indexOf(insurance)].weight =
                        event.target.value;
                      setInsurancesData(nextValue);
                    }}
                  />
                </div>
                <div className={styles.insuranceLabel}>
                  {questionsData.map((question) => {
                    if (question.searchable == "true") {
                      if (question.type == "number") {
                        return (
                          <div key={insurance.name + "_" + question.formname}>
                            <label>{question.question}</label>
                            <input
                              type="number"
                              id="question"
                              min={0}
                              max={question.max}
                              defaultValue={
                                typeof insurancesData[
                                  insurancesData.indexOf(insurance)
                                ].questions[
                                  questionsData.indexOf(question) - 2
                                ] == "undefined"
                                  ? 0
                                  : insurancesData[
                                      insurancesData.indexOf(insurance)
                                    ].questions[
                                      questionsData.indexOf(question) - 2
                                    ].value
                              }
                              onChange={(event) => {
                                const nextValue = insurancesData;
                                nextValue[
                                  insurancesData.indexOf(insurance)
                                ].questions[
                                  questionsData.indexOf(question) - 2
                                ].value = event.target.value;
                                setInsurancesData(nextValue);
                              }}
                            />
                          </div>
                        );
                      }
                      if (question.type == "choice") {
                        return (
                          <div key={insurance.name + "_" + question.formname}>
                            <label>{question.question}</label>
                            <div
                              className={styles.question}
                              onChange={(event) => {
                                const nextValue = insurancesData;
                                nextValue[
                                  insurancesData.indexOf(insurance)
                                ].questions[
                                  questionsData.indexOf(question) - 2
                                ].value = event.target.value;
                                setInsurancesData(nextValue);
                                console.log(nextValue);
                              }}
                            >
                              <div className={styles.check}>
                                <label htmlFor="yes">Ja</label>
                                <input
                                  type="radio"
                                  id="yes"
                                  name={
                                    insurance.name + "_" + question.formname
                                  }
                                  value={true}
                                />
                                <label htmlFor="no">Nein</label>
                                <input
                                  type="radio"
                                  id="no"
                                  name={
                                    insurance.name + "_" + question.formname
                                  }
                                  value={false}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                  })}
                </div>
              </div>
            );
          })}
          <div className={styles.buttonContainer} key="buttons">
            <button
              className={styles.links}
              onClick={async () => {
                let _array = Array();
                questionsData.map((q) => {
                  if (q.searchable == "true")
                    _array.push({ formname: q.formname, value: null });
                });
                setInsurancesData([
                  ...insurancesData,
                  {
                    name: String(),
                    description: String(),
                    weight: Number(),
                    questions: _array,
                  },
                ]);
              }}
            >
              Hinzufügen
            </button>
            <button
              className={styles.links}
              onClick={async () => {
                setInsurancesData(insurancesData.slice(0, -1));
              }}
            >
              Letztes Entfernen
            </button>
            <button
              className={styles.links}
              onClick={async () => {
                let res = await fetch("/api/insurances", {
                  method: "POST",
                  body: JSON.stringify({
                    json: JSON.stringify(insurancesData),
                    created: new Date(Date.now()).toISOString(),
                  }),
                });
              }}
            >
              Speichern
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("fairsichern");

    const questions = await db
      .collection("questions")
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    const insurances = await db
      .collection("insurances")
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    return {
      props: {
        questions: JSON.parse(JSON.stringify(questions)),
        insurances: JSON.parse(JSON.stringify(insurances)),
      },
    };
  } catch (e) {
    console.error(e);
  }
}