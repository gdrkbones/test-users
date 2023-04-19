import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Empty from "~/components/Empty";
import Loading from "~/components/Loading";
import PostItem from "~/components/PostItem";
import { api } from "~/utils/api";

const PostsByUser: NextPage = () => {
  const { query } = useRouter();
  const { data, isLoading, error } = api.user.getPosts.useQuery(
    query.userid as string
  );
  return (
    <main className="flex h-full min-h-screen w-full flex-col overflow-hidden">
      <div className=" flex w-full border-b-4 bg-white p-4">
        <h1 className="flex items-center justify-between text-3xl font-bold">
          <Link className="group flex items-center text-blue-500" href="/">
            Users
            <span className="block px-4 transition-all duration-500 group-hover:-translate-x-2">
              {"<"}
            </span>
          </Link>
          Posts
        </h1>
      </div>
      <div className="flex h-screen flex-col space-y-2 overflow-y-scroll p-4">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <span>error</span>
        ) : // <DisplayError />
        data.length === 0 ? (
          // <EmptyData />
          <Empty />
        ) : (
          data.map((props) => <PostItem key={props.id} {...props} />)
        )}
      </div>
    </main>
  );
};

export default PostsByUser;
