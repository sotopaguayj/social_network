import FormLogin from "components/formLogin";
import Footer from "components/footer";
import styles from "styles/login.module.css";

function login() {
  return (
    <div className={styles.cont}>
      <div className={styles.divOne}>
        <FormLogin />
      </div>
      <div className={styles.divTwo}>
        <Footer />
      </div>
    </div>
  );
}

export default login;
