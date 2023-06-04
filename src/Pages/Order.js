import MenuItem from "../Component/MenuItem";
import { useState, useEffect } from "react";
import axios from "axios";

const OrderPage = () => {
  const [category, setCategory] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const onFilter = (e) => {
    setFilterCat(
      [...category].filter((arr, index) => String(index) === e.currentTarget.id)
    );
    setSelectedCategory(e.currentTarget.id);
  };

  // const onReset = (e) => {
  //   setFilterCat([]);
  //   setSelectedCategory("");
  // };

  useEffect(() => {
    axios.get(`http://localhost:5000/category`).then((response) => {
      setCategory(response.data);
      setFilterCat(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/products${
          selectedCategory === "" ? "" : `?category=${selectedCategory}`
        }`
      )
      .then((response) => {
        setMenuData(response.data);
      });
  }, [selectedCategory]);

  const SideMenu = () => {
    return category.map((val, i) => {
      return (
        <>
          <div key={i}>
            <nav>
              <h4
                onClick={onFilter}
                className="cursor-pointer mb-10 text-lg font-bold"
                id={i}
              >
                {val}
              </h4>
            </nav>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className="flex flex-row px-20 pt-12 max-w-full">
        <div className="side-menu ">
          <nav>
            <div className="category-title block w-36 mt-5 ">
              <SideMenu />
            </div>
          </nav>
        </div>
        <div className="large-menu pr-20">
          <div className="menu">
            <h3 className="mb-10 text-3xl ml-20 font-bold">Menu</h3>
          </div>
          {filterCat.length > 0 &&
            filterCat.map((cat, index) => (
              <div>
                <h3
                  id={cat}
                  className="mb-10 text-3xl ml-20 font-bold border-b-2 h-16"
                >
                  {cat}
                </h3>
                <div className="flex flex-row flex-wrap justify-around">
                  <MenuItem
                    menuData={menuData}
                    category={
                      selectedCategory === "" ? index : selectedCategory
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default OrderPage;
