import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { itemListByCategory } from "../../actions/itemActions";
import Card from "../../components/Card";

const Items = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { items } = useSelector((state) => state.users);

  const { list } = items;

  const [y, setY] = useState(0);

  useEffect(() => {
    dispatch(itemListByCategory(category));
  }, [category]);

  const handleNavigation = (e) => {
    const window = e.currentTarget;
    console.log("n", window.scrollY);
    if (y > window.scrollY) {
      console.log("scrolling up");
    } else if (y < window.scrollY) {
      console.log("scrolling down");
    }
    setY(window.scrollY);
  };

  useEffect(() => {
    setY(window.scrollY);

    window.addEventListener("scroll", (e) => handleNavigation(e));
  }, [window.scrollY]);

  return (
    <div className="items">
      <h1 className="primary-heading">Rentals</h1>
      <div className="items-container">
        {list?.length > 0 &&
          list.map(
            (item) => item.category === category && <Card data={item} />
          )}
      </div>
    </div>
  );
};

export default Items;
