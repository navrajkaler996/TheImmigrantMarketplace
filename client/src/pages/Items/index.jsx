import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { itemListByCategory } from "../../actions/itemActions";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";

const Items = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const { items } = useSelector((state) => state.users);

  const { list, loading } = items;

  // const [y, setY] = useState(0);

  useEffect(() => {
    dispatch(itemListByCategory(category));
  }, [category]);

  // const handleNavigation = (e) => {
  //   const window = e.currentTarget;
  //   console.log("n", window.scrollY);
  //   if (y > window.scrollY) {
  //     console.log("scrolling up");
  //   } else if (y < window.scrollY) {
  //     console.log("scrolling down");
  //   }
  //   setY(window.scrollY);
  // };

  // useEffect(() => {
  //   setY(window.scrollY);

  //   window.addEventListener("scroll", (e) => handleNavigation(e));
  // }, [window.scrollY]);

  return (
    <div className="items">
      <h1 className="primary-heading primary-heading-items">{category}</h1>
      {loading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20rem",
          }}>
          <Spinner color="#590d22" />
        </div>
      )}
      {!loading && list?.length > 0 && (
        <div className="items-container">
          {list.map(
            (item) =>
              item.category === category && (
                <Card
                  onClick={() => navigate(`/item/${item.category}/${item._id}`)}
                  data={item}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Items;
