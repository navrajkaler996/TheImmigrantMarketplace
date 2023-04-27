import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { itemListByEmail } from "../../../actions/itemActions";
import { reverseDate } from "../../../utils/helper";
import SellerDashboardContext from "../SellerDashboardContext";

const YourListings = () => {
  const dispatch = useDispatch();

  const { userInfo, items } = useContext(SellerDashboardContext);

  const { email } = userInfo;

  const { itemListEmail } = items;

  const [viewMore, setViewMore] = useState({
    flag: false,
    text: "View more",
  });

  useEffect(() => {
    if (email) {
      dispatch(itemListByEmail(email));
    }
  }, [email]);

  return (
    <div>
      <p className="secondary-heading">Your listings</p>
      <hr className="divider" />
      <div className="yourlistings__container">
        {itemListEmail?.length === 0 ? (
          <p className="secondary-heading">You have no listings</p>
        ) : (
          <>
            {itemListEmail
              ?.slice(0, viewMore.flag ? itemListEmail.length : 3)
              ?.map((item) => {
                return (
                  <div className="yourlistings__item">
                    <img
                      src={
                        require(`/public/images/items/rentals/image1.jpg`)
                          .default
                      }
                      className="yourlistings__item-image"
                    />
                    <div className="yourlistings__item-details">
                      <p> {item.itemName}</p>
                      <p>${item.price}</p>
                      <p>{item.address}</p>
                    </div>
                    <p className="yourlistings__item-details-listedon">
                      {reverseDate(item.createdAt.slice(0, 10))}
                    </p>
                  </div>
                );
              })}
            {itemListEmail?.length > 3 && (
              <p
                className="yourlistings__viewmore"
                onClick={() =>
                  setViewMore({
                    flag: !viewMore.flag,
                    text: viewMore.flag ? "View more" : "View less",
                  })
                }>
                {viewMore.text}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default YourListings;
