import React, { useState } from "react";
import PostList from "./post-list";

const PostContainer = ({ username }: { username: string }) => {
  const [cnt, setCnt] = useState(1);

  const pages = [];

  for (let i = 0; i < cnt; i++) {
    pages.push(<PostList index={i} username={username} />);
  }

  return (
    <div>
      {pages}
      <div>
        <button
          onClick={() => setCnt(cnt + 1)}
          className="bg-slate-900 p-2 rounded-lg self-center"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default PostContainer;
