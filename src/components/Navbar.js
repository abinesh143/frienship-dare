"use client";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <img src="/emogi1.webp" className="me-3 ms-1" width={40} height={40}></img>
          <a className="navbar-brand fs-3 fw-bolder" href="#">
            Smiley Shopy
          </a>
        </div>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
