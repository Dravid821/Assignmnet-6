import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
const Carousal = ({ images }) => {
  return (
    <div className="col-md-6 col-sm-12">
      <Carousel>
        {images.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100 caraimg"
                src={item}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  )
}

export default Carousal;
