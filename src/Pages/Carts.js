import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const CartsPage = () => {
  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/cart?usersId=${parseInt(
          localStorage.getItem("id")
        )}`
      )
      .then((response) => {
        setCartData(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/products`).then((response) => {
      setProductData(response.data);
      setIsFetched(true);
    });
  }, [cartData]);

  const ProductDetail = () => {
    let totalP = 0;
    let totalQ = 0;
    return cartData.map((val, i) => {
      const product = productData.filter((i) => i.id === val.productsId);
      let price = val.quantity * product[0].size[val.indexSize].price;

      totalP += price;
      totalQ += val.quantity;
      setTotalPrice(totalP);
      setTotalQuantity(totalQ);
      console.log(price);
      console.log(totalPrice);
      return (
        <>
          <div className="cart-detail  flex flex-col">
            <div>
              <span className="flex flex-row mb-5 content-center">
                <div className="flex content-center h-32 w-32 ">
                  <img
                    className="cart-image rounded-md m-auto"
                    src={product[0].image}
                    alt=""
                  />
                </div>
                <div className="cart-detail">
                  <h2 className="font-semibold border-b-2 border-gray-500 mb-3">
                    {product[0].name}
                  </h2>
                  <ul className="tracking-wide">
                    <li>Size: {product[0].size[val.indexSize].option}</li>
                    <li>Topping: {product[0].topping[val.indexTopping]}</li>
                    <li>Sugar: {product[0].sugar[val.indexSugar]}</li>
                  </ul>
                  <span>Quantity : {val.quantity}</span>
                </div>
              </span>
            </div>
          </div>
        </>
      );
    });
  };

  if (!isFetched) return null;
  return (
    <>
      <div>
        <div className="cart-container font-bucks pt-20 content-center m-auto">
          <div className="mx-auto flex flex-row justify-center">
            <div className="cart w-1/2 mr-20 p-6 px-10 border-2 border-gray-400 rounded-lg">
              <h1 className="text-left h-12 font-bold text-3xl">Cart Detail</h1>
              <div className="border bg-slate-300 rounded-full h-[3px] w-full mb-10"></div>
              <ProductDetail />
            </div>
            <div className="price-detail  h-1/2 w-96 flex flex-col p-6 px-10 border-2 border-gray-400 rounded-lg">
              <h1 className="text-left h-12 font-bold text-3xl">
                Price Detail
              </h1>
              <div className="border bg-slate-300 rounded-full h-[3px] w-full mb-10"></div>
              <div className="flex flex-row justify-between mb-2">
                <p className="font-medium mb-4">
                  Total Price ({totalQuantity} Item(s) )
                </p>
                <p className="font-bold text-lg">
                  Rp. {totalPrice.toLocaleString()}
                </p>
              </div>
              <div className="border bg-slate-300 rounded-full h-[3px] w-full"></div>
              <Link>
                <button className="mt-12 h-12 w-full mb-3 tracking-wider text-lg bg-[#00754A] font-bold text-white rounded-md">
                  Checkout ({totalQuantity})
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartsPage;
