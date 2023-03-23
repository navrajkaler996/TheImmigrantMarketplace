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
    dispatch(itemList());
  }, []);

  const generateList = (list, category) => {
    return list.filter((l) => l.category === category);
  };

  return (
    <div className="home__container">
      {/*Latest rentals*/}
      {list?.length > 0 && (
        <Carousal
          list={generateList(list, "rentals")}
          loading={loading}
          heading="Latest rentals"
        />
      )}

      {list?.length > 0 && (
        <Carousal
          list={generateList(list, "mattresses")}
          loading={loading}
          heading="Latest Mattresses"
        />
      )}
    </div>
  );
};

export default Home;
