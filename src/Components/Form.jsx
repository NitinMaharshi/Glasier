import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addTodoLoading,
  addTodoSucces,
  addTodoError,
  getTodoLoading,
  getTodoSucces,
  getTodoError,
} from "../Todos/action";
import Navbar from "./Navbar";

const Form = () => {
  const { loading, todos, error } = useSelector(
    (state) => ({
      loading: state.loading,
      todos: state.todos,
      error: state.error,
    })
    // function (prev, curr) {
    //   if (prev.loading === curr.loading && prev.error === curr.error) {
    //     return true;
    //   }
    //   return false;
    // }
    //Ram@789123
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    dateofbirth: "",
  });

  const emailcheck = form.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const getdata = () => {
    dispatch(getTodoLoading());
    fetch("http://localhost:3005/form", {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(getTodoSucces(json));
        // setActualData(json);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getTodoError(err));
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  function pas(pas) {
    let text = pas;
    let pattern = /^(?=.{8,})(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
    if (!pattern.test(text)) {
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodoLoading());
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].email === emailcheck) {
        alert("this email are already exitist");
        getdata();
        return;
      }
    }
    if (form.password !== form.confirmpassword) {
      alert("Password dose't match");
      getdata();
      return;
    }
    if (pas(form.password)) {
      fetch("http://localhost:3005/form", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          dispatch(addTodoSucces(json));
        })
        .catch((err) => {
          console.log(err);
          dispatch(addTodoError(err));
        });

      setForm({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        dateofbirth: "",
      });
      getdata();
    } else {
      alert(
        "Password should be minimum 8 characters long, should contain at least one special character and one uppercase letter"
      );
      getdata();
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3005/form/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
    getdata();
  };

  return loading ? (
    <div>Loading....</div>
  ) : error ? (
    <div>Something went wrong!</div>
  ) : (
    <>
      <Navbar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>NAME</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={form.name}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          onChange={handleChange}
          value={form.confirmpassword}
        />

        <label>Date</label>
        <input
          type="date"
          name="dateofbirth"
          onChange={handleChange}
          value={form.dateofbirth}
        />

        <input type="submit" value="Add Details" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Password</th>
            <th>Comfirm Password</th> */}
            <th>age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.dateofbirth}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Form;
