import React from "react";
import { useEffect } from "react";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { itemList } from "../../actions/itemActions";
import Spinner from "../../components/Spinner";
import DownArrow from "../../assets/down-arrow.png";

const Home = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state);
  const { items } = users;

  const { loading, list } = items;

  useEffect(() => {
    dispatch(itemList());
  }, []);

  return (
    <div className="home__container">
      <div className="rentals__container">
        <h1 className="primary-heading" style={{ margin: "2rem 0" }}>
          Rentals
        </h1>

        {loading && <Spinner />}
        {!loading && list?.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="rentals__cards-container">
              {list?.slice(0, 4).map((item) => {
                return <Card data={item} />;
              })}
            </div>
            <img src={DownArrow} alt="" className="rentals__arrow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
