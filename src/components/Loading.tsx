import Loader from "~/icons/Loader";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center bg-gray-600/60 backdrop-blur-sm">
      <Loader className="max-w-[100px] animate-spin stroke-blue-700" />
    </div>
  );
};

export default Loading;
