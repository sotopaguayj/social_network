import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import PostsList from "components/postsList";
import CreatePost from "components/createPost";
import NavBar from "components/navBar";
import styles from "styles/index.module.css";

export default function Home() {
  const router = useRouter();
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
  return (
    <div className={styles.cont}>
      <NavBar />
      <div className={styles.posterar}>
        <CreatePost />
      </div>
      <div className={styles.postList}>
        <PostsList />
      </div>
    </div>
  );
}
