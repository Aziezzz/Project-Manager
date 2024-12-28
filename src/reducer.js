import { nanoid } from "nanoid";
import { CREATE, EDIT, DELETE, CLOSE_OPEN } from "./actions";

const addLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const reducer = (state, action) => {
    switch (action.type) {
        case CLOSE_OPEN: {
            const element = action.payload.element;
            return { ...state, [element]: !state[element] };
        }
        case CREATE: {
            const task = action.payload.task;
            const date = task.date || new Date().toLocaleDateString();
            const id = nanoid();
            const newTask = { ...task, id, date };
            const tasks = [...state.tasks, newTask];
            addLocalStorage(tasks);
            return { ...state, tasks };
        }
        case DELETE: {
            const id = action.payload.id;
            const tasks = state.tasks.filter((task) => task.id !== id);
            addLocalStorage(tasks);
            return { ...state, tasks };
        }
        case EDIT: {
            const { id, updatedTask } = action.payload; // Ambil id dan updatedTask dari payload
        
            // Memperbarui daftar tugas dengan task yang telah diedit
            const tasks = state.tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, ...updatedTask }; // Perbarui tugas dengan data baru
                }
                return task; // Kembalikan task yang tidak diubah
            });
        
            // Simpan daftar tugas yang diperbarui ke local storage
            addLocalStorage(tasks);
        
            // Kembalikan state baru dengan daftar tugas yang diperbarui
            return { ...state, tasks };
        }
        default:
            throw new Error('this action doesn\'t match');
    }
};

export default reducer;