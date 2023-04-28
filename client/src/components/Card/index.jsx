import React, { useEffect, useRef, useState } from "react";
import DollarIcon from "../../assets/coin.png";
import HomeIcon from "../../assets/home.png";
import AddressIcon from "../../assets/address.png";
import SellerIcon from "../../assets/user.png";
import NextArrow from "../../assets/next-white.png";
import PreviousArrow from "../../assets/back-white.png";
import { useCallback } from "react";

// import Sample from "/images/items/rentals/image-sample.jpeg";

const Card = ({
  data,
  onClick,
  open = false,
  isRef = false,
  loading,
  pageNumber,
  setPageNumber,
  noMore,
}) => {
  const [utilities, setUtilities] = useState([]);
  const [about, setAbout] = useState([]);

  const ref = useRef();
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      console.log("loadd", loading);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !noMore) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    /////CREATING UTILITIES ARRAY FOR RENTALS
    if (
      data?.category === "rentals" &&
      Object.keys(data?.utilities)?.length > 0
    ) {
      let temp = [];

      for (const key in data?.utilities) {
        if (data?.utilities[key]) {
          temp.push(key);
        }
      }
      setUtilities(temp);
    }

    /////CREATING ABOUT ARRAY FOR MATTRESSES
    if (
      data?.category === "mattresses" &&
      Object.keys(data?.about)?.length > 0
    ) {
      let temp = [];
      temp.push(data?.about);
      setAbout(temp);
    }
  }, [data]);

  if (open) {
    return <div className="card"></div>;
  }

  const [imageIndex, setImageIndex] = useState(0);

  const handlePreviousClick = () => {
    let i;
    if (imageIndex > 0) {
      i = imageIndex - 1;
      setImageIndex(i);
    } else {
      setImageIndex(2);
    }
  };

  const handleNextClick = () => {
    let i;
    if (imageIndex < 2) {
      i = imageIndex + 1;
      setImageIndex(i);
    } else {
      setImageIndex(0);
    }
  };

  const handleClick = (e) => {
    console.log(e.target.id);

    if (e.target.id === "arrow-2") handleNextClick();
    else if (e.target.id === "arrow-1") handlePreviousClick();
    else onClick();
  };

  return (
    <div
      className="card"
      id="card"
      onClick={(e) => handleClick(e)}
      ref={isRef ? lastItemRef : ref}>
      {data?.images?.length > 0 && (
        <div className="card__image--container">
          <img
            src={PreviousArrow}
            alt=""
            className="card__image--arrow-1"
            onClick={(e) => handleClick(e)}
            id="arrow-1"
          />
          <img
            src={
              require(`/public/images/items/${data.images[imageIndex]}`).default
            }
            className="card__image"
            id="first_image"
          />

          <img
            src={NextArrow}
            alt=""
            className="card__image--arrow-2"
            onClick={(e) => handleClick(e)}
            id="arrow-2"
          />
        </div>
      )}

      <h1 className="secondary-heading">{data?.itemName?.substring(0, 14)}</h1>
      <hr className="divider" />
      <div className="card__details">
        <div className="card__details--item">
          <img src={DollarIcon} className="card__details--item-img" />
          <span className="card__details--item-text">{data?.price}</span>
        </div>
        {data?.category === "Rentals" && (
          <div className="card__details--item">
            <img src={HomeIcon} className="card__details--item-img" />
            <span className="card__details--item-text">{data?.type}</span>
          </div>
        )}
        <div className="card__details--item">
          <img src={SellerIcon} className="card__details--item-img" />
          <span className="card__details--item-text">{data?.sellerName}</span>
        </div>
        <div className="card__details--item">
          <img src={AddressIcon} className="card__details--item-img" />
          <span className="card__details--item-text">{data?.address}</span>
        </div>
        <hr className="divider" />
        {/* Displaying utilities for rentals */}
        <div className="card__details--item card__details--item-utilities">
          {utilities?.length > 0 &&
            utilities?.map((u) => (
              <span className="card__details--item-text card__details--item-text-utilities">
                {u}
              </span>
            ))}
        </div>
        <div className="card__details--item card__details--item-about">
          {about?.length > 0 &&
            Object.keys(about[0]).map((key) => {
              return (
                <span className="card__details--item-text">
                  <strong>{key}: </strong> {`${about[0][key]}`}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
