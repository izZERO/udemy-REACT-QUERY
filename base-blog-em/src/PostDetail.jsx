import { useQuery } from "@tanstack/react-query"
import { fetchComments } from "./api"
import "./PostDetail.css"

export function PostDetail({ post, deleteMutation, updateMutation}) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching comments</div>
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isPending && <p> Deleting... </p>}
      {deleteMutation.isError && <p> Error while Deleting </p>}
      {deleteMutation.isSuccess && <p> post has been Deleted... </p>}
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>      {updateMutation.isPending && <p> Updating... </p>}
      {updateMutation.isError && <p> Error while Updating </p>}
      {updateMutation.isSuccess && <p> post has been updated... </p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  )
}
