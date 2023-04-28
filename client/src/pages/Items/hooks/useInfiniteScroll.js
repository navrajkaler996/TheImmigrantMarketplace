import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemListByCategoryForScroll } from "../../../actions/itemActions";

const useInfiniteScroll = (category, pageNumber) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.users);

  const { listByCategory: list, loading, noMore } = items;

  useEffect(() => {
    dispatch(itemListByCategoryForScroll(category, pageNumber, list?.length));
  }, [category, pageNumber]);

  useEffect(() => {
    if (list) setLength(list?.length);
  }, [list]);

  return { list, loading, noMore };
};

export default useInfiniteScroll;
