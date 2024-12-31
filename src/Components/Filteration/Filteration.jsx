import React from "react";
import styles from "../Filteration/Filteration.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredProducts } from "../../redux/product/productSlice";
import { productSelector } from "../../redux/product/productSlice";
import {
  setPriceFilter,
  setSelectedCategories,
} from "../../redux/product/productSlice";
const Filteration = () => {
  const { priceFilter, selectedCategories } = useSelector(productSelector);
  const dispatch = useDispatch();

  const handlePriceFilter = (e) => {
    const price = e.target.value;
    dispatch(setPriceFilter(price));
    dispatch(setFilteredProducts());
  };

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    dispatch(setSelectedCategories(updatedCategories));
    dispatch(setFilteredProducts());
  };

  return (
    <div className={styles.filter}>
      <h2>Filter</h2>
      <form>
        <label htmlFor="price">price:{priceFilter}</label>
        <input
          className={styles.priceRange}
          type="range"
          id="price"
          name="price"
          min="1"
          max="1000"
          step="20"
          value={priceFilter}
          onChange={handlePriceFilter}
        />
        <h2>Category</h2>
        <div className={styles.categoryContainer}>
          <div>
            <input
              type="checkbox"
              id="mensFashion"
              value="men's clothing"
              onChange={handleCategoryFilter}
              checked={selectedCategories.includes("men's clothing")}
            />
            <label htmlFor="mensFashion">Men's Clothing</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="womensFashion"
              value="women's clothing"
              onChange={handleCategoryFilter}
              checked={selectedCategories.includes("women's clothing")}
            />
            <label htmlFor="womensFashion">Women's Clothing</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="jewelery"
              value="jewelery"
              onChange={handleCategoryFilter}
              checked={selectedCategories.includes("jewelery")}
            />
            <label htmlFor="jewelery">Jwelery</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="electronics"
              value="electronics"
              onChange={handleCategoryFilter}
              checked={selectedCategories.includes("electronics")}
            />
            <label htmlFor="electronics">electronics</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filteration;
