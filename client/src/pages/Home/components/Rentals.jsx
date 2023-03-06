import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import Spinner from "../../../components/Spinner";
import NextArrow from "../../../assets/next.png";
import PreviousArrow from "../../../assets/back.png";

const responsiveMargins = {
  phone: 36,
  Others: 32,
};

const cardsToDisplay = {
  till600: 1,
  till1200: 3,
  till1500: 4,
  over1500: 5,
};

const Rentals = ({ list, loading }) => {
  const [margin, setMargin] = useState(0);

  const [itemList, setItemList] = useState(list);
  const [clicked, setClicked] = useState(-1);

  useEffect(() => {
    setItemList(list);
  }, [list]);

  const handleNextClick = () => {
    if (window.innerWidth <= 600) setMargin(margin - responsiveMargins.phone);

    if (window.innerWidth > 600) setMargin(margin - responsiveMargins.Others);

    let c = clicked + 1;
    setClicked(c);
  };

  const handlePreviousClick = () => {
    if (window.innerWidth <= 600) setMargin(margin + responsiveMargins.phone);

    if (window.innerWidth > 600) setMargin(margin + responsiveMargins.Others);

    let c = clicked - 1;
    setClicked(c);
  };

  useEffect(() => {
    if (
      window.innerWidth <= 600 &&
      (clicked === list?.length - cardsToDisplay.till600 || clicked <= -1)
    ) {
      setMargin(0);
      setClicked(-1);
    }

    if (
      window.innerWidth > 600 &&
      window.innerWidth <= 1100 &&
      (clicked === list?.length - cardsToDisplay.till1200 || clicked <= -1)
    ) {
      setMargin(0);
      setClicked(-1);
    }

    if (
      window.innerWidth > 1100 &&
      window.innerWidth <= 1500 &&
      (clicked === list?.length - cardsToDisplay.till1500 || clicked <= -1)
    ) {
      setMargin(0);
      setClicked(-1);
    }

    if (
      window.innerWidth > 1500 &&
      (clicked === list?.length - cardsToDisplay.over1500 || clicked <= -1)
    ) {
      setMargin(0);
      setClicked(-1);
    }
  }, [clicked]);

  return (
    <div className="rentals__container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "2rem 0",
        }}>
        <img
          src={PreviousArrow}
          alt=""
          className="rentals__arrow"
          onClick={handlePreviousClick}
        />
        <h1 className="primary-heading">Latest Rentals</h1>
        <img
          src={NextArrow}
          alt=""
          className="rentals__arrow"
          onClick={handleNextClick}
        />
      </div>

      {loading && <Spinner />}
      {!loading && itemList?.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="rentals__cards-container"
            style={{ marginLeft: margin + "rem" }}>
            {itemList?.map((item, i) => {
              if (i === itemList.length - 1)
                return (
                  <>
                    <Card data={item} />
                    <Card data={item} open={true} />
                  </>
                );
              return <Card data={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rentals;
