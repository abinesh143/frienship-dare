const Slider = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item ">
          <a href="#">
            <img src="/tee3.png" className="d-block w-100" alt="Candy Fiesta" />
          </a>
        </div>
        <div className="carousel-item ">
          <a href="#">
            <img src="/tee2.png" className="d-block w-100" alt="Jimpo Jump" />
          </a>
        </div>
        <div className="carousel-item active">
          <a href="#">
            <img
              src="/tee1.png"
              className="d-block w-100"
              alt="Zombie Shooter"
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
  );
};

export default Slider;
