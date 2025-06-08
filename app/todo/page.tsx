"use client";

import React from "react";
import dynamic from 'next/dynamic'
const TaskList = dynamic(() => import("@/app/todo/task-list"), { ssr: false })
import GoBack from "@/app/go-back";

export default function Home() {
  return (
    <>
      <nav className="absolute m-4">
        <GoBack></GoBack>
      </nav>
      <main>
        <TaskList></TaskList>
      </main>
    </>
  );
}
