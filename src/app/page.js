"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import Items from "@/components/Items";

export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <main>
      <div>
        <Slider />
        <Items />
        <Footer />
      </div>
    </main>
  );
}
