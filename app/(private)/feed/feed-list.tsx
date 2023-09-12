import useSWR from "swr";

function FeedList({ index }: { index: number }) {
  const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <ul>
      {data.data.map((post: PostI) => {
        return <li key={post.id}>{post.content}</li>;
      })}
    </ul>
  );
}
export default FeedList;
