const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Task 1', desc: 'Deskripsi Task 1', date: '2022-01-01', completed: false, important: false },
  { id: 2, title: 'Task 2', desc: 'Deskripsi Task 2', date: '2022-01-02', completed: false, important: false },
  // Data task lainnya
];

// Endpoint untuk mendapatkan semua task
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint untuk membuat task baru
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // Generate ID unik
  tasks.push(newTask);
  res.json(newTask);
});

// Endpoint untuk memperbarui task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Task tidak ditemukan' });
  }
});

// Endpoint untuk menghapus task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ message: 'Task tidak ditemukan' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

