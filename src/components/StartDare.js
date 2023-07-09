import { storeId, storeUser } from "@/redux/features/quizSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uid } from "uid";

const StartDare = () => {
  const router = useRouter();

  const [username, SetUserName] = useState("");

  const handleStartDare = async () => {
    if (username) {
      const id = uid(8);
      sessionStorage.setItem(
        "quesUser",
        JSON.stringify({ name: username, id: id })
      );
      router.push(id);
    } else {
      alert("please type your name");
    }
  };
  return (
    <div>
      <div className="text-center m-3 fs-4 fw-medium text-danger-emphasis">
        HOW WELL DO YOUR FRIENDS KNOW YOU?
      </div>
      <div className="bg-light">
        <img
          src="https://www.lego.com/cdn/cs/aboutus/assets/blte8d30ff4729a1c98/Picture1.jpg"
          className="img-fluid"
        ></img>
      </div>
      <div className="bg-white py-4 px-3">
        <div className="shadow p-3  bg-body-tertiary rounded d-flex flex-column justify-content-center align-items">
          <h2 className="text-center fw-medium py-2 fs-2">Enter your name ?</h2>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Ex. Akshaya"
            onChange={(e) => SetUserName(e.target.value)}
          />
          <button
            type="button text-center"
            className="btn btn-warning my-2 py-1"
            onClick={handleStartDare}
          >
            Start
          </button>
        </div>
      </div>
      <div className="shadow-sm p-3 bg-body-tertiary rounded">
        <h2 className="text-center fs-2 fw-medium py-1">Instructions</h2>
        <ol className="px-3">
          <li className="py-1 fw-medium">Enter your name.</li>
          <li className="py-1 fw-medium">Answer questions about yourself.</li>
          <li className="py-1 fw-medium">
            Your Dare link will be ready to share.
          </li>
          <li className="py-1 fw-medium">Share with your friends.</li>
          <li className="py-1 fw-medium">
            Your friends will try to guess the right answers.
          </li>
          <li className="py-1 fw-medium">
            Check their scores at the scoreboard.
          </li>
          <li className="py-1 fw-medium">Gift your friends.</li>
        </ol>
      </div>
    </div>
  );
};

export default StartDare;
