import Image from "next/image";
import Link from "next/link";
import React from "react";

const Post = ({ post }: { post: PostI }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const createAt = new Date(post.created_at);
  return (
    <div>
      <div>
        <div>
          {post.avatar && (
            <Link href={`/${post.username}`}>
              <Image
                src={post.avatar}
                width={50}
                height={50}
                alt={post.username}
                className="rounded-full mr-3"
              />
            </Link>
          )}
          {!post.avatar && (
            <div
              className="bg-slate-600 rounded-full mr-3"
              style={{ width: 50, height: 50 }}
            ></div>
          )}
        </div>
        <div>
          <div>
            <div>
              <Link href={`/${post.username}`}>{post.username} </Link>
            </div>
            <div>{createAt.toLocaleDateString("en-us", options)}</div>
          </div>
        </div>
        <div>{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
