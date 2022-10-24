import styles from "styles/cardProfile.module.css";

function CardProfile(props) {
  return (
    <div className={styles.cont}>
      <div className={styles.imgContent}>
        <img src="jasp.webp" className={styles.profileIMG}></img>
      </div>
      <span className={styles.profileNAME}>{props.name}</span>
      <span className={styles.profileINFO}>{props.info}</span>
    </div>
  );
}

export default CardProfile;
