import { getAllIds, getData } from "../../lib/versicherungen";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../components/navbar";
import home from "../../styles/Home.module.css";
import FormUser from "../../components/formUser";

export default function Versicherung({ data }) {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Head>
        <title>{data.title} - App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={home.main}>
        <h1>{data.title}</h1>
        <FormUser
          birthdate={query.birthdate}
          versicherung={data.title}
          beginn={data.beginn}
        />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const data = await getData(params.id);
  return {
    props: {
      data,
    },
  };
}
