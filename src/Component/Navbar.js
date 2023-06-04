import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginHandler, logOutHandler } from "../Redux/reducers/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [cartAmount, setCartAmount] = useState(0);

  const loginRedux = useSelector((state) => state.loginHandler.loginData);
  const user = loginRedux.username;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    keepLogin();
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/cart?userId=${parseInt(
          localStorage.getItem("id")
        )}`
      )
      .then((response) => {
        setCartAmount(response.data.length);
      });
  }, [cartAmount]);

  const keepLogin = async () => {
    try {
      let getId = localStorage.getItem("id");
      let response = await axios.get(`http://localhost:5000/users?id=${getId}`);
      dispatch(loginHandler(response.data[0].username));
    } catch (error) {}
  };
  const onLogOut = () => {
    toast.success("You have Successfully logged out");
    setTimeout(() => {
      localStorage.clear();
      dispatch(logOutHandler());
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <div className="flex bg-white justify-between items-center px-10 w-full sticky top-0 shadow shadow-slate-300 h-[70px]	z-10">
        <Toaster position="top-center" />
        <div className="nav-left">
          <span>
            <Link to="/">Logo</Link>
          </span>
          <span className="ml-3 font-bold">
            <Link to={"/menu"}> Orders</Link>{" "}
          </span>
          <span className="ml-3 font-bold">Cards</span>
          <span className="ml-3 font-bold">Gift</span>
        </div>
        {loginRedux.loginStatus === true ? (
          <>
            <div className="nav-right">
              <span className="relative">
                <Link to={"/carts"}>
                  <span className="mr-9 absolute left-[-55px] bottom-[-4px]">
                    <FontAwesomeIcon
                      className="cart-icon"
                      icon={faCartShopping}
                    />
                    {cartAmount > 0 ? (
                      <div className="w-6 h-6 absolute bg-red-600 text-white mr-2 mb-2 text-sm justify-center content-center text-center inline-block border-2 left-4 bottom-1 border-white rounded-full">
                        <p className="absolute bottom-0 left-[6px] font-bold">
                          {cartAmount}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </span>
                </Link>

                <span className="font-bold mr-1 tracking-wide italic text-xl">
                  Hello,
                </span>
                <span className="font-semibold tracking-wide text-base mr-3">
                  {user}
                </span>
              </span>
              <button
                onClick={onLogOut}
                className="bg-red-600 font-bold text-white rounded-full px-3 py-1 shadow-slate-300 border-slate-900 mr-3 ml-3"
              >
                Log out
              </button>
            </div>
          </>
        ) : (
          <div className="nav-right">
            <span className="mr-3">Find a store</span>

            <span>
              <button className="bg-white text-black rounded-full px-3 py-1 border border-slate-900 mr-3">
                <Link to="/login">Sign in</Link>
              </button>
            </span>
            <span>
              <button className="bg-black text-white rounded-full px-3 py-1 mr-3">
                <Link to="/register">Join Now</Link>
              </button>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
