"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState({
    image: "",
    link: "",
    language: "",
    gender: "",
  });

  const toastMessage = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Product Saved Successfully",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError({ ...error, image: "No Image Found" });
    } else if (!link) {
      setError({ ...error, link: "No Link Found" });
    } else if (!language) {
      setError({ ...error, language: "Language Not Selected" });
    } else if (!gender) {
      setGender({ ...error, gender: "Gender Not Selected" });
    } else {
      setError({
        image: "",
        link: "",
        language: "",
        gender: "",
      });

      const requestBody = {
        imageUrl: image,
        language: language,
        gender: gender,
        amazonLink: link,
      };

      try {
        setLoading(true);
        await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });
        setLanguage("");
        setImage("");
        setLink("");
        setGender("");
        toastMessage();
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
            <div className="mb-3">
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
            <div className="mb-3">
              <label
                for="select-gender"
                className="form-label fw-semibold fs-4"
              >
                Select Gender
              </label>
              <select
                className="form-select form-select-lg"
                aria-label="select gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option selected>Select Gender</option>
                <option value="men">Men</option>
                <option value="wowen">Wowen</option>
              </select>
              <small className="text-danger mx-2">{error.gender}</small>
            </div>
            <div className="mb-3">
              <label
                for="select-language"
                className="form-label fw-semibold fs-4"
              >
                Select Language
              </label>
              <select
                className="form-select form-select-lg"
                aria-label="select language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option selected>Select Language</option>
                <option value="tamil">Tamil</option>
                <option value="english">English</option>
              </select>
              <small className="text-danger mx-2">{error.language}</small>
            </div>
            <div className="mb-3">
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
