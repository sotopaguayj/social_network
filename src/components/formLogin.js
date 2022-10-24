import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "styles/formLogin.module.css";

function FormLogin() {
  const uniguajira = /^[a-zA-Z]*@uniguajira.edu.co+$/g;
  const Salert = (title, icon) => {
    Swal.fire({
      position: "top-start",
      title: title,
      icon: icon,
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      toast: true,
    });
  };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const formSubmit = async (data) => {
    try {
      const sendData = await axios.post("/api/auth/validarLogin", data);
      switch (sendData.data) {
        case "root":
          Salert("Bienvenido Maestro", "success");
          setTimeout(() => {
            router.push("/root");
          }, 2000);
          break;
        case "mod":
          Salert("Bienvenido Mod", "success");
          setTimeout(() => {
            router.push("/mod");
          }, 2000);
          break;
        default:
          Salert("Bienvenido Usuario", "success");
          setTimeout(() => {
            router.push("/");
          }, 2000);
          break;
      }
    } catch (error) {
      switch (error.response.status) {
        case 401:
          Salert("Clave Errada", "error");
          break;
        case 404:
          Salert("Usuario Inexistente", "error");
          break;
      }
    }
  };
  const forgetData = () => {
    router.push("/forget");
  };
  return (
    <div>
      {/* <h2>Nombre: {watch("user")}</h2> */}
      <form autoComplete="off" onSubmit={handleSubmit(formSubmit)}>
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
          <span className={styles.forget} onClick={forgetData}>
            Olvide mi clave
          </span>
        </div>
      </form>
    </div>
  );
}
export default FormLogin;
