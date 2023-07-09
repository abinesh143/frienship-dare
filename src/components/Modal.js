import { useEffect, useRef } from "react";
import stickerData from "../sticker.json";

const Modal = () => {
  return (
    <div
      className="offcanvas offcanvas-bottom"
      tabIndex="-1"
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
      style={{ height: "60%" }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title text-center fw-semibold" id="offcanvasBottomLabel">
          Animated Stickers
        </h5>
        <a href={stickerData[1].link} className="btn btn-success zoom-in-out-box">Download</a>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body ">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item ">
              <a href={stickerData[1].link}>
                <img
                  src={stickerData[1].url}
                  className="d-block w-100"
                  alt={stickerData[1].name}
                />
              </a>
            </div>
            <div className="carousel-item ">
              <a href={stickerData[2].link}>
                <img
                  src={stickerData[2].url}
                  className="d-block w-100"
                  alt={stickerData[2].name}
                />
              </a>
            </div>
            <div className="carousel-item ">
              <a href={stickerData[3].link}>
                <img
                  src={stickerData[3].url}
                  className="d-block w-100"
                  alt={stickerData[3].name}
                />
              </a>
            </div>
            <div className="carousel-item ">
              <a href={stickerData[4].link}>
                <img
                  src={stickerData[4].url}
                  className="d-block w-100"
                  alt={stickerData[4].name}
                />
              </a>
            </div>
            <div className="carousel-item ">
              <a href={stickerData[5].link}>
                <img
                  src={stickerData[5].url}
                  className="d-block w-100"
                  alt={stickerData[5].name}
                />
              </a>
            </div>
            <div className="carousel-item ">
              <a href={stickerData[6].link}>
                <img
                  src={stickerData[6].url}
                  className="d-block w-100"
                  alt={stickerData[6].name}
                />
              </a>
            </div>
            <div className="carousel-item active">
              <a href={stickerData[0].link}>
                <img
                  src={stickerData[0].url}
                  className="d-block w-100"
                  alt={stickerData[0].name}
                />
              </a>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden ">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
