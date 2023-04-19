import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { User } from "~/domain/user";
import Modal from "~/libs/component/Modal";
import { api } from "~/utils/api";

export type UserComponentProps = Omit<User, "gender">;

const UserItem = ({ id, name, email, status }: UserComponentProps) => {
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const { mutateAsync } = api.user.deleteUser.useMutation();
  const { refetch } = api.user.getAll.useQuery();
  return (
    <>
      <Modal isOpen={showDeleteUser} onClose={() => setShowDeleteUser(false)}>
        <div className="space-y-2 rounded-lg border-2 border-blue-600 bg-white p-4">
          <p className="border-b-4 p-2">
            Do you really wanna delete User{" "}
            <b className="text-lg text-red-600">{name}</b>
          </p>
          <div className="flex justify-end space-x-2">
            <button
              className="btn"
              onClick={() => {
                setShowDeleteUser(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn"
              onClick={() => {
                mutateAsync(String(id))
                  .then((user) => {
                    refetch();
                    setShowDeleteUser(false);
                  })
                  .catch((error) => {
                    console.log({ error });
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="space-y-2 rounded-md p-4 ring-2">
        <div className="flex flex-col overflow-hidden">
          <h2 className="mb-2 border-b-2 text-xl">{name}</h2>
          <a href={`mailto:${email}`}>
            <h3 className=" font-mono">{email}</h3>
          </a>
          {/* <span className="">{gender}</span> */}
          <p
            className={clsx(
              "font-bold uppercase",
              status === "active" ? "text-green-600" : "text-gray-600"
            )}
          >
            {status}
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <Link href={`/posts/${id}`}>
            <button className="btn">Posts</button>
          </Link>
          <button
            className="btn"
            onClick={() => {
              setShowDeleteUser(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default UserItem;
