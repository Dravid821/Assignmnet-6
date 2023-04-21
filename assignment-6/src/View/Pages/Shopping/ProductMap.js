import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { carddata } from "../../../Redux/Actions/action";
import ProductData from "../../../Components/ProductData";
const CardMap = () => {
  const items = useSelector((state) => state.datareducer.user);
  const [searchData, setSearchData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const dispatch = useDispatch();
  // Pagination page change Function pass in useffects.
  useEffect(() => {
    dispatch(carddata());
  }, []);
  useEffect(() => {
    const filtered = items.products?.filter((item) => {
      const titleMatch = item.title
        .toLowerCase()
        .includes(searchData.toLowerCase());
        console.log(titleMatch)
      const categoryMatch =
        item.category.toLowerCase() === selectedCategory.toLowerCase() ||
        selectedCategory === "";
      return titleMatch && categoryMatch;
    });
    setFilteredItems(filtered);
  }, [searchData, selectedCategory, items.products]);

  // Product Data Map
  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchData(e.target.value);
  };

  // Handle category select change
  const handleCategorySelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your search logic and category filtering logic using searchData and selectedCategory states
    console.log("Search query: ", searchData);
    console.log("Selected category: ", selectedCategory);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <div className="input-group mb-3">
            <input
              type="search"
              value={searchData}
              onChange={handleSearchInputChange}
              className="form-control-sm "
              placeholder="Search..."
            />
            <div className="input-group-append">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
        </form>
        <div className="container-fluid d-flex justify-content-between gap-3">
          <div className=" text-start p-2">
            <h5>Categories</h5>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={handleCategorySelectChange}
            >
              <option value="">All</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home-Decoration</option>
            </select>
          </div>
          <div className="row  mt-3">
            {filteredItems ? (
             filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="col-12 col-md-6 col-lg-4 col-xl-3 mt-3 d-flex justify-content-center"
                >
                  <ProductData item={item} />
                </div>
              ))
            ) : (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              </div>
            )}
            <br />
          </div>
        </div>

    </>
  );
};

export default CardMap;
