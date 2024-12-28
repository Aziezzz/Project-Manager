import { useContext, useReducer, useState, useEffect } from "react";
import { createContext } from "react";
import reducer from "../reducer";
import { CLOSE_OPEN, CREATE, DELETE, EDIT } from "../actions";

const AppContext = createContext();

const initialState = {
  isSidebar: false,
  isModal: false,
  tasks: JSON.parse(localStorage.getItem("tasks")) ?? [],
  users: new Map(),
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openClose = (element) => {
    dispatch({ type: CLOSE_OPEN, payload: { element } });
  };

  const create = (task) => {
    dispatch({ type: CREATE, payload: { task } });
    updateLocalStorage([...state.tasks, task]); // Update local storage saat membuat tugas baru
  };

  const deleteTask = (id) => {
    dispatch({ type: DELETE, payload: { id } });
    updateLocalStorage(state.tasks.filter(task => task.id !== id)); // Update local storage saat menghapus tugas
  };

  const edit = (task) => {
    dispatch({ type: EDIT, payload: task });
    updateLocalStorage(state.tasks.map(t => (t.id === task.id ? task : t))); // Update local storage saat mengedit tugas
  };

  // Fungsi untuk memperbarui local storage
  const updateLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <AppContext.Provider
      value={{ ...state, openClose, create, deleteTask, edit }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useContextApp = () => useContext(AppContext);