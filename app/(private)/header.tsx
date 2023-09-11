"use client";

import useSWR from "swr";
import React from "react";

const Header = () => {
  const { data, error, isLoading } = useSWR("/api/users/profile");
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return <header>{data.data.username}</header>;
};

export default Header;
