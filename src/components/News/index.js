import styles from "./index.module.css";

function index() {
  return (
    <div className={styles.cont}>
      <div className={styles.anuncios}>
        <a
          target="_blank"
          href="https://www.uniguajira.edu.co/becas-y-convocatorias/item/3293-convocatorias-de-tuna-guajira"
          className={styles.anuncio}
        >
          <img className={styles.portada} src="tuna-ad.png" />
          <span>Convocatoria</span>
        </a>
        <hr className={styles.hr} />
        <a href="#" className={styles.anuncio}>
          <img className={styles.portada} src="wayira-ad.png" />
          <span>Convocatoria</span>
        </a>
        <hr className={styles.hr} />
        <a href="#" className={styles.anuncio}>
          <img className={styles.portada} src="ug-ad.jpeg" />
          <span>Informacion</span>
        </a>
        <hr className={styles.hr} />
        <a href="#" className={styles.anuncio}>
          <img className={styles.portada} src="ug-ad.jpeg" />
          <span>Informacion</span>
        </a>
        <hr className={styles.hr} />
        <a href="#" className={styles.anuncio}>
          <img className={styles.portada} src="ug-ad.jpeg" />
          <span>Informacion</span>
        </a>
        <hr className={styles.hr} />
      </div>
    </div>
  );
}

export default index;
