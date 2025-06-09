import {TaskState} from "@/app/todo/task";

interface Task {
  id: number;
  name: string;
  state: TaskState;
}

export default Task;