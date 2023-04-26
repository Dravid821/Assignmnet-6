import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { AddToCart, RemoveToCart } from "../../../Redux/Actions/action";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import DataTable from "react-data-table-component";
//Cart Page Start
export default function Cart() {
  const cartItems = useSelector((state) => state.datareducer.carts);
  console.log("qnty", cartItems);
  const dispatch = useDispatch();
  // Qntity Increment Function
  const Increment = (item) => {
    dispatch(AddToCart(item));
  };
  // Qntity Decrement Function
  const Decrement = (item) => {
    dispatch(RemoveToCart(item));
  };
  // Total Price Calculation Function
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.qnty * item.price;
    });
    return total.toFixed(2); // rounding total to 2 decimal places
  };
  // Data Tables Column Here
  const columns = [
    {
      name: "IMAGE",
      maxWidth: "40px",
      maxHeight: "40px",
      selector: (row) => (
        <img src={row.thumbnail} width={100} height={50} alt={row.title}></img>
      ),
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
    },
    {
      name: "PRICE",
      selector: (row) => row.price,
    },
    {
      name: "QUANTITY",
      selector: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-3">
          <span onClick={() => Decrement(row)}> - </span>
          <span className="text-primary">{row.qnty}</span>
          <span onClick={() => Increment(row)}> + </span>
        </div>
      ),
    },
    {
      name: "SUBTOTAL",
      selector: (row) => <span>${row.qnty * row.price}</span>,
    },
  ];

  return (
    <>
      <div className="container">
        <h2 className="text-dark">Cart Items</h2>
        <DataTable columns={columns} data={cartItems} />
        <hr></hr>

        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <NavLink to={""}>
              <Button
                className="btn btn-secondary navbar-brand h4 text-white pt-1 pb-1"
                color="none"
                onClick={() => {
                  window.history.back();
                }}
              >
                <ShoppingCartIcon />
                Continue Shopping
              </Button>
            </NavLink>

            <MDBRow className="card2 box-container">
              <MDBCol className="box-content">
                <MDBCol>
                  <div
                    className="d-flex justify-content-between mb-2"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="p-3">Total:</p>
                    <p className="p-3">{calculateTotalPrice()}</p>
                  </div>

                  <Button className="btn btn-primary">
                    Checkout: {calculateTotalPrice()}
                  </Button>
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </div>
    </>
  );
}
