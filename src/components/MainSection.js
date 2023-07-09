import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import data from "../data.json";
import mainImage from "../image.json";
import Loader from "@/components/Loading";
import Footer from "./Footer";

const MainSection = (props) => {
  const [card, setCard] = useState(0);
  const [imageViewer, SetImageViewer] = useState("/hearteyes.webp");
  const [selected, SetSelected] = useState([]);
  const [gameData, SetGameData] = useState(data);
  const [skiped, SetSkiped] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [cardIndex, SetCardIndex] = useState(null);
  const [backColor, SetBackColor] = useState("bg-info-subtle");
  const [userDetails, setUserDetails] = useState(null);
  const [crctAns, SetCrctAns] = useState([]);
  const [score, SetScore] = useState(0);
  const router = useRouter();
  const params = useParams();
  const [quizCreator, setQuizCreator] = useState("");

  const userCardSelection = async (ques, ans, index) => {
    if (card < gameData.length) {
      SetCardIndex(index);
      SetSelected([...selected, index]);
      crctAns.selected.forEach((c) => {
        if (c.quesId === ques.slug) {
          if (c.ansId === ans.id) {
            SetScore(score + 1);
            SetBackColor("bg-success");
          } else {
            SetBackColor("bg-danger");
          }
        }
      });

      if (selected.length >= 14) {
        SetLoading(true);
        const requestBody = {
          name: userDetails.name,
          quesId: userDetails.quesId,
          score: score + 1,
        };

        let res = await fetch("/api/result", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        sessionStorage.setItem("ansUser", JSON.stringify(requestBody));

        setTimeout(() => {
          router.replace(`/answer/result?quiz=${quizCreator}`);
        }, 2000);
      } else {
        setTimeout(() => {
          SetCardIndex(null);
          SetBackColor("bg-info-subtle");
          setCard(card + 1);
          if (card % 2 == 0 && mainImage.length) {
            SetImageViewer(
              mainImage[Math.floor(Math.random() * mainImage.length)]["url"]
            );
          }
        }, 600);
      }
    }
  };

  // for Question Maker

  const cardSelection = async (ques, ans, index) => {
    if (props.user) {
      userCardSelection(ques, ans, index);
    } else {
      if (card < gameData.length - 1 && ques && ans) {
        const tempObject = {
          quesId: ques.slug,
          ansId: ans.id,
        };
        SetCardIndex(index);
        SetSelected([...selected, tempObject]);

        if (selected.length >= 14) {
          SetLoading(true);

          const requestBody = {
            userName: props.quesUser.name,
            userId: props.quesUser.id,
            selected: [...selected, tempObject],
          };

          let res = await fetch("/api/quiz", {
            method: "POST",
            body: JSON.stringify(requestBody),
          });

          if (res?.status == 200) {
            localStorage.setItem("quesExits", true);
          }

          setTimeout(() => {
            router.push(`/success/${params.questId}`);
          }, 2000);
        } else {
          setTimeout(() => {
            SetCardIndex(null);
            setCard(card + 1);
            if (card % 2 == 0 && mainImage.length) {
              SetImageViewer(
                mainImage[Math.floor(Math.random() * mainImage.length)]["url"]
              );
            }
          }, 500);
        }
      } else {
        setCard(0);
        SetImageViewer("/hearteyes.webp");
        SetGameData([...skiped]);
      }
    }
  };

  const skipButton = (cardNo) => {
    if (card < gameData.length - 1) {
      SetSkiped([...skiped, gameData[cardNo]]);
      setCard(card + 1);
    } else {
      SetImageViewer("/hearteyes.webp");
      SetGameData([...skiped]);
      setCard(0);
    }
  };

  const fetchUserQuestion = useCallback(async (user) => {
    if (props.user) {
      SetLoading(true);
      const response = await fetch(`/api/quiz?id=${user.quesId}`, {
        method: "GET",
      });

      const fetchUser = await response.json();
      SetCrctAns(fetchUser);
      setQuizCreator(fetchUser.userName);

      let gameQuestion = fetchUser.selected.map((d) => {
        let question = data.filter((f) => {
          return f.question.slug == d.quesId;
        });
        return question[0];
      });
      SetGameData(gameQuestion);
      SetLoading(false);
    }
  }, []);

  useEffect(() => {
    if (props.user) {
      const user = sessionStorage.getItem("ansUser");
      if (user) {
        const tempUser = JSON.parse(user);
        setUserDetails(tempUser);
        fetchUserQuestion(tempUser);
      }
    } else {
      SetLoading(false);
    }
  }, [fetchUserQuestion]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <img src={imageViewer} width={125} height={125}></img>
            <div className="text-center m-3 fs-4 fw-medium text-danger-emphasis">
              HOW WELL DO YOUR FRIENDS KNOW YOU?
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center mx-3 mb-3">
            {[...Array(15)].map((e, index) => {
              return (
                <div
                  key={index}
                  id="numberHeading"
                  className="fs- p-1 px-3 me-2"
                  style={
                    selected.length === index
                      ? { backgroundColor: "red" }
                      : { backgroundColor: "white" }
                  }
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
          {!props.user ? (
            <div className="d-flex justify-content-center mb-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => skipButton(card)}
              >
                Skip this Button
              </button>
            </div>
          ) : null}
          <div className="container">
           {
            props.user ?  <div className="text-center fs-6 px-3 pb-2 text-secondary">
            Which of the following options {quizCreator || 'your Friend'} has chosen?
          </div> : null
           }
            <div className="text-center fs-5 px-2">
              {gameData[card].question.text}
            </div>
            <div className="row mt-3 mb-5">
              {gameData[card].answer.map((a, index) => {
                return (
                  <div key={index} className="col-6 d-flex justify-content-center">
                    <div
                      className={`shadow my-3 rounded  ${
                        !props.user &&
                        (cardIndex == index ? " bg-primary" : " bg-info-subtle")
                      } ${
                        props.user &&
                        (cardIndex == index ? backColor : " bg-info-subtle")
                      }`}
                      onClick={() =>
                        cardSelection(gameData[card].question, a, index)
                      }
                    >
                      <img
                        src={a.url}
                        width={140}
                        height={140}
                        className="p-3"
                      ></img>
                      <div className="py-2 text-center text-white bg-primary rounded-bottom">
                        {a.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MainSection;
