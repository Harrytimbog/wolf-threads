import useSWR from "swr";
import EditForm from "./edit-form";

export default function EditPost({ params }: { params: { id: number } }) {
  const { data, error, isLoading } = useSWR("/api/posts/" + params.id);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h2>Edit Post</h2>
      <div className="flex flex-col gap-10">
        <EditForm post={data.data} />
        {/* <DeleteBtn /> */}
      </div>
    </div>
  );
}
