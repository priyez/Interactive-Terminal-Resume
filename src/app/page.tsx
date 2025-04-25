"use client"
import Preloader from "@/components/Preloader";
import { useState } from "react";
import TerminalComp from "@/components/Terminal";


export default function Home() {
  const [loading, setLoading] = useState(true);
  return (
    <>
    {loading ? (
      <Preloader onComplete={() => setLoading(false)} />
    ) : (
      <TerminalComp />
    )}
  </>
  );
}
