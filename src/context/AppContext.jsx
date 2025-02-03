import { useContext, useReducer, useEffect } from "react";
import { createContext } from "react";
import reducer from "../reducer";
import { nanoid } from "nanoid";
import { CLOSE_OPEN, CREATE, DELETE, EDIT, SET_TASKS } from "../actions";

const AppContext = createContext();

const initialState = {
  isSidebar: false,
  isModal: false,
  tasks: [], // Data akan di-fetch dari backend
  users: new Map(),
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch data dari backend saat pertama kali aplikasi dimuat
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        const data = await response.json();
        dispatch({ type: SET_TASKS, payload: { tasks: data } });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Fungsi untuk membuka/menutup sidebar atau modal
  const openClose = (element) => {
    dispatch({ type: CLOSE_OPEN, payload: { element } });
  };

  // Fungsi untuk menambahkan tugas baru
  const create = (task) => {
    const newTask = { ...task, id: nanoid() }; // Tambahkan ID unik
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((createdTask) => {
        dispatch({ type: CREATE, payload: { task: createdTask } });
      })
      .catch((error) => console.error("Error creating task:", error));
  };
    

  // Fungsi untuk menghapus tugas
  const deleteTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete task");
        }
        // Perbarui state lokal
        dispatch({ type: DELETE, payload: { id } });
      })
      .catch((error) => console.error("Error deleting task:", error));
  };
  


  // Fungsi untuk mengedit tugas
  const edit = async (task) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const updatedTask = await response.json();
      dispatch({ type: EDIT, payload: { task: updatedTask } });
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openClose,
        create,
        deleteTask,
        edit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useContextApp = () => useContext(AppContext);
