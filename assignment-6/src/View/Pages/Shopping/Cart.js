import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Label } from "reactstrap";
import { Addtocart, removetocart,remove } from "../../../Redux/Actions/action";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardText, CardHeader } from "reactstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from '@mui/icons-material/Delete';
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
  console.log(cartItems);
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
  const handleRemoveClick = (itemId) => {
    dispatch(remove(itemId)); // Dispatch the 'removeFromCartPage' action with the item ID as the payload
  };

  const columns = [
    {
      name: "Image",
      maxWidth: "40px",
      maxHeight:"40px",
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
    {
      name: "REMOVE",
      selector: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-3">
        <Button className="btn btn-danger" onClick={()=> handleRemoveClick(row)}>Remove</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container">
        <h2 className="text-dark">Cart Items</h2>
        <DataTable columns={columns} data={cartItems} />
        <hr></hr>
        {/* {cartItems.length === 0 ? (
          <h2 className="mt-5 text-secondary">Cart Items is Empty</h2>
        ) : (
          cartItems.map((item) => {
            return (
              <>
                <div className="container bg-light mt-4" key={item.id}>
                  <div className="row align-items-center">
                    <MDBTable className="bord" >
                      <MDBTableBody >
                        <tr className="bord">
                          <th
                            scope="row"
                            style={{
                              width: "150px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={item.thumbnail}
                              fluid
                              className="rounded-3"
                              style={{ width: "100px", height: "80px" }}
                              alt="Book"
                            />
                            <div className="flex-column justify-content-center ms-4">
                              {item.title}
                            </div>
                          </th>
                          <td className="align-middle justify-content-center">
                            <p className="mb-0" style={{ fontWeight: "500" }}>
                              ${item.price}
                            </p>
                          </td>
                          <td className="align-middle">
                            <div
                              className="d-flex justify-content-center align-items-center gap-3"
                              style={{ gap: "10px" }}
                            >
                              <span
                                onClick={() => decrement(item)}
                                className=""
                              >
                                -
                              </span>
                              <span className="text-primary">{item.qnty}</span>
                              <span
                                className=""
                                onClick={() => increment(item)}
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td className="align-middle">
                            <span>${item.qnty * item.price}</span>
                          </td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                </div>
              </>
            );
          })
        )} */}
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <NavLink style={{ textDecoration: "none" }} to={`/product`}>
              <button
                className="btn btn-secondary navbar-brand h4 text-white btn-lg "
                color="none"
              >
                <ShoppingCartIcon />
                Continue Shopping
              </button>
            </NavLink>

            <MDBRow className="box-container">
              <MDBCol className="box-content">
                <MDBCol>
                  <div
                    className="d-flex justify-content-between mb-4"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-2">Total :</p>
                    <p className="mb-2">{calculateTotalPrice()}</p>
                  </div>

                  <Button className="box-button">
                    <div className="d-flex justify-content-between">
                      <span>Checkout :</span>
                      <span>{calculateTotalPrice()}</span>
                    </div>
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
