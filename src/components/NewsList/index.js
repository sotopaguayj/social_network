import { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import axios from "axios";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loader, setLoader] = useState(false);

  const loadNews = async () => {
    setLoader(true);
    await axios
      .get("/api/getNews")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    loadNews();
  }, [news.length]);

  if (loader)
    return (
      <div className={styles.loading}>
        <img src="loader.svg" />
        <span>Cargando</span>
      </div>
    );
  return (
    <div className={styles.cont}>
      <ul className={styles.anuncios}>
        {news.map((element, index) => (
          <li className={styles.anuncio} key={index}>
            <a
              rel="noreferrer"
              target="_blank"
              className={styles.imageLink}
              href={element.link}
            >
              <img
                className={styles.portada}
                src={"uploads/" + element.image.name + "." + element.image.type}
              />
              {element.titulo}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;
