import { useState, useEffect } from "react";
import axios from "axios";
import styles from "styles/postsList.module.css";
import Swal from "sweetalert2";
function PostsList() {
  const [like, setLike] = useState(true);
  const likeClass = `fa-regular fa-heart ${styles.like}`;
  const likeClassOn = `fa-solid fa-heart ${styles.likeON}`;
  const [info, setInfo] = useState({
    user: "",
    role: "",
  });
  const [PostData, setPostData] = useState([]);
  const handleLike = (e) => {
    if (e.target.className == "fa-regular fa-heart postsList_like__hpxsx") {
      e.target.setAttribute("class", likeClassOn);
    } else {
      e.target.setAttribute("class", likeClass);
    }
  };
  const showPosts = async () => {
    try {
      const getData = await axios.get("api/postsData");
      setPostData(getData.data.reverse());
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const showData = async () => {
    try {
      const resProfile = await axios.get("/api/profileData");
      setInfo(resProfile.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = (e) => {
    const idPost = {
      _id: e.target.value,
    };
    try {
      Swal.fire({
        icon: "question",
        title: "Eliminar Publicacion",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post("/api/deletePost", idPost);
          Swal.fire({
            toast: true,
            icon: "success",
            title: "Hecho!",
            position: "top-start",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const btnClass = `fa-regular fa-trash-can ${styles.delete}`;

  useEffect(() => {
    showData();
    showPosts();
  }, [PostData.length]);

  return (
    <ul className={styles.ul}>
      {PostData.map((element) => (
        <li key={element._id} className={styles.cont}>
          <a
            className={styles.linkProfile}
            href={"/users/" + element.user.name}
          >
            <img className={styles.imgProfile} src="jasp.webp" />
          </a>
          <div className={styles.li}>
            <div className={styles.headPost}>
              <div className={styles.info}>
                <span className={styles.infoName}>{element.user.name}</span>
                <span className={styles.infoTime}>
                  {element.createdAt.substring(11, 16)}
                </span>
              </div>
              {info.role === 111 || info.role === 100 ? (
                <button
                  value={element._id}
                  onClick={deletePost}
                  className={btnClass}
                ></button>
              ) : info.user == element.user ? (
                <button
                  value={element._id}
                  onClick={deletePost}
                  className={btnClass}
                ></button>
              ) : (
                ""
              )}
            </div>
            <hr className={styles.division} />
            <div className={styles.body}>{element.body}</div>
            <hr className={styles.division} />
            <div className={styles.options}>
              <button
                id={element._id}
                onClick={handleLike}
                className={likeClass}
              >
                {element.likes !== 0 ? element.likes : ""}
              </button>
              <button className={styles.comment}>
                <i className="fa-regular fa-comment"></i>
              </button>
              <button className={styles.share}>
                <i className="fa-solid fa-tower-broadcast"></i>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostsList;
