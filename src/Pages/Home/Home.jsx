import React, { useEffect } from "react";
import styles from "../Home/Home.module.css";
import Card from "../../Components/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { productSelector } from "../../redux/product/productSlice";
import { getItems } from "../../redux/product/productThunk";
import { TailSpin } from "react-loader-spinner";
import Filteration from "../../Components/Filteration/Filteration";
import {
  setSearchQuery,
  setFilteredProducts,
} from "../../redux/product/productSlice";

const Home = () => {
  const { loading, error, filteredProducts } = useSelector(productSelector);
  const dispatch = useDispatch();

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getItems());
    dispatch(setFilteredProducts());
  }, [dispatch]);

  // Handle search query change
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    dispatch(setSearchQuery(searchQuery));
    dispatch(setFilteredProducts());
  };

  return (
    <div className={styles.homeContainer}>
      <aside className={styles.filterContainer}>
        <Filteration />
      </aside>
      <form className={styles.searchForm}>
        <input
          type="search"
          placeholder="Search By Name"
          name="query"
          onChange={handleSearchChange}
        />
      </form>
      <div className={styles.productGrid}>
        {loading ? (
          <div className={styles.spinner}>
            <TailSpin color="red" radius={8} />
          </div>
        ) : error ? (
          <div className={styles.error}>Failed to load products</div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
