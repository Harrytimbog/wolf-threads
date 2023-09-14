"use client";
import { notFound } from "next/navigation";
import useSWR, { mutate } from "swr";

const UserPageHeader = ({ username }: { username: string }) => {
  const {
    data: dataUser,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useSWR("/api/users?username=" + username);

  const {
    data: dataFollow,
    error: errorFollow,
    isLoading: isLoadingFollow,
  } = useSWR(() => "/api/follows?user_id=" + dataUser.data[0].id);

  if (errorFollow || errorUser) return <div>failed to load</div>;
  if (isLoadingFollow || isLoadingUser) return <div>Loading...</div>;

  // Check if user does not exist in the database, then user page can't exist
  if (dataUser.data.length === 0) notFound();

  const user = dataUser.data[0];

  const handleFollow = async () => {
    const res = await fetch("/api/follows", {
      method: "post",
      body: JSON.stringify({ user_id: user.id }),
    });

    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  };

  const handleUnFollow = async () => {
    const res = await fetch("/api/follows/" + user.id, {
      method: "delete",
    });

    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  };

  return (
    <header className="w-full bg-slate-800 p-2 rounded-lg flex flex-row justify-between">
      <h1 className="text-lg font-bold">{username}</h1>
      {dataFollow.data.length > 0 && (
        <button
          onClick={handleUnFollow}
          className="bg-slate-900 p-2 rounded-lg"
        >
          Unfollow
        </button>
      )}
      {dataFollow.data.length === 0 && (
        <button onClick={handleFollow} className="bg-slate-900 p-2 rounded-lg">
          Follow
        </button>
      )}
    </header>
  );
};

export default UserPageHeader;
