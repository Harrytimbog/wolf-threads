import Image from "next/image";
import React from "react";
import useSWR from "swr";

const AvatarForm = () => {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const user = data.data;
  return (
    <form>
      {user.avatar && (
        <div>
          <Image
            src={user.avatar}
            alt={user.avatar}
            width={200}
            height={200}
            className="rounded-full m-auto my-5"
          />
        </div>
      )}

      {!user.avatar && (
        <div
          className="bg-slate-600 rounded-full m-auto my-5"
          style={{ width: 200, height: 200 }}
        ></div>
      )}

      <input type="file" />
    </form>
  );
};

export default AvatarForm;
