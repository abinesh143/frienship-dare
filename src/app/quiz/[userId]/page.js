"use client";

import Modal from "@/components/Modal";
import ResultTable from "@/components/Resulttable";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Quiz = () => {
  const [name, SetName] = useState("");
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const param = useParams();

  const createQuiz = () => {
    router.replace("/");
  };

  const startButton = () => {
    if (name) {
      sessionStorage.setItem(
        "ansUser",
        JSON.stringify({ name: name, quesId: param.userId })
      );
      router.push("/answer/quiz");
    } else {
      alert("please enter your name");
    }
  };

  const fetchResult = useCallback(async () => {
    const response = await fetch(`/api/result?id=${param.userId}`, {
      method: "GET",
    });
    const fetchUser = await response.json();
    setTableData(fetchUser);
  }, []);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return (
    <div>
      <div className="text-center m-3 fs-4 fw-medium text-danger-emphasis">
        HOW WELL DO YOUR FRIENDS KNOW YOU?
      </div>
      <div className="bg-white d-flex justify-content-center">
        <img src="/hearteyes.webp" width={125} height={125}></img>
      </div>
      <div className="text-center mx-2 mt-3 fs-5 fw-medium text-primary-emphasis">
        How well you really know your Friend?
      </div>
      <div className="bg-white py-4 px-3">
        <div className="shadow p-3  bg-body-tertiary rounded d-flex flex-column justify-content-center align-items">
          <h2 className="text-center fw-medium py-2 fs-2">Enter your name ?</h2>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Ex. Akshaya"
            onChange={(e) => SetName(e.target.value)}
          />
          <button
            type="button text-center"
            className="btn btn-warning my-2 py-1"
            onClick={startButton}
          >
            Start
          </button>
        </div>
      </div>
      <div className="container">
        <div className="mt-3">
          <div className="text-center mx-2 my-3 fs-3 fw-medium color-orange">
            How well you really know Abinesh?
          </div>
          <ResultTable data={tableData} />
          <div className="d-flex justify-content-center py-4 sticky-bottom bg-white">
            <button
              type="button"
              className="btn btn-pink-moon customWidth py-2 fs-4 fw-medium"
              onClick={createQuiz}
            >
              Create Your Own Quiz
            </button>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Quiz;
