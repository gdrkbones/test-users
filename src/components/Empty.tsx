import EmptyBox from "#/empty-box.png";
import Image from "next/image";

const Empty = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image src={EmptyBox} alt="Empty" />
    </div>
  );
};

export default Empty;
