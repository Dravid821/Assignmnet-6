import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

import "../Asset/ProductData.scss";
const CardData = ({ item }) => {
  return (
    <MDBCard key={item.id} className="card">
      <MDBCardImage src={item.thumbnail} className="shade img" height={500} />
      <MDBCardBody>
        <div className="d-flex justify-content-between ">
          <span className="mb-0">{item.title}</span>

          <h5 className="text-dark mb-0">${item.price}</h5>
        </div>
        <div class="d-flex justify-content-center pt-4">
          <button type="button" class="btn btn-dark ">
            <NavLink to={`/product/${item.id}`} className="slink text-white">
              View More
            </NavLink>
          </button>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CardData;
