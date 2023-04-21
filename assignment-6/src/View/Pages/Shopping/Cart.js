import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "reactstrap";
import { Addtocart, removetocart } from "../../../Redux/Actions/action";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardText, CardHeader } from "reactstrap";
export default function Cart() {
  const items = useSelector((state) => state.datareducer.user);
  console.log(items)
  
  const dispatch = useDispatch();
  const increment = (item) => {
    dispatch(Addtocart(item));
  };
  const decrement = (item) => {
    dispatch(removetocart(item));
  };
  return (
    <>
      <div>
        <h2 className="text-dark">Cart Items</h2>
        {items.length === 0 ? (
          <h2 className="mt-5 text-secondary">Cart Items is Empty</h2>
        ) : (
          items.map((item) => {
            return (
              <div className="container bg-light">
                <div className="row d-flex justify-content-center">
                  <Card
                    key={item.id}
                    className="my-2"
                    style={{
                      width: "23rem",
                    }}
                  >
                    <CardHeader className="">
                      <h5 className="text-secondary">{item.title}</h5>
                    </CardHeader>
                    <CardBody>
                      <div>
                        <CardText className="btn text-dark">
                          <Label className="btn-outline-dark text-dark">
                            <span className="text-secondary">QUANTITY:</span>
                            <span className="text-primary">{item.qnty}</span>
                          </Label>
                        </CardText>
                      </div>
                      <CardText className="btn text-dark">
                        <Label className="btn-outline-dark text-dark">
                          <span className="text-secondary">PRICE:</span>$
                          {item.price}
                        </Label>
                      </CardText>
                      <div className="d-flex justify-content-center gap-3">
                        <button
                          onClick={() => decrement(item)}
                          className="btn btn-secondary"
                        >
                          -
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => increment(item)}
                        >
                          +
                        </button>
                      </div>
                      <div className="btn btn-dark mt-4">
                        total:${item.qnty * item.price}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            );
          })
        )}
        <NavLink style={{ textDecoration: "none" }} to={`/product`}>
          <button
            className="btn btn-secondary navbar-brand h4 text-white mt-5"
            color="none"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/015/078/042/original/continue-shopping-glyph-icon-vector.jpg"
              className="img-fluid"
              width="40px"
            />{" "}
            Continue Shoping
          </button>
        </NavLink>
      </div>
    </>
  );
}
