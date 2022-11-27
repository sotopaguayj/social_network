import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/es";
import Comentary from "components/Comentary/index";

function index(props) {
  moment.locale("es");

  let date = new Date();
  let now = date.toISOString();
  const [loader, setLoader] = useState(false);
  const [PostData, setPostData] = useState([]);
  const [editor, setEditor] = useState(false);
  const [com, setCom] = useState({
    user: "",
    comment: "",
    fecha: now,
    postId: "",
  });

  const showPosts = async () => {
    setLoader(true);
    await axios
      .get("/api/postsData")
      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const classEditor = editor ? styles.showEditor : styles.hideEditor;

  const editPost = (e) => {
    setEditor(!editor);
    const postUser =
      e.target.parentNode.parentNode.querySelector("#userName").textContent;

    const data = {
      id: e.target.id,
      user: postUser,
    };
  };
  const deletePost = async (e) => {
    const postUser =
      e.target.parentNode.parentNode.querySelector("#userName").textContent;

    const data = {
      id: e.target.id,
      user: postUser,
    };
    try {
      if (confirm("Eliminar Post?"))
        await axios.post("api/deletePost", data).then((res) => {
          if (res.status == 200) {
            alert("Publicacion Borrada");
            showPosts();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const sendData = (user, role) => {
    Router.push(
      {
        pathname: "/users/" + user,
        query: { user, role },
      },
      "/users/" + user
    );
  };
  const comment = (e) => {
    let thisPost = e.target.parentNode.parentNode;

    const postSelector = thisPost.querySelector("#comment");
    postSelector.className == styles.off
      ? postSelector.setAttribute("class", styles.comment)
      : postSelector.setAttribute("class", styles.off);
  };
  const setComment = async (e) => {
    e.preventDefault();
    let postId = e.target.parentNode.parentNode.id;
    let comentario = e.target.querySelector("#aComment").value.trim();
    let userName =
      e.target.parentNode.parentNode.querySelector("#userName").textContent;
    if (comentario == "") e.target.querySelector("#aComment").focus();
    com.comment = comentario;
    com.user = props.name;
    com.postId = postId;
    com.userName = userName;
    console.log();
    await axios
      .post("/api/setComentary", com)
      .then((res) => {
        res.status == 201 ? console.log("Commentario Hecho!") : "";
        showPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    showPosts();
  }, [props.arrLength]);
  if (loader)
    return (
      <div className={styles.loading}>
        <img src="loader.svg" />
        <span>Cargando</span>
      </div>
    );
  const btnLike = `fa-solid fa-heart ${styles.like}`;
  const btnComment = `fa-solid fa-comment ${styles.comment}`;
  const btnEmit = `fa-solid fa-satellite-dish ${styles.emit}`;
  const btnTrash = `fa-solid fa-trash ${styles.trash}`;
  const btnEdit = `fa-solid fa-pen ${styles.edit}`;
  return (
    <>
      <div className={classEditor}>
        <span>esta opcion aun esta en desarrollo :/</span>
        <button
          onClick={() => {
            setEditor(!editor);
          }}
        >
          Cerrar
        </button>
      </div>
      <ul className={styles.ul}>
        {PostData.map((elem, index) => (
          <li id={elem._id} key={index} className={styles.postList}>
            <div className={styles.head}>
              <div className={styles.info}>
                <a
                  id="userName"
                  onClick={() => {
                    sendData(elem.user);
                  }}
                >
                  {elem.user}
                </a>
                <span className={styles.time}>
                  {moment(elem.fecha).calendar()}
                </span>
              </div>

              {props.name == elem.user ? (
                <div>
                  <button
                    id={elem._id}
                    className={btnEdit}
                    onClick={editPost}
                  ></button>
                  <button
                    id={elem._id}
                    onClick={deletePost}
                    className={btnTrash}
                  ></button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.body}>{elem.body}</div>
            <div>
              <button
                onClick={comment}
                id={elem._id}
                className={btnComment}
              ></button>
              <button id={elem._id} className={btnEmit}></button>
            </div>
            {/* Comentarios */}
            <div id="comment" className={styles.off}>
              {elem.comments.map((com, index) => {
                return (
                  <Comentary
                    user={com.user}
                    comment={com.comment}
                    key={index}
                    fecha={com.fecha}
                    length={elem.comments.length}
                  />
                );
              })}
              <form autoComplete="off" onSubmit={setComment}>
                <div className={styles.addComment}>
                  <input
                    id="aComment"
                    key={index}
                    className={styles.input}
                    name="comment"
                    type="text"
                  />
                  <button>Comentar</button>
                </div>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default index;
