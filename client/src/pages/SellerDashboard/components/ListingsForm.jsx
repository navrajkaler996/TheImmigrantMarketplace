import React from "react";
import { useState } from "react";
import RentalsForm from "./RentalsForm";

const ListingsForm = () => {
  const [form, setForm] = useState({
    category: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="listingsform">
      <div className="create-account__form--input-container listingsform--input-container">
        <label className="create-account__form--label">
          Please select a category
        </label>
        <select
          className="create-account__form--input create-account__form--input-dropdown listingsform--input-dropdown"
          onChange={(e) => changeHandler(e)}
          name="category">
          <option value="" disabled selected hidden>
            Select a category
          </option>
          <option value="rentals">Rentals</option>
          <option value="mattresses">Mattresses</option>
        </select>
      </div>
      {form.category === "rentals" && <RentalsForm />}
    </div>
  );
};

export default ListingsForm;
