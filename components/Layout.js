import React from 'react'
import styles from "../styles/Layout.module.css"
import {useState} from "react";
import Link from 'next/link'
//import {MdOutlineFoodBank} from 'react-icons/md'

export default function Layout({children}) {
  const [isOpen, setOpen] = useState(false);
  const clickMenu = () => setOpen(!isOpen)

  return (
    <>
        <header className={styles.header}>
          <nav className={styles.navbar}>
              <Link href='/home'>
                <a className={styles.navlogo}>Oodles</a>
              </Link>
            <ul className={isOpen === false ?
                        styles.navmenu : styles.navmenu +' '+ styles.active}>
              <li className={styles.navitem}>
                  <Link href='/home'>
                    <a onClick={() => setOpen(false)} className={styles.navlink}>Home</a>
                  </Link>
              </li>
              <li className={styles.navitem}>
                  <Link href='/browse'>
                    <a onClick={() => setOpen(false)} className={styles.navlink}>Browse</a>
                  </Link>

              </li>
              <li className={styles.navitem}>
                  <Link href='/articles'>
                    <a onClick={() => setOpen(false)} className={styles.navlink}>Articles</a>
                  </Link>
              </li>
            </ul>
            <button className={isOpen === false ?
                                    styles.hamburger : styles.hamburger +' '+ styles.active}
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
  )
}
