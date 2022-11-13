import styles from "./index.module.css";
import Posts from "components/Posts/index";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function index(props) {
  const [arr, setArr] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const addPost = async (data) => {
    let postData = {
      user: props.user,
      body: data.body,
      Comments: [],
      likes: 0,
    };
    await axios
      .post("/api/addPost", postData)
      .then((res) => {
        if (res.status == 201) alert("Post Creado!");
      })
      .finally(() => {
        setArr((arr = arr + 1));
        reset({
          body: "",
        });
      });
  };

  return (
    <div className={styles.cont}>
      <form onSubmit={handleSubmit(addPost)} className={styles.form}>
        <div className={styles.divGroup}>
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
          <div className={styles.buttons}>
            <button className={styles.post}>
              <span>publicar </span>
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </form>
      <Posts name={props.user} role={props.role} arrLength={arr} />
    </div>
  );
}

export default index;