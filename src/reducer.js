import { CREATE, EDIT, DELETE, CLOSE_OPEN, SET_TASKS } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case CLOSE_OPEN: {
      const element = action.payload.element;
      return { ...state, [element]: !state[element] };
    }
    case SET_TASKS: {
      // Mengatur data tugas yang di-fetch dari backend
      const tasks = action.payload.tasks;
      return { ...state, tasks };
    }
    case CREATE: {
      // Menambahkan tugas baru ke state
      const task = action.payload.task;
      const tasks = [...state.tasks, task];
      return { ...state, tasks };
    }
    case DELETE: {
        // Menghapus tugas dari state
        const id = action.payload.id;
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== id),
        };
      }
      
    case EDIT: {
      // Memperbarui tugas di state
      const updatedTask = action.payload.task;
      const tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      return { ...state, tasks };
    }
    default:
      throw new Error(`No matching action type: ${action.type}`);
      
  }
  
};

export default reducer;
