import styles from "./index.module.css";

function CardProfile(props) {
  return (
    <div className={styles.cont}>
      <div className={styles.userCont}>
        <img src="/jasp.webp" className={styles.profileIMG}></img>
        <div className={styles.infoUser}>
          <span className={styles.profileNAME}>{props.user}</span>
          <span className={styles.profileINFO}>I. Sistemas 9° semestre</span>
          <span>Sede Maicao</span>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
