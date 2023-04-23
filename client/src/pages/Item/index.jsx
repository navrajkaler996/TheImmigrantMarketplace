import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { itemListByID } from "../../actions/itemActions";
import DollarIcon from "../../assets/coin.png";
import HomeIcon from "../../assets/home.png";
import AddressIcon from "../../assets/address.png";
import SellerIcon from "../../assets/user.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";

import Spinner from "../../components/Spinner";
import { chatCreate } from "../../actions/chatActions";

const Item = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, login, chats } = useSelector((state) => state.users);

  const { listItem, loading } = items;

  const { userInfo } = login;

  const { loading: chatLoading, error: chatError, chatOnContact } = chats;

  const [data, setData] = useState({});
  const [utilities, setUtilities] = useState([]);
  const [about, setAbout] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  useEffect(() => {
    if (chatOnContact) {
      return navigate("/account", { state: { active: "inbox" } });
    }
  }, [chatOnContact]);

  const contactHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const clickHandler = (redirectTo) => {
    console.log("reciver", data.sellerEmail);

    if (userInfo?._id) {
      dispatch(chatCreate(userInfo._id, data?.sellerEmail));
    } else {
      return navigate("/login");
    }
  };

  return (
    <div className="item__container">
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
          <div className="item__images">
            <img
              src={require(`/public/images/items/${data.images[0]}`).default}
              className="item__images-primary"
            />
            <div className="item__images-second-row">
              <img
                src={require(`/public/images/items/${data.images[1]}`).default}
                className="item__images-secondary-1"
              />
              <img
                src={require(`/public/images/items/${data.images[2]}`).default}
                className="item__images-secondary-2"
              />
            </div>
          </div>
          <div className="item__details">
            <div className="primary-heading">{data.itemName}</div>
            <hr className="divider" />
            <div className="item__details-description">
              <div className="card__details--item">
                <span className="card__details--item-text">
                  {" "}
                  A two bedroom apartment with two bathrooms is available in the
                  south side of the city. Looking for two girls. Please send a
                  message if interested.
                </span>
              </div>
              <div className="card__details--item item__details-margin ">
                <img src={DollarIcon} className="card__details--item-img" />
                <span className="card__details--item-text item__details-margin-2">
                  {data?.price}
                </span>
              </div>
              {data?.category === "Rentals" && (
                <div className="card__details--item item__details-margin">
                  <img src={HomeIcon} className="card__details--item-img" />
                  <span className="card__details--item-text item__details-margin-2">
                    {data?.type}
                  </span>
                </div>
              )}
              <div className="card__details--item item__details-margin">
                <img src={SellerIcon} className="card__details--item-img" />
                <span className="card__details--item-text item__details-margin-2">
                  {data?.sellerName}
                </span>
              </div>
              <div className="card__details--item item__details-margin">
                <img src={EmailIcon} className="card__details--item-img" />
                <span className="card__details--item-text item__details-margin-2">
                  {data?.sellerEmail}
                </span>
              </div>
              <div className="card__details--item item__details-margin">
                <img src={PhoneIcon} className="card__details--item-img" />
                <span className="card__details--item-text item__details-margin-2">
                  {data?.sellerMobile}
                </span>
              </div>
              <div className="card__details--item item__details-margin">
                <img src={AddressIcon} className="card__details--item-img" />
                <span className="card__details--item-text item__details-margin-2">
                  {data?.address}
                </span>
              </div>
              {utilities?.length > 0 && (
                <div
                  className="card__details--item item-details__description--margin"
                  style={{ alignItems: "baseline" }}>
                  <b>Utilities: </b>
                  <div className="item__details-array">
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
                <div className="card__details--item card__details--item-about item__details-margin">
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

              <button
                className="create-account__form--input create-account__form--input-submit item__contact button-success"
                onClick={contactHandler}>
                Contact
              </button>

              {showDropdown && (
                <div className="item__contact item__contact-dropdown main-header__utilities--dropdown">
                  <ul className="main-header__utilities--dropdown-list">
                    {chatLoading ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",

                          // marginTop: "20rem",
                        }}>
                        <Spinner color="#590d22" />
                      </div>
                    ) : (
                      <>
                        {" "}
                        <li
                          className="main-header__utilities--dropdown-list-item"
                          onClick={() => clickHandler("inbox")}>
                          Send a message
                        </li>
                        {/* </Link> */}
                        <Link
                          to="/account"
                          state={{
                            active: "inbox",
                          }}
                          className="main-header__utilities--dropdown-list-item">
                          <li>Send an email</li>
                        </Link>
                        <Link
                          to="/account"
                          state={{
                            active: "inbox",
                          }}
                          className="main-header__utilities--dropdown-list-item">
                          <li>Call</li>
                        </Link>
                      </>
                    )}
                  </ul>
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
