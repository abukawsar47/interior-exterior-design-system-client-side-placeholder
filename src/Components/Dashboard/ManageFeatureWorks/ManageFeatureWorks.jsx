import axios from "axios";
import { useQuery } from "react-query";
import LoadingData from "../../Loading/LoadingData";

const ManageFeatureWorks = () => {
  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/featured-item"
    );
  };
  const {
    data: products,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["manageAllProducts", 1], queryFn: getData });
  if (isLoading) {
    return (
      <div className=" mt-10">
        <LoadingData />;
      </div>
    );
  }
  console.log(products);

  const deleteItem = async (id) => {
    const sure = window.confirm("Are you sure? You want to delete!");
    if (sure) {
      const url = `https://tekno-interior-server.onrender.com/api/featured-item/${id}`;

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
                      <th className="px-6 py-3 text-left font-medium">
                        Product Image
                      </th>
                      <th className="px-6 py-3 text-center font-medium">
                        Product Name
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
                    {products?.data?.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={product.img}
                            alt="product"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <div className="flex flex-col items-center  justify-center">
                              <div>{product.category}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 text-center py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          <div className="flex flex-col items-center">
                            <p>$ {product.price} USD</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => deleteItem(product._id)}
                              className="block  bg-teal-500 hover:bg-teal-600 text-white border-2 border-teal-500 hover:border-teal-600 px-3 py-2 rounded uppercase font-poppins font-medium"
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
                        <p>Manage Product</p>
                      </th>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 text-center font-medium">
                        Product Info
                      </th>

                      <th className="px-6 py-3 text-center font-medium">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {products?.data?.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <div className="flex flex-col items-center  justify-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.img}
                                  alt="product"
                                />
                              </div>
                              <div>
                                {item.category.length > 10
                                  ? `${item.category.slice(0, 10)}..`
                                  : item.category}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => deleteItem(item._id)}
                              className="block  bg-teal-500 hover:bg-teal-600 text-white border-2 border-teal-500 hover:border-teal-600 px-3 py-2 rounded uppercase font-poppins font-medium"
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
        {products?.data?.length === 0 ? (
          <h2 className="text-center mt-10 text-blue-500 text-xl font-semibold">
            No Item Found
          </h2>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ManageFeatureWorks;
