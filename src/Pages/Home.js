import { Link } from "react-router-dom";
import iceDrink from "../Assets/iced_drink.webp";
import hotDrink from "../Assets/hot_drink.webp";
import forLife from "../Assets/for-live.webp";
import burgerImg from "../Assets/burger.webp";
import coffeeImg from "../Assets/coffee.webp";
import frappImg from "../Assets/frapp.webp";
import skymilesImg from "../Assets/skymiles.jpg";
import FooterMenu from "../Component/FooterMenu";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col z-0">
        <div className="static-container fixed w-[40vw] h-screen shadow my-auto shadow-slate-300 flex justify-center align-middle">
          <h1 className="relative inset-y-1/2 text-2xl font-semibold tracking-wide">
            Joy to you 🎁{" "}
          </h1>
        </div>
        <div className="ml-[40vw] mt-5 flex flex-col border-b-0 mb-16 shadow-lg shadow-slate-300">
          <h1 className="ml-8 mt-5">STARBUCKS REWARDS</h1>
          <div className="card-container ml-10 flex mt-5 flex-row justify-between">
            <div className="card ">
              <div className="picture w-48 h-28 mr-7">
                <img className="rounded-xl" src={burgerImg} alt="burger" />
              </div>
              <div className="text mt-5 mr-2  ">
                <p className="text-xl pr-4">
                  Let us treat you—earn and redeem Stars for free drinks, food
                  and more.
                </p>
              </div>
            </div>
            <div className="card ">
              <div className="picture w-48 h-28 mr-7 ">
                <img className="rounded-xl" src={coffeeImg} alt="coffee" />
              </div>
              <div className="text mt-5 mr-2 text-xl ">
                <p className="pr-4">
                  Customize your order in the app and pick it up when it's
                  ready.
                </p>
              </div>
            </div>
            <div className="card ">
              <div className="picture w-48 h-28 mr-7">
                <img className="rounded-xl" src={frappImg} alt="frapp" />
              </div>
              <div className="text mt-5 mr-2 text-xl ">
                <p className="pr-4">
                  Stop in on your birthday for a special treat on the house.
                </p>
              </div>
            </div>
          </div>
          <div>
            <span>
              <button className="bg-black font-bold text-white rounded-full px-3 py-1 mr-4 mt-2 ml-10">
                <Link to="/register">Join Now</Link>
              </button>
              <button className="bg-white font-bold text-black rounded-full mb-10 px-3 py-1 border border-slate-900 ml-1">
                Learn More
              </button>
            </span>
          </div>
          <div className="question-card rounded-xl container w-[500px] border shadow-lg mt-12 mx-auto">
            <div className="header">
              <h1 className="text-4xl m-5 border-b-2 h-24 ">
                Answer a few questions to find something new
              </h1>
              <h2 className="m-5">What type of drink are you looking for</h2>
            </div>
            <div className="answer-card flex flex-col justify-center mx-5 mb-4 h-24 bg-[#D4E9E2] rounded-xl">
              <span className="flex relative flex-col justify-center content-center h-full overflow-hidden ml-3">
                <h2 className="text-xl font-bold">Iced</h2>
                <h2 className="text-lg font-medium">Cool off and uplift</h2>
                <img
                  className="w-16 absolute right-[14px] top-[20px] "
                  src={iceDrink}
                  alt="ice"
                />
              </span>
            </div>
            <div className="answer-card flex flex-col justify-center mx-5 mb-4 h-24 bg-[#D4E9E2] rounded-xl">
              <span className="flex relative flex-col justify-center content-center h-full overflow-hidden ml-3">
                <h2 className="text-xl font-bold">Hot</h2>
                <h2 className="text-lg font-medium">Warm up and get going</h2>
                <img
                  className="w-[90px]
                    absolute right-[-15px] bottom-[-20px]"
                  src={hotDrink}
                  alt="hot"
                />
              </span>
            </div>
          </div>
          <div className="question-card rounded-xl container w-[500px] border shadow-lg mt-12 mx-auto">
            <img
              className="w-[500px] rounded-t-xl"
              src={forLife}
              alt="forlife"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">Play for your chance to win</h2>
              <h2 className="text-lg font-normal mt-2">
                Starbucks for Life is here. Join Starbucks® Rewards to play for
                gift cards, drinks and more.
              </h2>
              <div className="flex flex-row justify-end">
                <button className="bg-[#00754A] font-bold text-white rounded-full mb-3 px-3 py-1 mr-4 mt-3 ml-3">
                  <Link to="/register">Join Now</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="question-card rounded-xl container w-[500px] mb-20 border shadow-lg shadow-slate-300 mt-12 mx-auto">
            <img
              className="w-[500px] rounded-t-xl"
              src={skymilesImg}
              alt="forlife"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">
                Closer to moments that matter
              </h2>
              <h2 className="text-lg font-normal mt-2">
                Add extra cheer this holiday season by joining Starbucks®
                Rewards, linking it to Delta SkyMiles® to unlock 1 mile per $1
                spent at Starbucks (excludes taxes & tips).
              </h2>
              <div className="flex flex-row justify-end">
                <button className="bg-[#00754A] font-bold text-white rounded-full mb-4 px-3 py-1 mr-4 mt-4 ml-3">
                  <Link to="/register">Sign up + link</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <FooterMenu />
      </div>
    </>
  );
};

export default HomePage;
