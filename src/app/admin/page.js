"use client";

import { useEffect, useState } from "react";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [cat, setCat] = useState("");
  const [error, setError] = useState({
    image: "",
    link: "",
    cat: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError({ ...error, image: "No Image Found" });
    } else if (!link) {
      setError({ ...error, link: "No Link Found" });
    } else if (!cat) {
      setError({ ...error, cat: "Category Not Selected" });
    } else {
      setError({
        image: "",
        link: "",
        cat: "",
      });

      const requestBody = {
        imageUrl: image,
        category: cat,
        amazonLink: link,
      };

      try {
        setLoading(true);
        await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });
        setCat("");
        setImage("");
        setLink("");
      } catch (error) {
        alert("Product Not Added");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <main>
      <div className="container">
        <h1 className="text-center fs-1 fw-bold my-5">Add Product</h1>
        <div className="card m-5 p-5">
          <form>
            <div className="mb-4">
              <label for="image-url" className="form-label fw-semibold fs-4">
                Product Image
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                value={image}
                placeholder="Item Image Url"
                aria-label="image-url"
                onChange={(e) => setImage(e.target.value)}
              ></input>
              <small className="text-danger mx-2">{error.image}</small>
            </div>
            <div className="mb-4">
              <label
                for="select-category"
                className="form-label fw-semibold fs-4"
              >
                Select Category
              </label>
              <select
                className="form-select form-select-lg"
                aria-label="select category"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              >
                <option selected>Select Category</option>
                <option value="mens-tamil">Mens Tamil</option>
                <option value="wowen-tamil">Wowen Tamil</option>
                <option value="men-english">Mens English</option>
                <option value="wowen-english">Mens English</option>
              </select>
              <small className="text-danger mx-2">{error.cat}</small>
            </div>
            <div className="mb-4">
              <label for="amazon-link" className="form-label fw-semibold fs-4">
                Amazon Link
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                value={link}
                placeholder="Amazon Link"
                aria-label="amazon-link"
                onChange={(e) => setLink(e.target.value)}
              ></input>
              <small className="text-danger mx-2">{error.link}</small>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-dark px-5 py-2"
                disabled={loading}
                onClick={(e) => handleSubmit(e)}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                ) : null}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Admin;
