import axios from "axios";
import styles from "./index.module.css";
import { useState, useEffect } from "react";

import NavBar from "components/NavBar";
import CardProfile from "components/CardProfile/index";
import AddPost from "components/AddPost/index";
import AddUser from "components/AddUser/index";

function Root() {
  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState({
    user: "",
    role: "",
  });
  useEffect(() => {
    getData();
  }, []);

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
  const { user, role } = info;
  return (
    <div className={styles.cont}>
      <NavBar role={role} />
      <CardProfile user={user} role={role} />
      <AddPost user={user} role={role} />
      <div className={styles.addu}>{/* <AddUser /> */}</div>
    </div>
  );
}

export default Root;
