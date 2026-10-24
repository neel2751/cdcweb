"use client";

import { useEffect } from "react";
import { recordSource } from "@/lib/forms";

export default function SourceTracker() {
  useEffect(() => {
    recordSource();
  }, []);
  return null;
}