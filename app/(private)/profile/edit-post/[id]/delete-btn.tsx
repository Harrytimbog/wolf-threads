import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteBtn = ({ post }: { post: PostI }) => {
  const router = useRouter();
  const [state, setState] = useState({ showConfirm: false });

  async function handleDeletePost() {
    const res = await fetch("/api/posts/" + post.id, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/profile");
    }
  }

  function handleClick() {
    // const newState = Object.assign({}, state, {
    //   showConfirm: !state.showConfirm,
    // });

    // setState(newState);
    setState({ ...state, showConfirm: !state.showConfirm });
  }
  return (
    <div>
      {!state.showConfirm && (
        <button className="text-red-400" onClick={handleClick}>
          Delete Post
        </button>
      )}

      {state.showConfirm && (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <div className="flex flex-row gap-10">
            <button className="text-red-400" onClick={handleDeletePost}>
              Yes
            </button>
            <button className="text-blue-400" onClick={handleClick}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBtn;
