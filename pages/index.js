import Head from "next/head";
import Image from "next/image";
import { logout } from "../redux/user";
import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </main>
    </div>
  );
}
