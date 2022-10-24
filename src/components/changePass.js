import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "styles/formLogin.module.css";
import { useState, useEffect } from "react";

function ChangePass() {
  // Declaracion Funcion Formulario
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //Setear informacion usuario
  const [user, setUser] = useState({
    user: "",
  });

  // const [DivPass, setDivPass] = useState(false);

  //obtener data del usuario
  const handleData = async () => {
    try {
      const userData = await axios.post("/api/dataProfile");
      setUser(userData.data);
    } catch (error) {
      console.log(error);
    }
  };

  //funcion cambiar pass
  const ChangePassForm = async (data) => {
    const userName = user.user;
    const userPass = data.pass;
    const ds = {
      user: userName,
      pass: userPass,
    };
    try {
      const sendData = await axios.post("/api/auth/changePass", ds);
    } catch (error) {
      console.log(error);
    }
  };

  //llamamos los datos
  useEffect(() => {
    handleData();
  }, []);

  return (
    <form onSubmit={handleSubmit(ChangePassForm)}>
      <div>hola{user.user}</div>
      <div>
        <label>Nueva CLave</label>
        {/* <span className={styles.icon}>
          <i className="fa-solid fa-user"></i>
        </span> */}
        <input
          name="pass"
          type="password"
          {...register("pass", {
            required: true,
            maxLength: 15,
            minLength: 4,
          })}
        />
        {errors.pass?.type === "required" && <small>Ingrese una Clave</small>}
        {errors.pass?.type === "maxLength" && (
          <small>maximo 15 caracteres</small>
        )}
        {errors.pass?.type === "minLength" && (
          <small>minimo 4 caracteres</small>
        )}
        <input type="submit" value="Guardar" />
      </div>
    </form>
  );
}

export default ChangePass;
