import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Loading from "~/components/Loading";
import clsx from "clsx";
import UserItem from "~/components/UserItem";
import Modal from "~/libs/component/Modal";
import UserForm from "~/components/forms/userForm";
import { useEffect, useState } from "react";
import Pagination from "~/components/Pagination";
import Empty from "~/components/Empty";

const Home: NextPage = () => {
  const { mutateAsync } = api.user.createUser.useMutation();

  const [pagination, setPagination] = useState({ current: 1, maxPages: 0 });
  const { data, isLoading, error, refetch } = api.user.getAll.useQuery(
    pagination.current
  );

  console.log({ pagination });

  useEffect(() => {
    data?.maxPages &&
      data.maxPages !== pagination.maxPages &&
      setPagination((pag) => ({ ...pag, maxPages: data.maxPages }));
  }, [data?.maxPages]);

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const handleChangePagination = (current: number) => {
    console.log({ current });
    setPagination((pag) => ({ ...pag, current: current }));
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="GOREST API manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
      >
        <UserForm
          onSuccess={(user) => {
            mutateAsync(user)
              .then((user) => {
                refetch();
                setShowCreateUserModal(false);
              })
              .catch((error) => {
                console.log({ error });
              });
          }}
          onCancel={() => {
            setShowCreateUserModal(false);
          }}
        ></UserForm>
      </Modal>
      <main className="flex h-full min-h-screen w-full flex-col overflow-hidden">
        <div className=" flex w-full items-center justify-between border-b-4 bg-white p-4">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex">
            <button
              className="btn"
              onClick={() => setShowCreateUserModal(true)}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex h-12 items-center justify-center pt-2">
          <Pagination {...pagination} onChange={handleChangePagination} />
        </div>
        <div className="flex h-screen flex-col space-y-2 overflow-y-scroll p-4">
          {isLoading ? (
            <Loading />
          ) : error ? (
            <span>error</span>
          ) : // <DisplayError />
          data.users.length === 0 ? (
            // <EmptyData />
            <Empty />
          ) : (
            data.users.map((props) => <UserItem key={props.id} {...props} />)
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
