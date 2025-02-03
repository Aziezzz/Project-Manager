import { useState } from "react";
import { FaEdit, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Task = ({ task, deleteTask }) => {
  const { id, title, desc, date } = task;
  const navigate = useNavigate(); // Initialize useNavigate

  // State untuk menyimpan nilai edit
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [updatedTask, setUpdatedTask] = useState(task);

  const toggle = async (element) => {
    const newTask = { ...updatedTask, [element]: !updatedTask[element] };
    setUpdatedTask(newTask);

    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      toast.success("Task updated successfully.");

      // Navigasi untuk mengarah page
      if (element === "completed" && newTask.completed) {
        navigate("/completed");
      } else if (element === "important" && newTask.important) {
        navigate("/important");
      }
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  const handleDelete = () => {
    deleteTask(id); // Menggunakan fungsi deleteTask dari context
    toast.success("Task deleted successfully.");
  };

  const handleEdit = async () => {
    const newTask = { ...updatedTask, title: editedTitle, desc: editedDesc };
    setUpdatedTask(newTask);

    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      toast.success("Task updated successfully.");
      setIsEditing(false); // Tutup form edit
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg flex flex-col justify-between border relative border-slate-500 p-4">
      <div
        className="cursor-pointer absolute right-2 top-2"
        onClick={() => toggle("important")}
      >
        {updatedTask.important ? (
          <FaStar className="text-2xl text-yellow-500" title="important" />
        ) : (
          <FaRegStar
            className="text-2xl pointer-events-none text-slate-300"
            title="important"
          />
        )}
      </div>
      <h4 className="capitalize text-xl text-white">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-white bg-transparent border-b border-white"
          />
        ) : (
          updatedTask.title.substring(0, 25)
        )}
      </h4>
      <p className="text-slate-300 text-lg mt-2">
        {isEditing ? (
          <textarea
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
            className="text-white bg-transparent border-b border-white"
          />
        ) : (
          updatedTask.desc.substring(0, 100)
        )}
      </p>
      <div className="mt-4">
        <p className="text-md mb-2 text-white">{updatedTask.date}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => toggle("completed")}
            className={`rounded-3xl py-1 px-4 text-white cursor-pointer ${
              updatedTask.completed ? "bg-green-600" : "bg-red-500"
            }`}
          >
            {updatedTask.completed ? "Completed" : "Incomplete"}
          </button>
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            {isEditing ? (
              <button
                onClick={handleEdit}
                className="text-2xl text-gray-400 cursor-pointer"
              >
                Save
              </button>
            ) : (
              <FaEdit
                className="text-2xl text-gray-400 cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
            )}
            <FaTrash
              className="text-2xl text-gray-400 cursor-pointer"
              onClick={handleDelete}
            />
          </div>

         {/* Render task details */}
         <button onClick={() => toggle("completed")}>
        {updatedTask.completed}
        </button>
        <button onClick={() => toggle("important")}>
        {updatedTask.important}
        </button>
        <button onClick={() => deleteTask(id)}>
        </button>
        
        </div>
      </div>
    </div>
  );
};

export default Task;