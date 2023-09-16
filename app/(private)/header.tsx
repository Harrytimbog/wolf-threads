"use client";

import useSWR from "swr";
import React from "react";
import User from "../components/user";

const Header = () => {
  const { data, error, isLoading } = useSWR("/api/users/profile");
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <header className="flex flex-row w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2 justify-between items-center">
      <div>
        <h1 className="font-mono text-lg">Wolf Threads</h1>
      </div>
      <div>
        <User user={data.data} href="account" />
      </div>
    </header>
  );
};

export default Header;
