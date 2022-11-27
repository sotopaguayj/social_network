import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "components/NavBar";
import styles from "./index.module.css";
import CardProfile from "components/CardProfile/index";
import AddPost from "components/AddPost/index";

export default function Mod() {
  const [info, setInfo] = useState({
    user: "",
    role: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resProfile = await axios.post("/api/cookieData");
    setInfo(resProfile.data);
  };
  const { user, role } = info;
  return (
    <div className={styles.cont}>
      <NavBar role={role} />
      <CardProfile user={user} />
      <AddPost user={user} role={role} />
    </div>
  );
}
