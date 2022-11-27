import styles from "./index.module.css";

function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.side1}>
          <span>
            <i className="fa-solid fa-phone"></i> +57 605 728 27 29
          </span>
          <span>
            <i className="fa-solid fa-envelope"></i>{" "}
            atencionalciudadano@uniguajira.edu.co
          </span>
        </div>
        <div className={styles.side2}>
          <a
            className={styles.link}
            target="_blank"
            href="https://www.uniguajira.edu.co/"
          >
            <i className="fa-solid fa-globe"></i>
          </a>
          <a
            className={styles.link}
            target="_blank"
            href="https://twitter.com/UniLaGuajira"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            className={styles.link}
            target="_blank"
            href="https://www.facebook.com/UniLaGuajira/"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            className={styles.link}
            target="_blank"
            href="https://www.instagram.com/uniguajira_/"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            className={styles.link}
            target="_blank"
            href="https://www.youtube.com/user/UniLaGuajira"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
        <div className={styles.side3}>
          <span className={styles.text}>
            <i className="fa-solid fa-location-dot"></i>&ensp;
          </span>
          <a
            className={styles.adress}
            target="_blank"
            href="https://www.google.com/maps/place/Universidad+de+La+Guajira/@11.5130005,-72.8694282,15.75z/data=!4m5!3m4!1s0x8e8b7d3e96883e99:0x71a81967d2f730c4!8m2!3d11.5140459!4d-72.8691971"
          >
            Km 5 Vía Maicao, Riohacha La Guajira (Colombia)
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
