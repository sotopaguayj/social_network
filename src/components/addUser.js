import axios from "axios";
import Swal from "sweetalert2";
import styles from "styles/addUser.module.css";
import { useForm } from "react-hook-form";

function AddUser(props) {
  const Salert = (title, text, icon) => {
    Swal.fire({
      // position: "top-start",
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: true,
      // timerProgressBar: true,
      // timer: 2000,
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const addUserDB = async (data) => {
    try {
      const sendData = await axios.post("/api/addUser", data);
      if (sendData.status == 201) {
        Salert("Hecho!", "Usuario Creado", "success");
        reset((formValues) => ({
          ...formValues,
          user: "",
          pass: "",
          role: "111",
        }));
      }
    } catch (error) {
      const { data } = error.response;
      Salert("Error", "Usuario ya registrado", "warning");
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(addUserDB)}>
      <div className={styles.cont}>
        <span className={styles.spanTitle}>Registro de usuario</span>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nombre</label>
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
        <div className={styles.inputGroup}>
          <label className={styles.label}>Clave</label>
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
            <small className={styles.small}>Ingrese una Clave</small>
          )}
          {errors.pass?.type === "maxLength" && (
            <small className={styles.small}>maximo 15 caracteres</small>
          )}
          {errors.pass?.type === "minLength" && (
            <small className={styles.small}>minimo 4 caracteres</small>
          )}
        </div>
        <div className={styles.selectGroup}>
          <label className={styles.label} htmlFor="func">
            Cargo
          </label>
          <select
            className={styles.select}
            name="func"
            {...register("role", {
              required: true,
              maxLength: 3,
              minLength: 3,
            })}
          >
            <option className={styles.op} value="111">
              Moderador
            </option>
            <option className={styles.op} value="112">
              Estudiante
            </option>
            <option className={styles.op} value="113">
              Profesor
            </option>
            <option className={styles.op} value="114">
              Administrativo
            </option>
          </select>
        </div>
        <input className={styles.acces} type="submit" value="Agregar" />
      </div>
    </form>
  );
}

export default AddUser;
