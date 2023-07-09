"use client";
import Footer from "@/components/Footer";
import Loader from "@/components/Loading";
import MainSection from "@/components/MainSection";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Questions = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const checkUser = localStorage.getItem("quesUser");
    if (checkUser) {
      setUser(JSON.parse(checkUser));
      setLoader(false);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <MainSection quesUser={user} />
          <Modal />
        </div>
      )}
    </div>
  );
};

export default Questions;
