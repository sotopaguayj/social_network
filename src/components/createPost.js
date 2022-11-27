import styles from "styles/createPost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function CreatePost() {
  const [info, setInfo] = useState({
    user: "",
    role: "",
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const resProfile = await axios.post("/api/profileData");
    setInfo(resProfile.data);
  };
  const Salert = (title, text, icon) => {
    Swal.fire({
      // position: "top-start",
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: true,
      // timerProgressBar: true,
      // timer: 2000,
      toast: true,
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const sendPost = async (data) => {
    let postModel = {
      body: data.body,
      user: {
        name: info.user,
        role: info.role,
      },
      likes: 0,
    };
    try {
      const sendData = await axios.post("/api/addPost", postModel);
      Salert("Listo!", "Publicacion hecha", "success");
      reset({
        body: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(sendPost)}>
      <div className={styles.cont}>
        <textarea
          type="text"
          placeholder="Quieres decir algo?"
          name="body"
          className={styles.textArea}
          {...register("body", {
            required: true,
            maxLength: 222,
            trim: true,
          })}
        ></textarea>
        {errors.body?.type === "maxLength" && (
          <small className={styles.small}>222 caracteres maximo</small>
        )}
        <div className={styles.buttonsPost}>
          <div type="file" className={styles.postFile}>
            <label htmlFor="file" className={styles.icon}>
              <i className="fa-regular fa-images"></i>
            </label>
            <input id="file" className={styles.file} type="file" hidden />
          </div>
          <div className={styles.btns}>
            <button className={styles.post}>
              <span>publicar</span>
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
