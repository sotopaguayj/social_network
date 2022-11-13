import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

function index(props) {
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm("Salir?")) {
      axios
        .get("/api/auth/validarLogout")
        .then((res) => {
          if (res.status == 200) router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          router.push("/login");
        });
    }
  };
  const handleRoute = () => {
    props.role == 100
      ? router.push("/root")
      : props.role == 111
      ? router.push("/mod")
      : router.push("/profile");
  };
  return (
    <div className={styles.cont}>
      <ul className={styles.options}>
        <li
          onClick={() => {
            router.push("/home");
          }}
          className={styles.op}
        >
          <i className="fa-solid fa-house"></i>
          <span className={styles.opTxt}>Inicio</span>
        </li>
        <hr className={styles.hr} />
        <li onClick={handleRoute} className={styles.op}>
          <i className="fa-solid fa-user"></i>
          <span className={styles.opTxt}>Perfil</span>
        </li>
        <hr className={styles.hr} />
        <li className={styles.op}>
          <i className="fa-solid fa-message"></i>
          <span className={styles.opTxt}>Mensajes</span>
        </li>
        <hr className={styles.hr} />
        <li className={styles.op}>
          <i className="fa-solid fa-person-shelter"></i>
          <span className={styles.opTxt}>Salas</span>
        </li>
        <hr className={styles.hr} />
        <li className={styles.op}>
          <i className="fa-solid fa-book"></i>
          <span className={styles.opTxt}>Documentos</span>
        </li>
        <hr className={styles.hr} />
        <li className={styles.op}>
          <i className="fa-solid fa-newspaper"></i>
          <span className={styles.opTxt}>Noticias</span>
        </li>
        <hr className={styles.hr} />
        <li onClick={handleLogout} className={styles.op}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className={styles.opTxt}>Salir</span>
        </li>
      </ul>
    </div>
  );
}

export default index;
