import Task from "@/types/task";

function isTask(data: unknown): data is Task {
  if (!data || typeof data !== 'object') return false;
  if (!('id' in data) || typeof data.id !== 'number') return false;
  if (!('name' in data) || typeof data.name !== 'string') return false;
  if (!('state' in data) || typeof data.state !== 'string') return false;
  return true;
}

export default isTask;