import Head from "next/head";
import Image from "next/image";
import styles from "@styles/eom.module.css";
import Navbar from "@components/Navbar";

export default function EOM({ employee }) {
  return (
    <div className="page-container">
      <Head>
        <title>EOM - {employee.name}</title>
      </Head>
      <Navbar />

      <div>
        <div className={styles.main}>
          <h1>Employee of the Month</h1>

          <div className={styles.eom}>
            <h2>{employee.name}</h2>
            <p>{employee.position}</p>
            <Image
              src={employee.image}
              alt={employee.name}
              width={250}
              height={250}
            />
            <p>{employee.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    "https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth"
  );

  const employee = await res.json();

  return {
    props: {
      employee,
    },
  };
};
