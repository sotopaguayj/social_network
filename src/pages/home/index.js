import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "components/NavBar";
import styles from "./index.module.css";
import AddPost from "components/AddPost";
import NewsList from "components/NewsList/index";

export default function Home() {
  const router = useRouter();
  const [info, setInfo] = useState({
    user: "",
    id: "",
    role: "",
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const resProfile = await axios.post("/api/cookieData");
    setInfo(resProfile.data);
  };
  const { user, id, role } = info;

  return (
    <div className={styles.cont}>
      <NavBar role={role} />
      <AddPost id={id} user={user} role={role} />
      <NewsList />
    </div>
  );
}
