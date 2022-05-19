/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";
import { useSelector } from "react-redux";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/products`;

const ManageProducts = () => {
  const user = useSelector((state) => state.user);
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchUserProducts = async (id) => {
      const products = await fetchWrapper.get(
        `${baseUrl}/users/${id}/products`
      );
      console.log(products);
    };
    if (user.id) {
      fetchUserProducts(user.id);
    }
  }, []);
  return (
    <div>
      <h1>Your Listings</h1>
    </div>
  );
};

export default ManageProducts;
