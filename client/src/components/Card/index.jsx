import React, { useEffect, useState } from "react";
import SampleImage from "../../assets/image-sample.jpeg";
import DollarIcon from "../../assets/coin.png";
import HomeIcon from "../../assets/home.png";
import AddressIcon from "../../assets/address.png";
import SellerIcon from "../../assets/user.png";

// import Sample from "/images/items/rentals/image-sample.jpeg";

const Card = ({ data, open = false }) => {
  const [utilities, setUtilities] = useState([]);

  /////CREATING UTILITIES ARRAY FOR RENTALS
  useEffect(() => {
    if (Object.keys(data?.utilities)?.length > 0) {
      let temp = [];
      for (const key in data?.utilities) {
        if (data?.utilities[key]) {
          temp.push(key);
        }
      }
      setUtilities(temp);
    }
  }, [data]);

  if (open) {
    return <div className="card"></div>;
  }

  return (
    <div className="card">
      {data?.images?.length > 0 && (
        <img
          src={require(`/public/images/items/${data.images[0]}`).default}
          className="card__image"
        />
      )}

      <h1 className="secondary-heading">{data?.itemName}</h1>
      <hr className="divider" />
      <div className="card__details">
        <div className="card__details--item">
          <img src={DollarIcon} className="card__details--item-img" />
          <span className="card__details--item-text">{data?.price}</span>
        </div>
        <div className="card__details--item">
          <img src={HomeIcon} className="card__details--item-img" />
          <span className="card__details--item-text">{data?.type}</span>
        </div>
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
      </div>
    </div>
  );
};

export default Card;
