import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  // nextAuth hook to check if user is logged in
  const { data: session } = useSession();
  const router = useRouter();
  console.log("session", session);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {session ? (
          <button onClick={() => signOut()}>Log out</button>
        ) : (
          <button
            onClick={() => {
              router.push("api/auth/signin");
            }}
          >
            Sign in
          </button>
        )}
      </main>
    </div>
  );
}
