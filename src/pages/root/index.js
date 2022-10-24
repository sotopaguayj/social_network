import axios from "axios";
// import ChangePass from "components/changePass";
import styles from "styles/root.module.css";
import AddUser from "components/addUser";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import NavBar from "components/navBar";
import PostsList from "components/postsList";
import CreatePost from "components/createPost";

function Root() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    user: "",
    role: "",
  });
  const getData = async () => {
    try {
      const data = await axios.get("/api/profileData");
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [text, setText] = useState(true);
  const [animate, setAnimate] = useState(false);

  const handleLogout = async () => {
    try {
      Swal.fire({
        toast: true,
        title: "Estas Cerrando Sesion",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post("/api/auth/validarLogout");
          router.push("/login");
        }
      });
    } catch (error) {
      router.push("/login");
    }
  };
  const inAnimate = ` animate__animated animate__fadeInDown ${styles.showOn}`;
  const outAnimate = "animate__animated animate__fadeOutUp";
  const animation = animate ? inAnimate : styles.show;
  const textChangeable = text ? "Registrar" : "Cerrar";
  const showFormAddUser = () => {
    setAnimate(!animate);
    setText(!text);
  };
  return (
    <div className={styles.cont}>
      <NavBar />
      <div className={styles.postear}>
        <CreatePost />
      </div>
      <div className={animation}>
        <AddUser />
      </div>
      <div className={styles.botonera}>
        <button className={styles.addU} onClick={showFormAddUser}>
          {textChangeable}
        </button>
        <button onClick={handleLogout} className={styles.addU}>
          Log Out
        </button>
      </div>
      <div className={styles.postsList}>
        <PostsList />
      </div>
    </div>
  );
}

export default Root;
