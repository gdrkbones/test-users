import { Post } from "~/domain/post";

const PostItem = ({ title, body }: Post) => {
  return (
    <div className="space-y-2 rounded-md p-4 ring-2">
      <div className="flex flex-col overflow-hidden">
        <h2 className="mb-2 border-b-2 text-xl">{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default PostItem;
