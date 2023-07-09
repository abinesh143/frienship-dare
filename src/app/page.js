"use client";

import { useEffect } from "react";
import StartDare from "@/components/StartDare";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const quesExists = sessionStorage.getItem("quesExits");
    const userExists = sessionStorage.getItem("quesUser");
    if (quesExists && userExists) {
      const user = JSON.parse(userExists);
      router.replace(`/success/${user.id}`);
    }
  }, []);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <main>
      <StartDare />
      <Footer />
      <Modal></Modal>
    </main>
  );
}
