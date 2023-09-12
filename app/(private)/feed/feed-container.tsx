"use client";

import { useState } from "react";
import FeedList from "./feed-list";

const FeedContainer = () => {
  const [cnt, setCnt] = useState(1);

  const pages = [];

  for (let i = 0; i < cnt; i++) {
    pages.push(<FeedList index={i} key={i} />);
  }

  return (
    <div>
      {pages}
      <div onClick={() => setCnt(cnt + 1)}>Load More</div>
    </div>
  );
};

export default FeedContainer;
