import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { itemListByID } from "../../actions/itemActions";
import DollarIcon from "../../assets/coin.png";
import HomeIcon from "../../assets/home.png";
import AddressIcon from "../../assets/address.png";
import SellerIcon from "../../assets/user.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";

import Spinner from "../../components/Spinner";

const Item = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items } = useSelector((state) => state.users);

  const { listItem, loading } = items;

  const [data, setData] = useState({});
  const [utilities, setUtilities] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    dispatch(itemListByID(id));
  }, [id]);

  useEffect(() => {
    if (listItem) {
      /////CREATING UTILITIES ARRAY FOR RENTALS
      if (
        listItem?.category === "rentals" &&
        Object.keys(listItem?.utilities)?.length > 0
      ) {
        let temp = [];

        for (const key in listItem?.utilities) {
          if (listItem?.utilities[key]) {
            temp.push(key);
          }
        }
        setUtilities(temp);
      }

      /////CREATING ABOUT ARRAY FOR RENTALS
      if (
        listItem?.category === "mattresses" &&
        Object.keys(listItem?.about)?.length > 0
      ) {
        let temp = [];
        temp.push(listItem?.about);
        setAbout(temp);
      }
      setData(listItem);
    }

    return () => {
      setUtilities([]);
      setAbout([]);
    };
  }, [listItem]);

  return (
    <div className="item-container">
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
      {!loading && Object.keys(data)?.length > 0 && (
        <>
          {" "}
          <div className="item-image-container">
            <img
              src={require(`/public/images/items/${data.images[0]}`).default}
              className="item-image-container__image-1"
            />
            <div className="item-image-container__sub">
              <img
                src={require(`/public/images/items/${data.images[1]}`).default}
                className="item-image-container__image-2"
              />
              <img
                src={require(`/public/images/items/${data.images[2]}`).default}
                className="item-image-container__image-3"
              />
            </div>
          </div>
          <div className="item-details-container">
            <div className="primary-heading">{data.itemName}</div>
            <hr className="divider" />
            <div className="item-details__description">
              <div className="card__details--item">
                <span className="card__details--item-text">
                  {" "}
                  A two bedroom apartment with two bathrooms is available in the
                  south side of the city. Looking for two girls. Please send a
                  message if interested.
                </span>
              </div>
              <div className="card__details--item item-details__description--margin ">
                <img src={DollarIcon} className="card__details--item-img" />
                <span className="card__details--item-text item-details__description--margin-2">
                  {data?.price}
                </span>
              </div>
              {data?.category === "Rentals" && (
                <div className="card__details--item item-details__description--margin">
                  <img src={HomeIcon} className="card__details--item-img" />
                  <span className="card__details--item-text item-details__description--margin-2">
                    {data?.type}
                  </span>
                </div>
              )}
              <div className="card__details--item item-details__description--margin">
                <img src={SellerIcon} className="card__details--item-img" />
                <span className="card__details--item-text item-details__description--margin-2">
                  {data?.sellerName}
                </span>
              </div>
              <div className="card__details--item item-details__description--margin">
                <img src={EmailIcon} className="card__details--item-img" />
                <span className="card__details--item-text item-details__description--margin-2">
                  {data?.sellerEmail}
                </span>
              </div>
              <div className="card__details--item item-details__description--margin">
                <img src={PhoneIcon} className="card__details--item-img" />
                <span className="card__details--item-text item-details__description--margin-2"></span>
              </div>
              <div className="card__details--item item-details__description--margin">
                <img src={AddressIcon} className="card__details--item-img" />
                <span className="card__details--item-text item-details__description--margin-2">
                  {data?.address}
                </span>
              </div>
              {utilities?.length > 0 && (
                <div
                  className="card__details--item item-details__description--margin"
                  style={{ alignItems: "baseline" }}>
                  <b>Utilities: </b>
                  <div className="item-details__description--array">
                    {utilities.map((u) => (
                      <>
                        <span className="card__details--item-text">{u}</span>
                        <br />
                      </>
                    ))}
                  </div>
                </div>
              )}
              {about?.length > 0 && (
                <div className="card__details--item card__details--item-about item-details__description--margin">
                  {Object.keys(about[0]).map((key) => {
                    return (
                      <span
                        className="card__details--item-text"
                        style={{ textTransform: "capitalize" }}>
                        <strong>{key}: </strong> {`${about[0][key]}`}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Item;
