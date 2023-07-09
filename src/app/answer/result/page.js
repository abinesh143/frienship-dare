"use client";

import Modal from "@/components/Modal";
import ResultTable from "@/components/Resulttable";
import WhatsSticker from "@/components/WhatsSticker";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const QuizResult = () => {
  const scoreIndicator = useRef(null);
  const [userDetails, setUserDetails] = useState(null);
  const [tableData, setTableData] = useState([]);
  const param = useParams();
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get('quiz')

  const scoreBoard = useCallback((user) => {
    let element = scoreIndicator.current;
    if (element) {
      if (user.score) {
        element.style.transform =
          "rotate(" + (-90 + (user.score * 180) / 15) + "deg)";
      } else {
        element.style.transform = "rotate(" + (-90 + (5 * 180) / 15) + "deg)";
      }
    }
  }, []);

  const createQuiz = () => {
    router.replace("/");
  };

  const fetchResult = useCallback(async (quesId) => {
    const response = await fetch(`/api/result?id=${quesId}`, {
      method: "GET",
    });
    const fetchUser = await response.json();
    setTableData(fetchUser);
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("ansUser");
    if (user) {
      const userDetails = JSON.parse(user);
      fetchResult(userDetails.quesId);
    }
  }, [fetchResult]);

  useEffect(() => {
    const user = sessionStorage.getItem("ansUser");
    if (user) {
      const userDetails = JSON.parse(user);
      setUserDetails(userDetails);
      scoreBoard(userDetails);
    }
  }, [scoreBoard]);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div>
      <div className="m-2 bg-light rounded-3">
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
          <img src="/hearteyes.webp" width={125} height={125}></img>
          <div className="text-center m-2 fs-3 fw-medium text-danger">
            HOW WELL DO YOUR FRIENDS KNOW YOU?
          </div>
          <div className="py-2"></div>
          <div className="text-center fs-5">
            Who Know {search ? search : "Your Friend"} Best?
          </div>
        </div>
        <div className="wrapper mb-3">
          <div className="rang">
            <div className="rang-title">
              <input
                id="show"
                className="rang-number"
                type="text"
                value={`score ${userDetails?.score ? userDetails.score : ""}`}
                disabled
              />
            </div>
            <svg className="meter">
              <circle className="meter-left" r="96" cx="135" cy="142"></circle>
              <circle
                className="meter-center"
                r="96"
                cx="136"
                cy="142"
              ></circle>
              <circle className="meter-right" r="96" cx="138" cy="142"></circle>
              <polygon
                ref={scoreIndicator}
                className="meter-clock"
                points="129,145 137,90 145,145"
              ></polygon>
              <circle
                className="meter-circle"
                r="10"
                cx="137"
                cy="145"
              ></circle>
            </svg>
          </div>
        </div>
      </div>
      <div className="m-2 rounded-3">
        <ResultTable data={tableData} />
      </div>
      <div className="mx-2 my-4 rounded-3">
        <WhatsSticker />
      </div>
      <Modal />
      <div className=" bg-light d-flex justify-content-center py-4 sticky-bottom">
        <button
          className="btn btn-orange-moon customWidth py-2 fs-4 fw-medium"
          onClick={createQuiz}
        >
          Create Your Own Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
