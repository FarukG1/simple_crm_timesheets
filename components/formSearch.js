import styles from "../styles/Form.module.css";
import home from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FormSearch({ _questions }) {
  const [data, setData] = useState([{}]);
  const questions = JSON.parse(_questions);
  useEffect(() => {
    let temp = Array();
    questions.map((q) => {
      temp.push({ formname: q.formname, value: null });
    });
    setData(temp);
  }, []);
  return (
    <form className={styles.form}>
      {questions.map((question) => {
        if (question.type == "date") {
          return (
            <div className={styles.question} key={questions.indexOf(question)}>
              <label>{question.question}</label>
              <input
                type="date"
                id="question"
                onChange={(event) => {
                  const nextValue = data.map((element) => {
                    if (element.formname == question.formname) {
                      return {
                        ...element,
                        value: event.target.value,
                      };
                    } else return element;
                  });
                  setData(nextValue);
                }}
              />
            </div>
          );
        }
        if (question.type == "number") {
          return (
            <div className={styles.question} key={questions.indexOf(question)}>
              <label>{question.question}</label>
              <input
                type="number"
                id="question"
                min={0}
                max={question.max}
                onChange={(event) => {
                  const nextValue = data.map((element) => {
                    if (element.formname == question.formname) {
                      return {
                        ...element,
                        value: event.target.value,
                      };
                    } else return element;
                  });
                  setData(nextValue);
                }}
              />
            </div>
          );
        }
        if (question.type == "choice") {
          return (
            <div
              className={styles.question}
              key={questions.indexOf(question)}
              onChange={(event) => {
                const nextValue = data.map((element) => {
                  if (element.formname == question.formname) {
                    return {
                      ...element,
                      value: event.target.value,
                    };
                  } else return element;
                });
                setData(nextValue);
              }}
            >
              <label>{question.question}</label>
              <div className={styles.check}>
                <label htmlFor="yes">Ja</label>
                <input
                  type="radio"
                  id="yes"
                  name={question.formname}
                  value={true}
                />
                <label htmlFor="no">Nein</label>
                <input
                  type="radio"
                  id="no"
                  name={question.formname}
                  value={false}
                />
              </div>
            </div>
          );
        }
      })}
      <Link
        className={home.links}
        href={{ pathname: "/search", query: { data: JSON.stringify(data) } }}
      >
        Suchen
      </Link>
    </form>
  );
}
