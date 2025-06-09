import Link from "next/link";

export default function Home() {
  return (
    <nav className="flex flex-col items-center justify-center min-h-screen">
      <ul className="menu bg-base-200 rounded-box">
        <li>
          <Link href="/todo" className="text-center ml-auto mr-auto text-2xl">To Do</Link>
        </li>
        <li>
          <Link href="/posts" className="text-center ml-auto mr-auto text-2xl">Posts</Link>
        </li>
      </ul>
    </nav>
  );
}
