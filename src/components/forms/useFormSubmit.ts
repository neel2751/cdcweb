"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { checkFiles, compressImage, submitForm, type FormKind } from "@/lib/forms";

type Status = "idle" | "sending" | "sent";

export function useFormSubmit(kind: FormKind, opts: { redirect?: boolean; extra?: () => Record<string, string> } = {}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [ref, setRef] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const picked = data.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (picked.length > 0) setStatus("sending");
    const files = await Promise.all(picked.map(compressImage));
    const fileProblem = checkFiles(files);
    if (fileProblem) {
      setError(fileProblem);
      setStatus("idle");
      return;
    }
    data.delete("files");
    for (const f of files) data.append("files[]", f);
    if (opts.extra) for (const [k, v] of Object.entries(opts.extra())) data.set(k, v);

    setError(null);
    setStatus("sending");
    const result = await submitForm(kind, data);
    if (!result.ok) {
      setError(result.error);
      setStatus("idle");
      return;
    }
    setRef(result.ref);
    if (opts.redirect) {
      router.push(`/enquiry-received?ref=${encodeURIComponent(result.ref)}&type=${kind}`);
      return;
    }
    setStatus("sent");
    form.reset();
  }

  return { status, error, ref, onSubmit };
}