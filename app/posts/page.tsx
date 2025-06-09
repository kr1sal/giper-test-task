"use client";

import {useState, useEffect} from "react";
import {KeyboardEvent} from "react";
import fetchPosts from "@/utils/fetch-posts";
import type PostData from "@/types/post";
import {FcFilledFilter} from "react-icons/fc";
import GoBack from "@/app/go-back";
import Post from "@/app/posts/post";

export default function PostsPage() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [titleFilter, setTitleFilter] = useState<RegExp>(new RegExp(''))

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, [])

  const onFilter = () => {
    const element = document.querySelector("#title-filter-input");
    if (element && element instanceof HTMLInputElement) {
      setTitleFilter(new RegExp(element.value, "i"));
    }
  }

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") onFilter();
  }

  return (
    <div className="flex flex-col items-start justify-between gap-4 p-4">
      <nav className="flex items-center justify-between w-full">
        <GoBack />
        <div className="join rounded-full bg-base-100">
          <button className="btn btn-square rounded-l-full"
                  onClick={onFilter}>
            <FcFilledFilter className="size-7"/>
          </button>
          <input id="title-filter-input" type="text" placeholder="Search by Title" className="input rounded-r-full bg-transparent"
                 onKeyUp={onEnter} />
        </div>
      </nav>
      <div className="overflow-x-auto rounded-box border-base-content/5 w-full bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
          </thead>
          <tbody>
            {posts
              .filter(({title}) => titleFilter.test(title))
              .map((post) => {
                return (
                  <Post key={post.id} id={post.id} userId={post.userId} title={post.title} body={post.body}></Post>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
