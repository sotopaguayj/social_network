import Footer from "components/Footer/index";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function login() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const validateLogin = async (data) => {
    // setLoader(true);
    await axios
      .post("api/auth/validarLogin", data)
      .then((res) => {
        if (res.status == 200) router.push("/home");
      })
      .catch((err) => {
        if (err.response.status == 404) alert("Usuario no registrado");
        if (err.response.status == 401) alert("Clave errada");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  if (loader)
    return (
      <div className={styles.loading}>
        <img src="loader.svg" />
        <span>Cargando</span>
      </div>
    );
  return (
    <div className={styles.cont}>
      {/* <h2>Nombre: {watch("user")}</h2> */}
      <form autoComplete="off" onSubmit={handleSubmit(validateLogin)}>
        <div className={styles.form}>
          <div className={styles.divGroup}>
            <label className={styles.label}>Usuario</label>
            <span className={styles.icon}>
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              className={styles.input}
              name="user"
              type="text"
              {...register("user", {
                required: true,
                maxLength: 15,
                minLength: 3,
                pattern: /^[a-zA-Z]{3,15}$/,
              })}
            />
            {errors.user?.type === "required" && (
              <small className={styles.small}>Ingrese su Usuario</small>
            )}
            {errors.user?.type === "maxLength" && (
              <small className={styles.small}>maximo 15 caracteres</small>
            )}
            {errors.user?.type === "minLength" && (
              <small className={styles.small}>minimo 3 caracteres</small>
            )}
            {errors.user?.type === "pattern" && (
              <small className={styles.small}>solo texto</small>
            )}
          </div>
          <div className={styles.divGroup}>
            <label className={styles.label}>Clave</label>
            <span className={styles.icon}>
              <i className="fa-solid fa-key"></i>
            </span>
            <input
              className={styles.input}
              name="pass"
              type="password"
              {...register("pass", {
                required: true,
                maxLength: 15,
                minLength: 4,
              })}
            />
            {errors.pass?.type === "required" && (
              <small className={styles.small}>Ingrese su Clave</small>
            )}
            {errors.pass?.type === "maxLength" && (
              <small className={styles.small}>maximo 15 caracteres</small>
            )}
            {errors.pass?.type === "minLength" && (
              <small className={styles.small}>minimo 4 caracteres</small>
            )}
          </div>
          <input className={styles.acces} type="submit" value="Entrar" />
          <div className={styles.forget}>
            <a href="#">Olvidé mis datos</a>
          </div>
        </div>
      </form>
      <div className={styles.divTwo}>
        <Footer />
      </div>
    </div>
  );
}

export default login;
