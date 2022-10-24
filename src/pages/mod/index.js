import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreatePost from "components/createPost";
import PostsList from "components/postsList";
import NavBar from "components/navBar";
import styles from "styles/mod.module.css";

export default function Mod() {
  const router = useRouter();
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
  return (
    <div>
      {/* <div className={loaderClass}>
        <img src="loader.svg" />
      </div> */}
      <NavBar />
      <div className={styles.cont}>
        <div className={styles.postear}>
          <CreatePost />
        </div>

        <div className={styles.posts}>
          <PostsList />
        </div>
      </div>
    </div>
  );
}
