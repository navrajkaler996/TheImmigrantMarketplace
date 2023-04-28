import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const Items = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();

  const [pageNumber, setPageNumber] = useState(1);

  const { list, loading, noMore } = useInfiniteScroll(category, pageNumber);

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <div className="items">
      <h1 className="primary-heading primary-heading-items">{category}</h1>
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
      {list?.length > 0 && (
        <>
          <div className="items-container" id="items-container">
            {list.map((item, i) => {
              {
                /* Keeping track of last card for infinite scroll */
              }
              if (i === list.length - 1) {
                return (
                  item.category === category && (
                    <Card
                      isRef={true}
                      onClick={() =>
                        navigate(`/item/${item.category}/${item._id}`)
                      }
                      data={item}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      loading={loading}
                      noMore={noMore}
                    />
                  )
                );
              } else {
                return (
                  item.category === category && (
                    <Card
                      onClick={() =>
                        navigate(`/item/${item.category}/${item._id}`)
                      }
                      data={item}
                    />
                  )
                );
              }
            })}
          </div>
          {loading && list?.length > 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "5rem 0",
              }}>
              <Spinner color="#590d22" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Items;
