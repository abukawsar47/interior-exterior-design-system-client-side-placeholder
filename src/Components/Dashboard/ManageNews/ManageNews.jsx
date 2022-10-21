import axios from "axios";
import { useQuery } from "react-query";
import LoadingData from "../../Loading/LoadingData";

const ManageNews = () => {
  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/news"
    );
  };
  const {
    data: allNews,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["manageNewsByAdmin", 1], queryFn: getData });
  if (isLoading) {
    return (
      <div className=" mt-10">
        <LoadingData />;
      </div>
    );
  }

  const deleteItem = async (id) => {
    const sure = window.confirm("Are you sure? You want to cancel booking!");
    if (sure) {
      try {
        const url = `https://tekno-interior-server.onrender.com/api/news/${id}`;
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
      } catch (error) {
        console.log(error);
      }
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
                        <p>Manage News</p>
                      </th>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 text-center font-medium">
                        News Image
                      </th>
                      <th className="px-6 py-3 text-center font-medium">
                        News Title
                      </th>
                      <th className="px-6 py-3  font-medium text-center">
                        Price
                      </th>

                      <th className="px-6 py-3 text-center font-medium">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {allNews?.data?.map((product) => (
                      <tr key={product?._id}>
                        <td className="flex justify-center px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="avatar">
                            <div className="w-12 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                              <img
                                className=" "
                                src={product?.img}
                                alt="product"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <div className="flex flex-col items-center  justify-center">
                              {/* <div>{product?.title}</div> */}
                              {product?.title?.length > 30
                                ? `${product?.title?.slice(0, 30)}...`
                                : product?.title}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 text-center py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          <div className="flex flex-col items-center">
                            <p>{product?.date} </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => deleteItem(product?._id)}
                              className="btn md:btn-md btn-sm  btn-error  text-white font-semibold"
                            >
                              Delete
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
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200 font-thin bg-white leading-4 tracking-wider text-base text-gray-500">
                      <th className="px-6 py-5 text-left" colSpan="100%">
                        <p>Manage News</p>
                      </th>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                      <th className=" py-3 text-center font-normal">N. Info</th>

                      <th className="py-3 text-center font-normal">
                        Delete News
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {allNews?.data?.map((item) => (
                      <tr className="" key={item?._id}>
                        <td className=" py-4  border-b border-gray-200">
                          <div className="text-sm leading-5 text-secondary">
                            <div className="flex flex-col items-center  justify-center">
                              <td className="flex flex-col items-center justify-center px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="avatar">
                                  <div className="w-10 rounded-full ring-2 ring-secondary">
                                    <img
                                      className=" "
                                      src={item?.img}
                                      alt="product"
                                    />
                                  </div>
                                </div>
                                <div className="my-2">{item?.title}</div>
                              </td>
                              <div>
                                {item?.productName?.length > 10
                                  ? `${item?.productName?.slice(0, 10)}..`
                                  : item?.productName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 border-b">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => deleteItem(item?._id)}
                              className="btn  md:btn-md btn-sm  btn-error  text-white font-normal"
                            >
                              Delete
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
        {allNews?.data?.length === 0 ? (
          <h2 className="text-center mt-10 text-secondary text-xl font-semibold">
            No Item Found
          </h2>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ManageNews;
