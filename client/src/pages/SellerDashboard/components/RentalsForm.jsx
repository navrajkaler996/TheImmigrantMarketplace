import React from "react";
import { useState } from "react";
import { rentalUtilities } from "../../../utils/constants";

const RentalsForm = () => {
  const [form, setForm] = useState({
    beds: "",
    baths: "",
    category: "",
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

  const changeHandler = (e) => {
    if (rentalUtilities?.includes(e.target.name)) {
      let temp = form.utilities;
      temp[e.target.name?.toLowerCase()] = true;

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

  console.log("form", form);

  const submitHandler = (e) => {};

  return (
    <div className="form-container">
      <p className="secondary-heading"> List a rental</p>
      <hr className="divider" />
      {/* <div className="form-container--row"> */}
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Number of beds:</label>
        <select
          className="create-account__form--input create-account__form--input-dropdown listings-form--input-dropdown form-container-rentals--input"
          onChange={(e) => changeHandler(e)}
          name="category">
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
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Number of baths:</label>
        <select
          className="create-account__form--input create-account__form--input-dropdown listings-form--input-dropdown form-container-rentals--input"
          onChange={(e) => changeHandler(e)}
          name="category">
          <option value="" disabled selected hidden>
            Select number of baths
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value=">3"> &gt; 3</option>
        </select>
      </div>
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Property type:</label>
        <select
          className="create-account__form--input create-account__form--input-dropdown listings-form--input-dropdown form-container-rentals--input"
          onChange={(e) => changeHandler(e)}
          name="category">
          <option value="" disabled selected hidden>
            Select property type
          </option>
          <option value="house">House</option>
          <option value="basement">Basement</option>
          <option value="apartment">Apartment</option>
        </select>
      </div>
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Rent per month:</label>
        <input
          type="number"
          className="create-account__form--input listings-form--input-dropdown form-container-rentals--input"
          placeholder="Enter rent per month in CAD"
          name="price"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Address:</label>
        <input
          type="text"
          className="create-account__form--input listings-form--input-dropdown form-container-rentals--input"
          placeholder="Enter address"
          name="address"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Postal code:</label>
        <input
          type="text"
          className="create-account__form--input listings-form--input-dropdown form-container-rentals--input"
          placeholder="Enter postal code"
          name="postalCode"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Description:</label>
        <textarea
          type="number"
          className="create-account__form--input listings-form--input-dropdown form-container-rentals--input form-container-rentals--textarea"
          placeholder="Enter description"
          name="description"
          onChange={(e) => changeHandler(e)}
          rows="5"
          cols="10"
        />
      </div>
      <div className="create-account__form--input-container form-container--input-container">
        <label className="create-account__form--label">Utilities:</label>

        {rentalUtilities?.map((u) => {
          return (
            <div className="form-container-rentals--checkbox-container">
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
      <div className="create-account__form--input-container form-container--input-container">
        <input
          type="sumbit"
          className="create-account__form--input create-account__form--input-submit button-success "
          value="Add"
          style={{ textAlign: "center" }}
          disabled={true}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default RentalsForm;
