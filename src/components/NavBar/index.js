import styles from "./index.module.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import OptionsBar from "components/OptiosBar/index";

function NavBar(props) {
  const router = useRouter();
  return (
    <>
      <div className={styles.cont}>
        <div
          className={styles.logo}
          onClick={() => {
            router.push("/home");
          }}
        >
          Logo
        </div>
        <form autoComplete="off">
          <div className={styles.search}>
            <label htmlFor="search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <input type="text" id="search" />
          </div>
        </form>
      </div>
      <OptionsBar role={props.role} />
    </>
  );
}

export default NavBar;
