import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

import NavBar from "components/NavBar";

import CardProfile from "components/CardProfile";

function User() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const [info, setInfo] = useState({
    user: "",
    role: "",
  });
  const getData = async () => {
    setLoader(true);
    await axios
      .post("/api/cookieData")
      .then((res) => {
        setInfo(res.data);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const { role } = info;
  return (
    <div className={styles.cont}>
      <CardProfile user={router.query.user} />
      <NavBar role={role} />
      <div className={styles.posts}></div>
    </div>
  );
}

export default User;
