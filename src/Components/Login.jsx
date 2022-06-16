import React from "react";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Login = () => {
  const { todos } = useSelector((state) => ({
    todos: state.todos,
  }));

  console.log(todos);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [showuser, setShowuser] = useState([]);
  console.log(showuser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  console.log(login);
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < todos.length; i++) {
      // console.log(todos[i]);
      // console.log(login.password);
      if (
        todos[i].email === login.email &&
        todos[i].password === login.password
      ) {
        setShowuser([...showuser, todos[i]]);
        break;
      }
    }
    setLogin({
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <br />
      <br />
      <br />
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={login.email}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={login.password}
        />
        <input type="submit" value="Add Details" />
      </form>
      <br />
      <br />

      {showuser.map((item) => {
        return (
          <>
            {" "}
            <div key={item.id}>
              <div>Name:- {item.name}</div>
              <div>Email:- {item.email}</div>
              <div>Password:- {item.password}</div>
              <div>Confirm Password:- {item.confirmpassword}</div>
              <div>Date Of Birth:- {item.dateofbirth}</div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Login;
