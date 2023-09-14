"use client";

import React from "react";
import useSWR from "swr";
import Form from "./form";
import PostContainer from "@/app/components/post-container";

const Profile = () => {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log(data);

  return (
    <main>
      <h2>Profile</h2>
      <Form />
      <PostContainer username={data.data.username} />
    </main>
  );
};

export default Profile;
