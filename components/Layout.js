import React from "react";
import styles from "../styles/Layout.module.css";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { logout } from "../redux/user";
import { useDispatch } from "react-redux";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const clickMenu = () => setOpen(!isOpen);
  const isLoggedIn = useSelector((state) => state.user.id !== undefined);

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.navbar} bg-[#FEC84D]`}>
        <Link href="/home">
            <a className={styles.navlogo}>
              <div className={styles.svgWrapper}>
                <div className={styles.oodlesSvg} />
              </div>
            </a>
          </Link>
          <ul
            className={
              isOpen === false
                ? styles.navmenu
                : styles.navmenu + " " + styles.active
            }
          >
            {!isLoggedIn ? (
              <>
                <li className={styles.navitem}>
                  <Link href="/account/login">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Login
                    </a>
                  </Link>
                </li>

                <li className={styles.navitem}>
                  <Link href="/account/register">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Register
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navitem}>
                  <Link href="/">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Home
                    </a>
                  </Link>
                </li>

                <li className={styles.navitem}>
                  <Link href="/browse">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Browse
                    </a>
                  </Link>
                </li>
                <li className={styles.navitem}>
                  <Link href="/articles">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Articles
                    </a>
                  </Link>
                </li>
                <li className={styles.navitem}>
                  <Link href="/manage-products">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Manage Products
                    </a>
                  </Link>
                </li>

                <li className={styles.navitem}>
                  <Link href="/account/edit-profile">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Edit Profile
                    </a>
                  </Link>
                </li>
                <li className={styles.navitem}>
                  <Link href="/account/analytics">
                    <a
                      onClick={() => setOpen(false)}
                      className={styles.navlink}
                    >
                      Analytics
                    </a>
                  </Link>
                </li>

                <li className={styles.navitem}>
                  <Link href="">
                    <a
                      onClick={() => {
                        dispatch(logout());
                        setOpen(false);
                      }}
                      className={styles.navlink}
                    >
                      Logout
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <button
            className={
              isOpen === false
                ? styles.hamburger
                : styles.hamburger + " " + styles.active
            }
            onClick={clickMenu}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </nav>
      </header>

      {children}
    </>
  );
}
