import styles from "./index.module.css";
import Posts from "components/Posts/index";
import MyPosts from "components/MyPosts/index";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

const Therouter = useRouter();
function AddPost(props) {
  let pathname = Therouter.pathname;
  const [Arr, setArr] = useState([]);
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
        setArr((Arr = Arr + 1));
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
      {pathname !== "/home" ? (
        <MyPosts name={props.user} arrLength={Arr} />
      ) : (
        <Posts name={props.user} arrLength={Arr} />
      )}
    </div>
  );
}

export default AddPost;
