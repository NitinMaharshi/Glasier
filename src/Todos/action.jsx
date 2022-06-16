import {
  ADD_TODO,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  GET_TODO_ERROR,
  REMOVE_TODO,
} from "./actionTypes";

export const addTodo = (data) => ({
  type: ADD_TODO,
  payload: data,
});

export const addTodoLoading = () => {
  return {
    type: ADD_TODO_LOADING,
  };
};

export const addTodoSucces = (data) => {
  return {
    type: ADD_TODO_SUCCESS,
    payload: data,
  };
};
export const addTodoError = (e) => {
  return {
    type: ADD_TODO_ERROR,
    payload: e,
  };
};

export const getTodoLoading = () => {
  return {
    type: GET_TODO_LOADING,
  };
};

export const getTodoSucces = (data) => {
  return {
    type: GET_TODO_SUCCESS,
    payload: data,
  };
};
export const getTodoError = (e) => {
  return {
    type: GET_TODO_ERROR,
    payload: e,
  };
};

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});
