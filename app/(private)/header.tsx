"use client";

import useSWR from "swr";
import React from "react";

const fetcher = async (url: RequestInfo | URL) => {
  const res = await fetch(url);

  if (!res.ok) {
    const msg = "An error occurred while fetching the data.";
    const info = await res.json();
    const status = res.status;
    const error = new Error(msg);
    console.error(info, status);
    throw error;
  }
  return res.json();
};

const Header = () => {
  const { data, error, isLoading } = useSWR("/api/users/profile", fetcher);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return <header>{data.data.username}</header>;
};

export default Header;
