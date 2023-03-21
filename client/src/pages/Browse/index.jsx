import React from "react";
import { useParams } from "react-router-dom";

const Browse = () => {
  const { category } = useParams();

  console.log(category);

  return <div>Browse</div>;
};

export default Browse;
