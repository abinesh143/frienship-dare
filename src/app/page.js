"use client";

import { useEffect, useState } from "react";
import StartDare from "@/components/StartDare";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/Loading";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const quesExists = localStorage.getItem("quesExits");
    const userExists = localStorage.getItem("quesUser");
    if (quesExists && userExists) {
      const user = JSON.parse(userExists);
      router.replace(`/success/${user.id}`);
    }
    setLoader(false)
  }, []);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <main>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <StartDare />
          <Image src='/moving.gif' alt="animated" height={300} width={300} />
          <Footer />
          <Modal></Modal>
        </div>
      )}
    </main>
  );
}
