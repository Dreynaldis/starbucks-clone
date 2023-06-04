import { Link } from "react-router-dom";

const MenuItem = (props) => {
  const handleData = () => {
    return props.menuData.filter((data) => data.category == props.category);
  };

  return handleData().map((val) => {
    let productId = val.id;
    return (
      <>
        <div className="item-container mb-5 ml-10 w-2/5">
          <Link to={`/products/${productId}`}>
            <div className="flex flex-row content-center">
              <div className="pic-container">
                <img className="item-pic" src={val.image} alt="" />
              </div>
              <h1 className="item-name text-lg font-semibold flex content-center ml-3 flex-wrap">
                {val.name}
              </h1>
            </div>
          </Link>
        </div>
      </>
    );
  });
};
export default MenuItem;
