import { Activity, useState } from "react"; // naming may still be prefixed depending on version

function ActivityExample() {
  const [tab, setTab] = useState<string | null>(null);

  return (
    <>
      <button onClick={() => setTab("posts")}>Posts</button>
      <button onClick={() => setTab("comments")}>Comments</button>

      <Activity mode={tab === "posts" ? "visible" : "hidden"}>
        <PostsTab />
      </Activity>
      <Activity mode={tab === "comments" ? "visible" : "hidden"}>
        <CommentsTab />
      </Activity>
    </>
  );
}

function PostsTab() {
  return <div>PostsTab</div>;
}

function CommentsTab() {
  return <div>CommentsTab</div>;
}

export default ActivityExample;
