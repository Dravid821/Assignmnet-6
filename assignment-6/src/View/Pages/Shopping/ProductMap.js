import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { carddata } from "../../../Redux/Actions/action";
import ProductData from "../../../Components/ProductData";
const CardMap = ({ onSearch }) => {
  const items = useSelector((state) => state.datareducer.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination page change Function pass in useffects.
  useEffect(() => {
    dispatch(carddata());
  }, []);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  // Product Data Map
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <div className="input-group mb-3">
            <input
              type="text"
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
          <option value="">All</option>
          <option value="PlayStation Vita">PlayStation Vita</option>
          <option value="PlayStation 3">PlayStation 3</option>
          <option value="iPad">iPad</option>
          <option value="Xbox 360">Xbox 360</option>
          <option value="Macintosh">Macintosh</option>
          <option value="PC">PC</option>
          <option value="iPhone">iPhone</option>
          <option value="Nintendo DS">Nintendo DS</option>
          <ul className="list-group"></ul>
        </div>
        <div className="row  mt-3">
          {items.products ? (
            items.products.map((item) => (
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
