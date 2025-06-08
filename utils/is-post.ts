import type Post from "@/types/post";

function isPost(data: unknown): data is Post {
  if (!data || typeof data !== "object") return false;
  if (!('id' in data) || typeof data.id !== "number") return false;
  if (!('userId' in data) || typeof data.userId !== "number") return false;
  if (!('title' in data) || typeof data.title !== "string") return false;
  if (!('body' in data) || typeof data.body !== "string") return false;
  return true;
}

export default isPost;