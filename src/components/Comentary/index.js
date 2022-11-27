import styles from "./index.module.css";
import { useEffect } from "react";
import moment from "moment";

function Comentary(props) {
  moment.locale("es");
  useEffect(() => {}, [props.length]);
  return (
    <div>
      <div className={styles.aComment}>
        <div className={styles.commentInfo}>
          <img
            className={styles.commentfdp}
            src={
              "https://avatars.dicebear.com/api/initials/" + props.user + ".svg"
            }
            alt="fdp"
          />
          <span className={styles.commentname}>{props.user}</span>
          <span className={styles.commenttime}>
            {moment(props.fecha).calendar()}
          </span>
        </div>
        <div className={styles.commentbody}>{props.comment}</div>
      </div>
    </div>
  );
}

export default Comentary;
