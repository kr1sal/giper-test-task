import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex flex-col">
        <ul className="">
          <li className="">
            <Link href="/todo">To Do</Link>
          </li>
          <li className="">
            <Link href="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
