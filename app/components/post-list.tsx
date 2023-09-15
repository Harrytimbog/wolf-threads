import React from "react";
import useSWR from "swr";
import Post from "./post";

const PostList = ({
  index,
  username,
  showEditBtn,
}: {
  index: number;
  username: string;
  showEditBtn?: boolean;
}) => {
  const { data, error, isLoading } = useSWR(
    () => "/api/posts?page=" + index + "&username=" + username
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading || !data) return <div>loading...</div>;
  return (
    <ul>
      {data.data.map((post: PostI) => {
        return (
          <li key={post.id} className="my-5">
            <Post post={post} showEditBtn={showEditBtn} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
