import React, { useState } from "react";
import { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { ApiData } from "../../../Redux/Actions/action";
import { NavLink } from "react-router-dom";
import RatingComponent from "../../../Components/StartRating";
import { useNavigate } from "react-router-dom";
import Carousal from "../../../Components/Carousal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AddToCart, removetocart } from "../../../Redux/Actions/action";
// Product Detail Page 
const ProductDetail = () => {
  const data = useSelector((state) => state.datareducer.user);
  // Cart Items Value Comes From Reducer
  const cartItems = useSelector((state) => state.datareducer.carts);
  console.log("qnty", cartItems.qnty);
  let loggin = JSON.parse(localStorage.getItem("isLogin"));
  console.log("id vise0", data);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Navigation Condition
  useEffect(() => {
    if (isNaN(id)) {
      navigate("*");
      return;
    }
    dispatch(ApiData(id));
  }, []);
  //Click Event To Send Cart Box In Items.
  const sendcart = (data) => {
    dispatch(AddToCart(data));
  };
  const BackToShop = () => {
    // navigate("/");
  };
  //Productdetail Page map data
  return (
    <>
      <div>
        {data.title ? (
          <section key={id}>
            <div className="container">
              <div className="row pt-5">
                <Carousal images={data.images} />
                <div className="col-md-6 col-sm-12 mt-4">
                  <div className="col-md-12 col-sm-12">
                    <div className="card-body">
                      <div class="text-start">
                        <h1 className="card-title">{data.category}</h1>
                        <div className="pt-3">
                          <h5 className="text-danger mb-4">{data.brand}</h5>
                          <p className="text-success mb-4">{data.title}</p>
                        </div>
                      </div>
                      <div>
                        <div class="d-flex">
                          <span className="">Stock:</span>
                          <span>{data.stock}</span>
                        </div>
                        <div class="d-flex justify-content-between mt-3">
                          <span>
                            <span class="badge bg-warning">
                              <div>
                                <RatingComponent rating={data.rating} />
                              </div>
                            </span>
                          </span>
                          {/* <span>Rating :&nbsp;</span> */}
                          <span className="text-warning"></span>
                        </div>
                        <div class="d-flex  total font-weight-bold mt-4">
                          <span>Discount :&nbsp;</span>
                          <h6>{data.discountPercentage}% off</h6>
                        </div>
                        <div class="d-flex total font-weight-bold mt-4">
                          <span>Price :</span>
                          <h4 className="mb-1 me-1">${data.price}</h4>
                        </div>
                      </div>
                      <div class="d-flex text-start total font-weight-bold mt-4">
                        <span>Description: {data.description}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 pt-5">
                    <div className="d-flex">
                      {loggin ? (
                        <>
                          <div className="text-start">
                            {/* <div class="d-flex text-start total font-weight-bold">
                            <span className="btn" onClick={() => decrement(data)}> - </span>
                            <span className="text-primary">{cartItems.length}</span>
                            <span className="btn" onClick={() => increment(data)}> + </span>
                          </div> */}
                            <button
                              className="btn btn-primary btn-md m-2"
                              type="button"
                              onClick={() => sendcart(data)}
                            >
                              Add To Cart
                            </button>
                            <NavLink to={`/product`}>
                              <button
                                onClick={BackToShop}
                                className="btn btn-outline-primary btn-md m-2"
                                type="button"
                              >
                                <ShoppingCartIcon />
                                Back To Shopping Page
                              </button>
                            </NavLink>
                          </div>
                        </>
                      ) : (
                        <NavLink to={`/product`}>
                          <button
                            onClick={BackToShop}
                            className="btn btn-outline-primary btn-md m-2"
                            type="button"
                          >
                            <ShoppingCartIcon />
                            Back To Shopping Page
                          </button>
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Page Refresh Then Loader set 
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden"></span>
            </Spinner>
          </div>
        )}
      </div>
    </>
  );
};
export default ProductDetail;
