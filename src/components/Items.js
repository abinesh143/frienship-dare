"use client";

import { useCallback, useEffect, useState } from "react";
import Loader from "./Loading";

const Items = () => {
  const [data, setData] = useState(null);

  const shareProduct = () => {
    const shareText = `🤗 ${
      userDetails ? userDetails.name : "your Friend"
    } has sent you Friendship Dare of 2023 👸🤴.%0aTake this Challenge NOW 🤯👇👇👇👇🤯`;
    const link = `https://www.smileyshopy.in/quiz/`;
    const url = `whatsapp://send?text=${shareText + "%0a" + link}`;
    window.location.href = url;
  };

  const fetchResult = useCallback(async (quesId) => {
    const response = await fetch(`/api/products`, {
      method: "GET",
    });
    const allProducts = await response.json();
    console.log(allProducts);
    setData(allProducts);
  }, []);

  useEffect(() => {
    fetchResult();
  }, []);
  return (
    <main>
      <div className="my-3 my-sm-5">
        <h1 className="text-center fs-1 fw-bold">Shop by Products</h1>
      </div>
      <div className="container">
        <div className="row">
          {data && data.length ? (
            data.map((d, index) => (
              <div key={d._id} className="col-12 col-sm-6 col-lg-3 p-3">
                <div className="card">
                  <img
                    src={d.imageUrl}
                    className="card-img-top"
                    alt="product"
                  />
                  <div className="card-body d-flex justify-content-center">
                    <a
                      href={d.amazonLink}
                      target="_blank"
                      type="button"
                      className="btn btn-dark px-5 py-2"
                    >
                      View Now
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ height: '50vh'}}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Items;
