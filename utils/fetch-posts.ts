"use server";

import axios from "axios";
import isTypedArray from "@/utils/is-typed-array";
import isPost from "@/utils/is-post";
import Post from "@/types/post";

export default async function fetchPosts(): Promise<Post[]> {
  if (process.env.POSTS_ENDPOINT === undefined) return [];
  try {
    const response = await axios.get(process.env.POSTS_ENDPOINT);
    if (isTypedArray(response.data, isPost)) return response.data;
    return []
  } catch {
    return [];
  }
}