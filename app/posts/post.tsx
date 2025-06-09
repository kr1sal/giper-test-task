import type PostProps from "@/types/post";

export default function Post({id, userId, title, body}: PostProps) {
  return (
    <tr key={id}>
      <th>{id}</th>
      <td>{userId}</td>
      <td>{title}</td>
      <td>{body}</td>
    </tr>
  );
}