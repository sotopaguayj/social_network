import styles from "./index.module.css";

function CardProfile(props) {
  return (
    <div className={styles.cont}>
      <div className={styles.userCont}>
        <img src="/profile.png" className={styles.profileIMG}></img>
        <div className={styles.infoUser}>
          <span className={styles.profileNAME}>{props.user}</span>
          <span className={styles.profileINFO}>
            {props.role == 100 ? "Administrador" : "Usuario"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
