"use client";

import Modal from "@/components/Modal";
import ResultTable from "@/components/Resulttable";
import WhatsSticker from "@/components/WhatsSticker";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import clipboardCopy from "clipboard-copy";

const Success = () => {
  const [count, setCount] = useState(0);
  const param = useParams();
  const copyText = useRef(null);
  const [table, SetTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const animated = useRef(null);
  const [userDetails, setUserDetails] = useState();

  const shareOnWhats = () => {
    if (count < 20) {
      setCount(count + 1);
      const shareText = `🤗 ${
        userDetails ? userDetails.name : "your Friend"
      } has sent you Friendship Dare of 2023 👸🤴.%0aTake this Challenge NOW 🤯👇👇👇👇🤯`;
      const link = `https://www.smileyshopy.in/quiz/${param.quesId}`;
      const url = `whatsapp://send?text=${shareText + "%0a" + link}`;
      window.location.href = url;
    } else {
      const shareText = `🤗 ${
        userDetails ? userDetails.name : "your Friend"
      } has sent you Friendship Dare of 2023 👸🤴.%0aTake this Challenge NOW 🤯👇👇👇👇🤯`;
      const link = `https://www.smileyshopy.in/quiz/${param.quesId}`;
      const url = `whatsapp://send?text=${shareText + "%0a" + link}`;
      window.location.href = url;
    }
    if (count % 3 == 1 || count == 20) {
      const element = animated.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        window.scrollBy({
          top: rect.top,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const copyLink = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    const text = copyText.current.innerText;
    clipboardCopy(text)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Copied to Clipboard",
        });
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "Not Copied Try Again",
        });
      });
  };

  const viewResults = () => {
    SetTable(!table);
  };

  const deleteQuiz = () => {
    Swal.fire({
      title: "Are you sure",
      text: "This Quiz will be deleted?",
      icon: "warning",
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("quesUser");
        localStorage.removeItem("quesExits");
        router.replace("/");
      }
    });
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const fetchResult = useCallback(async () => {
    const response = await fetch(`/api/result?id=${param.quesId}`, {
      method: "GET",
    });
    const fetchTable = await response.json();
    setTableData(fetchTable);
  }, []);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  useEffect(() => {
    const user = localStorage.getItem("quesUser");
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      <div className="m-2 bg-light rounded-3">
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
          <img src="/hearteyes.webp" width={125} height={125}></img>
          <div className="text-center m-2 fs-3 fw-medium text-danger">
            Your Challenge is Ready
          </div>
          <div className="text-center fs-5">
            Share this link with your friends
          </div>
          <div className="my-2 w-100">
            <div
              ref={copyText}
              className="p-2 mx-2 rounded-pill bg-white fs-4 text-primary text-center overflow-hidden"
            >{`https://www.smileyshopy.in/quiz/${param.quesId}`}</div>
          </div>
          <button
            type="button"
            className="btn btn-primary customWidth mx-3 rounded-pill my-2 py-1 text-white"
            onClick={copyLink}
          >
            Copy Link
          </button>
        </div>
      </div>
      <div className="m-2 rounded-3">
        <div className="d-flex flex-column justify-content-center align-items-center my-3">
          <button
            type="button"
            className="btn btn-warning customWidth mx-3 rounded-pill my-2 py-1 text-white"
            onClick={viewResults}
          >
            View Results
          </button>
        </div>
        {table ? <ResultTable data={tableData} /> : null}

        <div className="mb-5 container mt-5 d-flex justify-content-center">
          <span
            className="badge rounded-pill text-bg-danger"
            onClick={deleteQuiz}
          >
            Delete and Create New Quiz
          </span>
        </div>
      </div>

      <div ref={animated}>
        <WhatsSticker />
      </div>
      <Modal />

      <div className="bg-light rounded-top-3 sticky-bottom">
        <div className="pt-3 text-center fs-5 ">
          Share with atleast 20 Friends
        </div>
        <div className="p-2">
          <div
            className="progress"
            role="progressbar"
            aria-label="Example with label"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="progress-bar" style={{ width: `${count * 5}%` }}>
              {count * 5}%
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success fs-3 my-3 w-100"
            onClick={shareOnWhats}
          >
            Share on whatsapp
          </button>
        </div>
      </div>
    </div>
  );
};
export default Success;
