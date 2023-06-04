import { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  let username = useRef();
  let email = useRef();
  let password = useRef();

  const onRegister = async () => {
    try {
      let inputUsername = username.current.value;
      let inputEmail = email.current.value;
      let inputPassword = password.current.value;

      let response = await axios.get(`http://localhost:5000/users`);

      const checkUser = response.data.some((e) => e.username === inputUsername);
      const checkEmail = response.data.some((e) => e.email === inputEmail);

      if (!inputUsername || !inputEmail || !inputPassword)
        throw toast.error("Data not complete");
      else if (checkUser) {
        throw toast.error("Username is taken");
      } else if (checkEmail) {
        throw toast.error("Email is alread registered");
      } else {
        await axios.post(`http://localhost:5000/users`, {
          username: inputUsername,
          email: inputEmail,
          password: inputPassword,
        });
        username.current.value = "";
        email.current.value = "";
        password.current.value = "";
        toast.success("Register Successful");
        setMessage("");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center items-center max-w-2xl text-center">
        <h1 className="font-bold my-2">Create an account</h1>
        <h3 className="my-2">STARBUCKS REWARDS</h3>
        <p className="my-2">
          Join Starbucks Rewards to earn Stars for free food and drinks, any way
          you pay. get access to mobil ordering, a birthday Reward, and more
        </p>
      </div>
      <div className="container mx-auto my-10 shadow shadow-slate-400 p-3 max-w-xl">
        <div className="content">
          <div className="personal flex flex-col mx-5 my-5">
            <label className="font-bold">Personal Information</label>
            <input
              className="my-3 border border-solid border-stone-600 rounded-lg px-3 h-[50px]"
              type="text"
              ref={username}
              placeholder="Username"
            />
            <label className="font-bold">Account Security</label>
            <input
              className="my-3 border border-solid border-stone-600 rounded-lg px-3 h-[50px]"
              type="email"
              ref={email}
              placeholder="Email"
            />
            <input
              className="my-3 border border-solid border-stone-600 rounded-lg px-3 h-[50px]"
              type="password"
              ref={password}
              placeholder="Password"
            />
            <div className="text-red-600 font-bold">{message}</div>
            <button
              onClick={onRegister}
              className="text-white bg-green-700 w-[150px] rounded-full shadow-xl my-3 h-11"
            >
              Create Account
            </button>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
