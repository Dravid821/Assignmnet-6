import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Label } from "reactstrap";
import { Addtocart, removetocart, remove } from "../../../Redux/Actions/action";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardText, CardHeader } from "reactstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
export default function Cart() {
  const cartItems = useSelector((state) => state.datareducer.carts);
  console.log("qnty",cartItems);
  const dispatch = useDispatch();

  const increment = (item) => {
    dispatch(Addtocart(item));
  };

  const decrement = (item) => {
    dispatch(removetocart(item));
  };
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.qnty * item.price;
    });
    return total.toFixed(2); // rounding total to 2 decimal places
  };
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
          <span onClick={() => decrement(row)}> - </span>
          <span className="text-primary">{row.qnty}</span>
          <span onClick={() => increment(row)}> + </span>
        </div>
      ),
    },
    {
      name: "SUBTOTAL",
      selector: (row) => <span>${row.qnty * row.price}</span>,
    },
    // {
    //   name: "REMOVE",
    //   selector: (row) => (
    //     <div className="d-flex justify-content-center align-items-center gap-3">
    //       <Button
    //         className="btn btn-danger"
    //         onClick={() => handleRemoveClick(row)}
    //       >
    //         Remove
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <div className="container">
        <h2 className="text-dark">Cart Items</h2>
        <DataTable columns={columns} data={cartItems} />
        <hr></hr>

        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <NavLink style={{ textDecoration: "none" }} to={`/product`}>
              <Button
                className="btn btn-secondary navbar-brand h4 text-white pt-1 pb-1"
                color="none"
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
