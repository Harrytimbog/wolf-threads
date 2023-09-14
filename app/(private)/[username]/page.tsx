import PostContainer from "@/app/components/post-container";
import UserPageHeader from "./user-page-header";

const UserPage = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <PostContainer username={params.username} />
    </div>
  );
};

export default UserPage;
