"use client";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <img src="/emogi1.webp" className="me-2" width={40} height={40}></img>
          <a className="navbar-brand fs-3 fw-bolder" href="#">
            Friendship Dare
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
