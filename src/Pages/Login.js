import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginHandler } from "../Redux/reducers/auth";

const LoginPage = () => {
  let username = useRef();
  let password = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginHandler(username.current.value));
  };
  const onClickLogin = () => {
    onLogin();
    handleLogin();
  };
  const onLogin = async () => {
    let inputUsername = username.current.value;
    let inputPassword = password.current.value;
    try {
      let response = await axios.get(
        `http://localhost:5000/users?username=${inputUsername}&password=${inputPassword}`
      );

      if (response.data.length === 0) throw { message: "Account Not Found" };
      toast.success("Login Success");
      localStorage.setItem("id", JSON.stringify(response.data[0].id));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {}
  };

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center items-center max-w-2xl text-center my-10">
        <h1>Sign in or create an account</h1>
      </div>
      <div className="container mx-auto my-10 shadow shadow-slate-400 p-3 max-w-xl">
        <div className="content">
          <div className="personal flex flex-col mx-5 my-5">
            <input
              ref={username}
              className="my-4 border border-solid border-stone-600 rounded-lg px-3 h-[50px]"
              type="text"
              name="firstName"
              placeholder="Username or email address"
            />
            <input
              ref={password}
              className="my-4 border border-solid border-stone-600 rounded-lg px-3 h-[50px]"
              type="password"
              name="password"
              placeholder="Password"
            />
            <p className="my-2 underline text-blue-600">
              <a href="/">Forgot your username?</a>
            </p>
            <p className="my-2 underline text-blue-600">
              <a href="/">Forgot your password?</a>
            </p>
            <div className="text-red-600 mb-3 font-bold flex flex-row-reverse">
              {message}
            </div>
            <div className="flex flex-row-reverse">
              <button
                onClick={onClickLogin}
                className="text-white bg-green-700 w-[150px] rounded-full shadow-xl my-3 h-[70px]"
              >
                Sign in
              </button>
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

/* 
TUGAS: 
1. Validasi username dan email. unique username and email only
apabila sudah ter-register tampilkan error message
apabila belom, simpan db.json
*/
