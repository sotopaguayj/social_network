import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Custom404() {
  const router = useRouter();
  const gohome = () => {
    router.push("/home");
  };
  return (
    <>
      <div className={styles.cont}>
        <img className={styles.img} src="lost.png" />
        <span className={styles.span}>Ruta no establecida</span>
        <button className={styles.button} onClick={gohome}>
          Volver
        </button>
      </div>
    </>
  );
}
