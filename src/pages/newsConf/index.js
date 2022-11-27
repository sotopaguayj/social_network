import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import NavBar from "components/NavBar";
import NewsList from "components/NewsList";
import { useState } from "react";

function NewsConf() {
  const imageType = "image";
  const [loader, setLoader] = useState(false);
  const [newData, setNewData] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const addNew = async (data) => {
    setLoader(true);
    if (!data.file[0].type.includes("image")) {
      alert("el archivo debe ser una imagen");
      return;
    }
    const files = data.file[0];

    const filex = new File([files], data.titulo + "." + files.type.slice(6), {
      type: files.type,
      size: files.size,
    });

    (newData.titulo = data.titulo),
      (newData.link = data.link),
      (newData.image = {
        name: data.titulo,
        size: files.size,
        type: files.type.slice(6),
      });

    const form = new FormData();
    form.append("media", filex);

    await axios("src/pages/api/addNew", {
      method: "POST",
      data: form,
      "content-type": "multipart/form-data",
    })
      .then((res) => {
        if (res.status == 200) console.log("todook");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        reset({
          body: "",
        });
        setLoader(false);
        // alert("Noticia Agregada!");
      });
    await axios.post("/api/saveNew", newData);
  };
  if (loader)
    return (
      <div className={styles.loading}>
        <img src="loader.svg" />
        <span>Cargando</span>
      </div>
    );
  return (
    <>
      <NavBar />
      <div className={styles.conte}>
        <div className={styles.lside}>
          <span>Agregar Noticia</span>
          <form
            action="/api/addNew"
            method="post"
            autoComplete="off"
            onSubmit={handleSubmit(addNew)}
            encType="multipart/form-data"
          >
            <div className={styles.form}>
              <div className={styles.inputG}>
                <label htmlFor="titulo">Titulo</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  {...register("titulo", {
                    required: true,
                    maxLength: 50,
                    trim: true,
                    pattern: /^[a-zA-Z0-9]{5,20}$/,
                  })}
                />
                {errors.titulo?.type === "required" && (
                  <small className={styles.small}>Ingrese un titulo</small>
                )}
                {errors.titulo?.type === "maxLength" && (
                  <small className={styles.small}>Sobrepasa Caracteres</small>
                )}
                {errors.titulo?.type === "pattern" && (
                  <small className={styles.small}>
                    sin espacios de 5 a 20 caracteres
                  </small>
                )}
              </div>
              <div className={styles.inputG}>
                <label htmlFor="link">Enlace</label>
                <input
                  type="text"
                  id="link"
                  {...register("link", {
                    required: true,
                    maxLength: 300,
                    trim: true,
                  })}
                />
                {errors.link?.type === "required" && (
                  <small className={styles.small}>Ingrese un enlace</small>
                )}
                {errors.link?.type === "maxLength" && (
                  <small className={styles.small}>Sobrepasa Caracteres</small>
                )}
              </div>
              <div className={styles.inputG}>
                <label className={styles.portada} htmlFor="portada">
                  <span>Subir Portada</span>
                  <i className="fa-solid fa-upload"></i>
                </label>
                <input
                  accept="image/png, image/gif, image/jpeg"
                  className={styles.file}
                  type="file"
                  id="portada"
                  name="portada"
                  {...register("file", {
                    required: true,
                  })}
                />
                {errors.file?.type === "required" && (
                  <small className={styles.small}>Ingrese una imagen</small>
                )}
              </div>
              <div className={styles.inputG}>
                <input type="submit" value="Agregar" />
              </div>
            </div>
          </form>
        </div>
        <NewsList />
      </div>
    </>
  );
}

export default NewsConf;
