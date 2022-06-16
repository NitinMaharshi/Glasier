import React from "react";
import { Link } from "react-router-dom";
import styles from "./Form.module.css";
const Navbar = () => {
  return (
    <div className={styles.navbar_btn}>
      <Link to={"/"}>
        <span>
          <button className={styles.btn}>Resgistration</button>
        </span>
      </Link>
      <Link to={"/login"}>
        <span>
          <button className={styles.btn}>Login</button>
        </span>
      </Link>
    </div>
  );
};

export default Navbar;
