import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemList } from "../../actions/itemActions";
import Carousal from "../../components/Carousal";
import Spinner from "../../components/Spinner";

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
      {loading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20rem",
          }}>
          {" "}
          <Spinner color="#590d22" />{" "}
        </div>
      )}
      {!loading && list?.length > 0 && (
        <Carousal
          list={generateList(list, "rentals")}
          loading={loading}
          heading="Latest rentals"
        />
      )}

      {!loading && list?.length > 0 && (
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
