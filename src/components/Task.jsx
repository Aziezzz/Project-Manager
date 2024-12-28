import { useState, useEffect } from "react";
import { FaEdit, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { useContextApp } from "../context/AppContext";
import { toast } from "react-toastify";

const Task = ({ task }) => {
  const { id, title, desc, date, completed, important } = task;
  const { deleteTask, edit } = useContextApp();
  
  // State untuk menyimpan nilai edit
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [updatedTask, setUpdatedTask] = useState(task); // State untuk menyimpan task yang diperbarui

  // UseEffect untuk memuat data dari local storage
  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${id}`);
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setEditedTitle(parsedTask.title);
      setEditedDesc(parsedTask.desc);
    }
  }, [id]);

  const toggle = (element) => {
    toast.success("Successfully Updated.");
    const newTask = { ...updatedTask, [element]: !updatedTask[element] };
    setUpdatedTask(newTask);
    edit(newTask);
  };

  const remove = () => {
    toast.success("Successfully Deleted.");
    deleteTask(id);
  };

  const handleEdit = () => {
    const newTask = { ...updatedTask, title: editedTitle, desc: editedDesc };
    setUpdatedTask(newTask);
    edit(newTask);
    localStorage.setItem(`task-${id}`, JSON.stringify(newTask)); // Simpan ke local storage
    toast.success("Task Updated Successfully.");
    setIsEditing(false); // Tutup form edit
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
      {/* buttons  */}
      <div className="mt-4">
        <p className="text-md mb-2 text-white">{updatedTask.date}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => toggle("completed")}
            className={`rounded-3xl py-1 px-4 text-white cursor-pointer ${
              updatedTask.completed ? "bg-green-600" : "bg-red-500"
            }`}
          >
            {updatedTask.completed ? "Completed" : "InComplete"}
          </button>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <button onClick={handleEdit} className="text-2xl text-gray-400 cursor-pointer">
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
              onClick={remove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;