import axios from "axios";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import LoadingData from "../../Loading/LoadingData";

const Users = () => {
  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/user"
    );
  };
  const {
    data: allUser,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["manageAllUser", 1], queryFn: getData });
  if (isLoading) {
    return (
      <div className=" mt-10">
        <LoadingData />;
      </div>
    );
  }
  console.log(allUser);

  const deleteItem = async (id) => {
    const sure = window.confirm("Are you sure? You want to remove this user!");
    if (sure) {
      const url = `https://tekno-interior-server.onrender.com/api/user/${id}`;

      axios
        .delete(url, {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          const { data } = response;
          if (data) {
            refetch();
          }
        });
    }
  };

  return (
    <>
      <div className="w-full min-h-screen px-1 bg-gray-100 py-5 md:py-10">
        <div className=" hidden md:block mx-auto sm:px-6 lg:px-12">
          <div className="flex flex-col">
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200 font-thin bg-white leading-4 tracking-wider text-base text-gray-500">
                      <th className="px-6 py-5 text-left" colSpan="100%">
                        <p>Manage Product</p>
                      </th>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 text-center font-medium">
                        Product Image
                      </th>
                      <th className="px-6 py-3 text-center font-medium">
                        Product Name
                      </th>
                      <th className="px-6 py-3  font-medium text-center">
                        Price
                      </th>

                      <th className="px-6 py-3 text-center font-medium">
                        Cancel Booking
                      </th>
                      <th className="px-6 py-3 text-center font-medium">
                        Payment
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {allUser?.data?.map((user) => (
                      <tr key={user?._id}>
                        <td className="flex justify-center px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="avatar">
                            <div className="w-12 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                              <img
                                className=" "
                                src={user?.pic}
                                alt="product"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <div className="flex flex-col items-center  justify-center">
                              <div>{user?.name}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 text-center py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          <div className="flex flex-col items-center">
                            <p>{user?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => deleteItem(user?._id)}
                              className="btn md:btn-md btn-sm  btn-error  text-white font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => user?._id}
                              className="btn md:btn-md btn-sm  btn-warning  text-white font-semibold"
                            >
                              Make Admin
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* mobile device  */}
        <div className="md:hidden w-full  lg:px-8">
          <div className="flex flex-col">
            <div className="flex justify-end   items-center py-5">
              <NavLink
                to="/dashboard/manage-booking"
                className="btn md:btn-md btn-sm  px-10 btn-secondary text-white mx-auto"
              >
                Manage Booking
              </NavLink>
            </div>

            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200 font-thin bg-white leading-4 tracking-wider text-base text-gray-500">
                      <th className="px-6 py-5 text-left" colSpan="100%">
                        <p>All User</p>
                      </th>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                      <th className=" py-3 text-center font-normal">U. Info</th>

                      <th className="py-3 text-center font-normal">R. User</th>
                      <th className=" py-3 text-center font-normal">
                        M. Admin
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {allUser?.data?.map((item) => (
                      <tr className="" key={item?._id}>
                        <td className=" py-4  border-b border-gray-200">
                          <div className="text-sm leading-5 text-secondary">
                            <div className="flex flex-col items-center  justify-center">
                              <td className="flex justify-center px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="avatar">
                                  <div className="w-10 rounded-full ring-2 ring-secondary">
                                    <img
                                      className=" "
                                      src={item?.pic}
                                      alt="product"
                                    />
                                  </div>
                                </div>
                              </td>
                              <div>
                                {item?.name?.length > 10
                                  ? `${item?.name?.slice(0, 10)}..`
                                  : item?.name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 border-b">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => deleteItem(item?._id)}
                              className="btn md:btn-md btn-sm  btn-error  text-white font-normal"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="py-4 border-b">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => item?._id}
                              className="btn md:btn-md btn-sm  btn-warning  text-white font-normal"
                            >
                              Admin
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {allUser?.data?.length === 0 ? (
          <h2 className="text-center mt-10 text-primary text-xl font-semibold">
            No Item Found
          </h2>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Users;
