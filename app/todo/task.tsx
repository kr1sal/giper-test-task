"use client";

import React from "react";
import { FcCheckmark, FcEmptyTrash, FcSynchronize } from "react-icons/fc";

export enum TaskState {
  Running = "running",
  Done = 'done',
}

interface TaskProps {
  name: string;
  onDeleteAction: () => void;
}

export function Task({ name, onDeleteAction}: TaskProps) {
  const [state, setState] = React.useState<TaskState>(TaskState.Running);

  return (
    <li className={state === TaskState.Running ? "list-row w-xs" : "list-row w-xs bg-green-600 transition-colors rounded-none"}>
      <button className="btn btn-square btn-ghost rounded-full" onClick={() => state !== TaskState.Done ? setState(TaskState.Done) : setState(TaskState.Running)}>
        {state !== TaskState.Done ? <FcCheckmark className="size-7"/> : <FcSynchronize className="size-7"/>}
      </button>
      <h3>{name}</h3>
      <button className="btn btn-square btn-ghost rounded-full">
        <FcEmptyTrash className="size-7" onClick={() => onDeleteAction()}/>
      </button>
    </li>
  );
}