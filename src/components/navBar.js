import styles from "styles/navBar.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      Swal.fire({
        icon: "info",
        title: "Estas Cerrando Sesion",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.get("/api/auth/validarLogout");
          router.push("/login");
        }
      });
    } catch (error) {
      router.push("/login");
    }
  };
  const handleMenu = () => {
    setIcon(!icon);
    setMenu(!menu);
  };
  const iconMenu = `fa-solid fa-arrow-right-from-bracket ${styles.iconMain}`;
  const profileMenu = `fa-regular fa-user ${styles.iconMain}`;
  const [icon, setIcon] = useState(false);
  const [menu, setMenu] = useState(true);
  const iconClass = icon
    ? "fa-regular fa-square-caret-right"
    : "fa-regular fa-square-caret-left";
  const menuClass = menu
    ? `animate__animated animate__slideOutRight ${styles.menuNone}`
    : `animate__animated animate__slideInRight ${styles.menu}`;
  return (
    <div className={styles.cont}>
      <div>Logo</div>
      <div>
        <button className={styles.logOut} onClick={handleMenu}>
          <span>Menu</span>
          <i className={iconClass}></i>
        </button>
        <div className={menuClass}>
          <div>
            <button className={styles.btnMenu} onClick={handleLogout}>
              <i className={iconMenu}></i>
              <span className={styles.btnInfo}>cerrar sesion</span>
            </button>
          </div>
          <div>
            <button className={styles.btnMenu} onClick={() => {}}>
              <i className={profileMenu}></i>
              <span className={styles.btnInfo}>Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
