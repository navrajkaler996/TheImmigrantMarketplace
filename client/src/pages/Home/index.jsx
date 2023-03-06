import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemList } from "../../actions/itemActions";
import Carousal from "../../components/Carousal";

const Home = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state);
  const { items } = users;

  const { loading, list } = items;

  useEffect(() => {
    dispatch(itemList(10));
  }, []);

  return (
    <div className="home__container">
      {/*Latest rentals*/}
      <Carousal list={list} loading={loading} heading="Latest rentals" />
    </div>
  );
};

export default Home;
