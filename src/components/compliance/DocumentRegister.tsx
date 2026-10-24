"use client";

import { useState } from "react";
import type { ComplianceDoc } from "@/types";
import { cn, daysUntil, formatDate } from "@/lib/utils";

function Expiry({ iso }: { iso?: string }) {
  if (!iso) return <span className="text-steel">To be added</span>;
  const d = daysUntil(iso);
  if (d < 0) return <span className="font-semibold text-red">Expired {formatDate(iso)}</span>;
  if (d <= 60) return <span className="font-semibold text-[#9a5b00]">Renews {formatDate(iso)}</span>;
  return <span>{formatDate(iso)}</span>;
}

export default function DocumentRegister({ docs }: { docs: ComplianceDoc[] }) {
  const downloadable = docs.filter((d) => d.access === "public" && d.file);
  const [picked, setPicked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function buildPack() {
    setBusy(true);
    setError(null);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      const chosen = downloadable.filter((d) => picked.includes(d.id));
      const index = ["CDC — Creative Design & Construction Ltd", "Tender document pack", `Prepared ${new Date().toLocaleDateString("en-GB")}`, ""];
      for (const d of chosen) {
        const res = await fetch(d.file!);
        if (!res.ok) throw new Error(d.name);
        const name = d.file!.split("/").pop()!;
        zip.file(name, await res.blob());
        index.push(`${d.name} — version ${d.version ?? "n/a"}, issued ${formatDate(d.issued) || "n/a"}, expires ${formatDate(d.expires) || "n/a"} — ${name}`);
      }
      zip.file("INDEX.txt", index.join("\n"));
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CDC-tender-pack.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(`Couldn't add ${e instanceof Error ? e.message : "a document"} to the pack. Download it on its own, or request the pack below.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-x-auto border border-line bg-paper">
        <table className="w-full min-w-180 text-left text-[15px]">
          <thead className="border-b-2 border-ink font-mono text-xs tracking-widest text-steel uppercase">
            <tr>
              <th className="w-12 px-4 py-3">
                <span className="sr-only">Add to pack</span>
              </th>
              <th className="px-4 py-3">Document</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Expiry / review</th>
              <th className="px-4 py-3">Access</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => {
              const canPick = d.access === "public" && !!d.file;
              return (
                <tr key={d.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    {canPick && (
                      <input
                        type="checkbox"
                        aria-label={`Add ${d.name} to tender pack`}
                        checked={picked.includes(d.id)}
                        onChange={() => toggle(d.id)}
                        className="size-5 accent-red"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold">{d.name}</span>
                    {d.issuer && <span className="block text-sm text-steel">{d.issuer}</span>}
                    {d.note && <span className="block text-sm text-steel">{d.note}</span>}
                  </td>
                  <td className="px-4 py-3 text-steel">{d.category}</td>
                  <td className="px-4 py-3 font-mono text-sm">{d.version ?? "—"}</td>
                  <td className="px-4 py-3 text-sm">
                    <Expiry iso={d.expires} />
                  </td>
                  <td className="px-4 py-3">
                    {d.file && d.access === "public" ? (
                      <a href={d.file} className="font-semibold text-navy underline" download>
                        Download PDF
                      </a>
                    ) : (
                      <a href="#request-documents" className={cn("text-sm font-semibold", d.access === "on-request" ? "text-red" : "text-steel")}>
                        {d.access === "on-request" ? "On request" : "Request copy"}
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-mist p-5">
        <p className="text-[15px]">
          <strong>Tender pack:</strong>{" "}
          {downloadable.length === 0
            ? "documents are being uploaded. Request the pack below and we'll email it."
            : `${picked.length} of ${downloadable.length} downloadable documents selected.`}
        </p>
        <div className="flex gap-2">
          {downloadable.length > 0 && (
            <>
              <button type="button" className="btn btn-outline" onClick={() => setPicked(downloadable.map((d) => d.id))}>
                Select all
              </button>
              <button type="button" className="btn btn-navy" disabled={picked.length === 0 || busy} onClick={buildPack}>
                {busy ? "Building ZIP…" : "Download pack (ZIP)"}
              </button>
            </>
          )}
        </div>
        {error && (
          <p role="alert" className="w-full text-sm font-medium text-red">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
