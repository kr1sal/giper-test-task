"use client";

import {Task, TaskState} from "@/app/todo/task";
import React from "react";
import safeParse from "@/utils/safe-parse";

interface TaskData {
  id: number;
  name: string;
  state: TaskState;
}

function checkTaskData(data: unknown): data is TaskData {
  if (!data || typeof data !== 'object') return false;
  if (!('id' in data) || typeof data.id !== 'number') return false;
  if (!('name' in data) || typeof data.name !== 'string') return false;
  if (!('state' in data) || typeof data.state !== 'string') return false;
  return true;
}

function checkTaskDataArray(data: unknown): data is TaskData[] {
  if (!Array.isArray(data)) return false;
  for (const item of data) {
    if (!checkTaskData(item)) return false;
  }
  return true;
}

function getFreeId(tasks: TaskData[], startId: number = 0): number {
  for (const {id} of tasks) {
    if (id === startId) {
      return getFreeId(tasks, startId + 1);
    }
  }
  return startId;
}

export default function TaskList() {
  const [tasks, setTasks] = React.useState<TaskData[]>(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem("tasks");
      if (data !== null) {
        const tasks = safeParse(data, checkTaskDataArray);
        if (tasks !== undefined) return tasks;
      }
    }
    return []
  });
  const [input, setInput] = React.useState<string>(() => {
    if (typeof window !== 'undefined') return localStorage.getItem("input") || '';
    return '';
  });

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  React.useEffect(() => {
    localStorage.setItem("input", input || '');
  }, [input]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold cent">To Do List</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs p-4">
        <legend className="fieldset-legend">Add Task</legend>
        <div className="join">
          <input type="text" className="input join-item" value={input} placeholder="Your task name" onChange={(e) => setInput(e.target.value)} />
          <button className="btn join-item" onClick={() => {
            setTasks([...tasks, {id: getFreeId(tasks), name: input, state: TaskState.Running}]);
          }}>Add</button>
        </div>
      </fieldset>
      <ul className="list bg-base-100 rounded-box shadow-md overflow-hidden">
        {tasks.map((task: TaskData) => {
          return (
            <Task key={task.id} name={task.name} onDeleteAction={() => {
              setTasks(tasks.filter(({id}) => id !== task.id));
            }}></Task>
          );
        })}
      </ul>
    </div>
  );
}