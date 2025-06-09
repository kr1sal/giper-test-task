"use client";

import {useState, useEffect} from "react";
import {ChangeEvent} from "react";
import {Task, TaskState} from "@/app/todo/task";
import safeParse from "@/utils/safe-parse";
import isTypedArray from "@/utils/is-typed-array";
import isTaskData from "@/utils/isTask";
import TaskData from "@/types/task";

function getFreeId(tasks: TaskData[], startId: number = 0): number {
  for (const {id} of tasks) {
    if (id === startId) {
      return getFreeId(tasks, startId + 1);
    }
  }
  return startId;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskData[]>(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem("tasks");
      if (storedData !== null) {
        const tasks = safeParse(storedData, (data) => isTypedArray(data, isTaskData));
        if (tasks !== undefined) return tasks;
      }
    }
    return []
  });
  const [input, setInput] = useState<string>(() => {
    if (typeof window !== 'undefined') return localStorage.getItem("input") || '';
    return '';
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("input", input || '');
  }, [input]);

  const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const addTask = () => {
    setTasks([...tasks, {id: getFreeId(tasks), name: input, state: TaskState.Running}]);
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const changeState = (id: number, state: TaskState) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        const newTask = {...task}
        newTask.state = state;
        return newTask;
      }
      return task;
    }));
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold cent">To Do List</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs p-4">
        <legend className="fieldset-legend">Add Task</legend>
        <div className="join">
          <input type="text" className="input join-item" value={input} placeholder="Your task name"
                 onChange={updateInput} />
          <button className="btn join-item"
                  onClick={addTask}>
            Add
          </button>
        </div>
      </fieldset>
      <ul className="list bg-base-100 rounded-box shadow-md overflow-hidden">
        {tasks.map((task: TaskData) => {
          return (
            <Task key={task.id} name={task.name} initialState={task.state}
                  onDeleteAction={() => deleteTask(task.id)}
                  onChangeStateAction={(state) => changeState(task.id, state)}>
            </Task>
          );
        })}
      </ul>
    </div>
  );
}