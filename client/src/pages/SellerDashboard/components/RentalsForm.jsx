import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { itemAdd, itemAddClear } from "../../../actions/itemActions";
import Spinner from "../../../components/Spinner";
import { rentalUtilities } from "../../../utils/constants";
import SellerDashboardContext from "../SellerDashboardContext";

const RentalsForm = () => {
  const dispatch = useDispatch();

  const { userInfo, items } = useContext(SellerDashboardContext);

  const { fullName, email, mobileNumber } = userInfo;

  const { loading, itemAdded, error } = items;

  const [form, setForm] = useState({
    beds: "",
    baths: "",
    category: "rentals",
    type: "",
    price: 0,
    address: "",
    postalCode: "",
    description: "",
    utilities: {
      heating: false,
      ac: false,
      hydro: false,
      dishwasher: false,
      parking: false,
    },
  });

  useEffect(() => {
    if (itemAdded?.message?.length > 0) {
      dispatch(itemAddClear());
    }
  }, []);

  const changeHandler = (e) => {
    if (rentalUtilities?.includes(e.target.name)) {
      let temp = form.utilities;
      temp[e.target.name?.toLowerCase()] = !temp[e.target.name?.toLowerCase()];

      setForm({
        ...form,
        utilities: temp,
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const disableSubmit = () => {
    if (
      form.beds.length > 0 &&
      form.baths.length > 0 &&
      form.type.length &&
      form.price > 0 &&
      form.address.length > 0 &&
      form.postalCode.length > 0 &&
      form.description.length > 0
    ) {
      const temp = Object.values(form.utilities);

      if (temp.includes(true)) return false;
      else return true;
    }

    return true;
  };

  const submitHandler = (e) => {
    let body = {
      itemName: `${form.beds} bed ${form.baths} bath`,
      category: form.category,
      sellerName: fullName,
      sellerEmail: email,
      sellerMobile: mobileNumber,
      price: form.price,
      description: form.description,
      address: form.address,
      postalCode: form.postalCode,
      utilities: form.utilities,
      type: form.type,
      images: [
        "rentals/image1.webp",
        "rentals/image2.webp",
        "rentals/image3.webp",
      ],
    };
    dispatch(itemAdd(body));
  };

  if (loading) {
    <div className="form-container">
      <p className="secondary-heading"> List a rental</p>
      <hr className="divider" />
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
    </div>;
  }

  return (
    <div className="form__container">
      <p className="secondary-heading" style={{ marginTop: "2rem" }}>
        {" "}
        List a rental
      </p>
      <hr className="divider" />
      {error?.message?.length > 0 ? (
        <p className="secondary-heading secondary-heading__error">
          {error?.message}
        </p>
      ) : itemAdded?.message ? (
        <p className="secondary-heading secondary-heading__success">
          {" "}
          {itemAdded?.message}{" "}
        </p>
      ) : (
        <>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">
              Number of beds:
            </label>
            <select
              className="create-account__form--input create-account__form--input-dropdown listingsform--input-dropdown form__input"
              onChange={(e) => changeHandler(e)}
              name="beds">
              <option value="" disabled selected hidden>
                Select number of beds
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value=">5"> &gt; 5</option>
            </select>
          </div>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">
              Number of baths:
            </label>
            <select
              className="create-account__form--input create-account__form--input-dropdown listingsform--input-dropdown form__input"
              onChange={(e) => changeHandler(e)}
              name="baths">
              <option value="" disabled selected hidden>
                Select number of baths
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value=">3"> &gt; 3</option>
            </select>
          </div>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">
              Property type:
            </label>
            <select
              className="create-account__form--input create-account__form--input-dropdown listingsform--input-dropdown form__input"
              onChange={(e) => changeHandler(e)}
              name="type">
              <option value="" disabled selected hidden>
                Select property type
              </option>
              <option value="house">House</option>
              <option value="basement">Basement</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">
              Rent per month:
            </label>
            <input
              type="number"
              className="create-account__form--input listingsform--input-dropdown form__input"
              placeholder="Enter rent per month in CAD"
              name="price"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">Address:</label>
            <input
              type="text"
              className="create-account__form--input listingsform--input-dropdown form__input"
              placeholder="Enter address"
              name="address"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">Postal code:</label>
            <input
              type="text"
              className="create-account__form--input listingsform--input-dropdown form__input"
              placeholder="Enter postal code"
              name="postalCode"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">Description:</label>
            <textarea
              type="number"
              className="create-account__form--input listingsform--input-dropdown form__input form__input-textarea"
              placeholder="Enter description"
              name="description"
              onChange={(e) => changeHandler(e)}
              rows="5"
              cols="10"
            />
          </div>
          <div className="create-account__form--input-container form__input-container">
            <label className="create-account__form--label">Utilities:</label>

            {rentalUtilities?.map((u) => {
              return (
                <div className="form__checkbox-container">
                  <input
                    type="checkbox"
                    name={u}
                    value={u}
                    onChange={(e) => changeHandler(e)}
                  />{" "}
                  <label>{u}</label>
                </div>
              );
            })}
          </div>
          <div className="create-account__form--input-container form__input-container">
            <input
              type="sumbit"
              className="create-account__form--input create-account__form--input-submit button-success "
              value="Add"
              style={{ textAlign: "center" }}
              disabled={disableSubmit()}
              onClick={submitHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RentalsForm;
