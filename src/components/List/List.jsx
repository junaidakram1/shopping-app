import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
  //   const { data, loading, error } = useFetch(
  //     `products?populate=*&[filters][categories][id]=${catId}`
  //   );
  //   console.log("LISTED CAT", catId);
  //   console.log("LISTED", data);
  `/sub-categories?[filters][categories][id][$eq]=${catId}`;
  const subCatFilter =
    subCats.length > 0
      ? `&[filters][sub_categories][id][$in]=${subCats.join(",")}`
      : "";

  const sortQuery = sort ? `&sort=price:${sort}` : "";

  const { data, loading, error } = useFetch(
    `/products?populate=*` +
      `&[filters][categories][id]=${catId}` +
      subCatFilter +
      `&[filters][price][$lte]=${maxPrice}` +
      sortQuery
  );

  return (
    <div className="list">
      {loading
        ? "loading..."
        : data?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
