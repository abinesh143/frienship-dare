"use client";

import MainSection from "@/components/MainSection";
import Modal from "@/components/Modal";
import { useEffect } from "react";

const Answer = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <div>
      <MainSection user={true} />
      <Modal />
    </div>
  );
};

export default Answer;
