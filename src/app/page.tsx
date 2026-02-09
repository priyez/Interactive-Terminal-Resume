"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import TerminalComp from "@/components/Terminal";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <ErrorBoundary>
          <TerminalComp />
        </ErrorBoundary>
      )}
    </>
  );
}
