

import Head from "next/head";
import Image from "next/image";
import { userService } from "../services";
import styles from "../styles/Home.module.css";

export default function Home() {


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={() => userService.logout()}>Logout</button>
      </main>
    </div>
  );
}
