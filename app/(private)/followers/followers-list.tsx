import User from "@/app/components/user";
import useSWR from "swr";

const FollowersList = ({ index }: { index: number }) => {
  const { data: userData } = useSWR("/api/users/profile");
  const { data: followerData } = useSWR(
    () => "/api/users/" + userData.data.id + "/followers?page=" + index
  );

  if (!followerData) return <div>Loading...</div>;

  return (
    <ul>
      {followerData.data.map((user: UserI) => {
        return (
          <li key={user.id} className="my-5">
            <User user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default FollowersList;
