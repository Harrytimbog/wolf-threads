import UserPageHeader from "./user-page-header";

const UserPage = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <div>posts container {params.username}</div>
    </div>
  );
};

export default UserPage;
