import { useState, useEffect } from "react";
import axios from "axios";
import radioButton from "../Assets/radio-button.svg";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProductDetailPage = () => {
  let { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [size, setSize] = useState([]);
  const [choice, setChoice] = useState("");
  const [price, setPrice] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  const [indexSize, setIndexSize] = useState(0);
  const [indexTopping, setIndexTopping] = useState(0);
  const [indexSugar, setIndexSugar] = useState(0);

  const [cartAmount, setCartAmount] = useState(0);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/cart?usersId=${parseInt(
          localStorage.getItem("id")
        )}`
      )
      .then((response) => {
        setCartAmount(response.data.length);
      });
  }, [cartAmount]);
  useEffect(() => {
    axios.get(`http://localhost:5000/products?id=${id}`).then((response) => {
      setProductData(response.data);
      setSize(response.data[0].size);
      setChoice(response.data[0].size[0].calories);
      setPrice(response.data[0].size[0].price);
      setIsFetched(true);
    });
  }, []);

  const GetSize = () => {
    return size.map((val, i) => {
      const getCal = val.calories;
      return (
        <>
          <div key={i} className="flex flex-col mr-7">
            <div
              className={`w-14 h-14 ${
                getCal === choice
                  ? " border-2 rounded-full border-[#006241] bg-[#D4E9E2]"
                  : ""
              }`}
            >
              <label className="flex justify-center content-center">
                <input
                  onChange={(e) => {
                    setChoice(val.calories);
                    setPrice(val.price);
                    setIndexSize(i);
                  }}
                  className="flex flex-col mr-5 "
                  name={`radio${i}`}
                  type="radio"
                  checked={getCal === choice ? true : false}
                />
                <img src={radioButton} alt="radiobutton" />
              </label>
            </div>
            <p className="text-center text-lg mt-5 font-bold">{val.option}</p>
            <p className="text-center mt-2 font-semibold">{val.cup}</p>
          </div>
        </>
      );
    });
  };
  const GetTopping = () => {
    return productData[0].topping.map((val, i) => {
      return (
        <>
          <option value={i} className="">
            {val}
          </option>
        </>
      );
    });
  };

  const GetSugar = () => {
    return productData[0].sugar.map((val, i) => {
      return (
        <>
          <option value={i} key={i} className="">
            {val}
          </option>
        </>
      );
    });
  };

  const AddToCart = async () => {
    try {
      let dataToSend = {
        productsId: parseInt(id),
        indexSize: parseInt(indexSize),
        indexTopping: parseInt(indexTopping),
        indexSugar: parseInt(indexSugar),
        quantity: 1,
        usersId: parseInt(localStorage.getItem("id")),
      };

      let checkCart = await axios.get(
        `http://localhost:5000/cart?productsId=${parseInt(
          id
        )}&usersId=${parseInt(localStorage.getItem("id"))}`
      );

      if (checkCart.data.length > 0) {
        await axios.patch(
          `http://localhost:5000/cart/${checkCart.data[0].id}`,
          { quantity: checkCart.data[0].quantity + 1 }
        );
        toast(`Product Already in Carts, Update Quantity Success`);
      } else {
        await axios.post(`http://localhost:5000/cart`, dataToSend);
        setCartAmount(cartAmount + 1);
        toast(`add to Cart Success`);
      }
    } catch (error) {}
  };

  if (!isFetched) return null;
  return (
    <>
      <div className="detail-container flex flex-col">
        <Toaster position="top-center" />
        <div className="product-splash flex flex-row flex-wrap justify-center content-center p-7 bg-bucks">
          <div className="product-pic mr-32">
            <img src={productData[0].image} alt="" />
          </div>
          <div className="product-desc flex flex-col justify-center content-center flex-wrap ml-32">
            <h1 className=" text-white text-[40px] font-bucks font-bold">
              {productData.length === 0 ? "" : productData[0].name}
            </h1>
            <h2 className="text-gray-400 text-2xl font-bucks font-semibold">
              {choice === 0 ? "" : choice} calories
            </h2>
            <h2 className="text-gray-400 text-2xl font-bucks font-semibold">
              Rp. {price === 0 ? "" : price.toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="flex flex-row p-7 justify-center ">
          <div className="size-option w-1/4 mr-20">
            <div className="size-title">
              <h1 className="text-2xl font-bold">Size options</h1>
              <div className="border bg-slate-300 rounded-full h-1 w-full mb-5"></div>
            </div>
            <div className="flex flex-row">
              <form className="flex flex-row">
                <GetSize />
              </form>
            </div>
          </div>
          <div className="select-customization w-1/3  text-2xl font-bold ">
            <h1 className="text-2xl font-bold">Customization</h1>
            <div className="border bg-slate-300 rounded-full h-1 w-full"></div>
            <div className="select-topping mt-6">
              <form action="">
                <h1 className="text-3xl ml-4">Select Topping</h1>
                <select
                  className="text-xl ml-6 text-gray-500 color mt-4"
                  name=""
                  id=""
                  value={indexTopping}
                  onChange={(e) => setIndexTopping(e.target.value)}
                >
                  <GetTopping />
                </select>
              </form>
            </div>
            <div className="select-topping mt-6">
              <form action="">
                {productData[0].category < 2 ? (
                  <>
                    <h1 className="text-3xl ml-4"> Select Sugar Level</h1>
                    <select
                      className="text-xl ml-6 text-gray-500 color mt-4"
                      name=""
                      id=""
                      onChange={(e) => setIndexSugar(e.target.value)}
                    >
                      {productData[0].category < 2 ? <GetSugar /> : <></>}
                    </select>
                  </>
                ) : (
                  <></>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end mr-10 relative">
        {cartAmount > 0 ? (
          <div className="cart-ammount w-9 h-9 z-10 mr-2 mb-2 absolute top-[-5px] right-[-2px] bg-red-600 text-white flex justify-center content-center text-center font-bold border-2 border-white rounded-full">
            <span className="absolute top-1">{cartAmount}</span>
          </div>
        ) : (
          <></>
        )}
        <button
          onClick={AddToCart}
          className="bg-[#00754A] fixed h-12 font-bold text-white rounded-full mb-3 px-3 py-1 mr-6 mt-4 ml-3"
        >
          Add to order
        </button>
      </div>
    </>
  );
};

export default ProductDetailPage;
