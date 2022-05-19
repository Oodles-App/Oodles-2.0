/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { fetchUserProducts } from "../../redux/userProducts";
import { deleteProduct } from "../../redux/userProducts";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.userProducts);

  console.log(products, "products");
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserProducts(user));
    }
  }, []);
  return (
    <div>
      <h1>Your Listings</h1>
      {products.map((product) => (
        <div key={product.id}>
          {product.name}
          <button
            type="button"
            onClick={() => dispatch(deleteProduct(product.id, user))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
