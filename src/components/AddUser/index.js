import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import axios from "axios";
import { useState } from "react";

function AddUser() {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const addUser = async (val) => {
    // setLoad(true);
    let user = {
      data: val,
      posts: [],
      follow: [],
    };

    await axios
      .post("/api/addUser", user)
      .then((res) => {
        alert("usuario creado");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reset();
      });
    // setLoad(false);
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(addUser)}>
        <div className={styles.formGroup}>
          <label htmlFor="names">Nombres</label>
          <input type="text" id="names" {...register("names")} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastNames">Apellidos</label>
          <input type="text" id="lastNames" {...register("lastNames")} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Telefono</label>
          <input
            placeholder="xxx xxx xx xx"
            type="number"
            id="phone"
            {...register("phone")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Correo</label>
          <input
            placeholder="uniguajira.edu.co"
            type="email"
            // pattern=".+@uniguajira.edu.co"
            id="email"
            {...register("email")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="user">Usuario</label>
          <input type="text" id="user" {...register("user")} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pass">Clave</label>
          <input
            placeholder="1 mayuscula, 1 miniscula, 1 numero"
            type="password"
            id="pass"
            {...register("pass")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="role"> Elija un rol</label>
          <select {...register("role")}>
            <option value="110">Administrador</option>
            <option value="111">Moderador</option>
            <option value="112">Usuario</option>
          </select>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

export default AddUser;
