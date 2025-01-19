"use client"
import React, { useState } from "react";

type Task = {
  id: number;
  name: string;
  description: string;
}

const tasks: Task[] = [
  { id: 1, name: "Ma tache 1", description: "Ceci est ma T1" },
  { id: 2, name: "Ma tache 2", description: "Ceci est ma T2" },
  { id: 3, name: "Ma tache 3", description: "Ceci est ma T3" },
  { id: 4, name: "Ma tache 4", description: "Ceci est ma T4" },
  { id: 5, name: "Ma tache 5", description: "Ceci est ma T5" },
  { id: 6, name: "Ma tache 6", description: "Ceci est ma T6" },
  { id: 7, name: "Ma tache 7", description: "Ceci est ma T7" }
]

export default function Home() {

  const [data, setData] = useState<Task[]>(tasks);

  const handleAddTask = () => {
    const newTask: Task = { id: 8, name: "Ma tache 8", description: "Ceci est ma T8" }
    setData([...data, newTask])
  }

  const handleDeleteTask = (id: number) => {
    console.log(id)
    const newArray: Task[] = data.filter((task) => task.id !== id);
    setData(newArray)
  }

  return (
    <div className="dark:bg-background dark:text-foreground bg-gray-100 w-full h-screen flex flex-col">
      <h1 className="text-center text-xl font-bold underline underline-offset-4">Liste des tâches</h1>
    
    {/* Button */}
    <button onClick={handleAddTask} className="bg-slate-700 text-white w-20 rounded-full">
      Ajouter
    </button>

    {/* Liste */}
    <ul className="p-16">
      {data.length > 0 ? (
        data.map((task) => (
          <ol key={task.id} className="flex gap-2">
            <p>{task.id} - {task.name}</p>
            <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 font-extrabold text-sm">DEL</button>
            </ol>
        ))
      ) : (
        <ol>Aucune tache</ol>
      )}
      
    </ul>
    </div>
  );
}
