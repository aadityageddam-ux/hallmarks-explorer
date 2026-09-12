"use client";
import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Hallmark } from "@/types/hallmark";
import { CitationItem } from "./CitationItem";

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <span className="mt-2 flex flex-wrap gap-3 text-sm">
      {ids.map((id) => (
        <a
          key={id}
          href={"https://pubmed.ncbi.nlm.nih.gov/" + id + "/"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-800 underline underline-offset-2"
        >
          Source: PMID {id}
        </a>
      ))}
    </span>
  );
}
interface Props {
  hallmark: Hallmark;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  prevHallmark: Hallmark | null;
  nextHallmark: Hallmark | null;
}
export function HallmarkPanel({
  hallmark,
  onClose,
  onNavigate,
  prevHallmark,
  nextHallmark,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);
  useEffect(() => {
    title.current?.focus();
    dialog.current?.querySelector("[data-panel-scroll]")?.scrollTo(0, 0);
  }, [hallmark.id]);
  return (
    <dialog
      ref={dialog}
      aria-labelledby="hallmark-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === title.current)
        ) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 ml-auto mr-0 my-0 h-dvh max-h-dvh w-full max-w-[760px] p-0 border-0 bg-transparent text-[#1A1A1A] backdrop:bg-black/40"
    >
      <div className="flex h-full flex-col bg-white shadow-2xl">
        <header className="shrink-0 border-b border-[#E2E2DF] p-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[#596170]">
                {hallmark.number} / 12 · {hallmark.tierLabel}
              </p>
              <h2
                id="hallmark-title"
                data-testid="panel-title"
                ref={title}
                tabIndex={-1}
                className="mt-2 font-serif text-3xl font-bold focus:outline-none"
              >
                {hallmark.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="rounded-lg p-3 hover:bg-gray-100 focus-visible:outline-2"
            >
              <X size={22} />
            </button>
          </div>
        </header>
        <div
          data-panel-scroll
          className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8"
        >
          <section>
            <h3 className="font-semibold mb-2">What it is</h3>
            <p className="text-base leading-relaxed">{hallmark.mechanism}</p>
            <SourceLinks ids={hallmark.mechanismSourceIds} />
          </section>
          <section>
            <h3 className="font-semibold mb-3">What researchers measured</h3>
            {hallmark.measurements.map((m) => (
              <article
                key={m.name}
                className="rounded-lg border border-[#E2E2DF] bg-[#F8F8F7] p-4"
              >
                <p className="text-sm font-medium text-indigo-800">{m.kind}</p>
                <h4 className="font-semibold mt-1">{m.name}</h4>
                <p className="mt-2 leading-relaxed">{m.description}</p>
                <p className="mt-2 text-[#596170] leading-relaxed">
                  {m.limitation}
                </p>
                <SourceLinks ids={m.sourceIds} />
              </article>
            ))}
          </section>
          <section>
            <h3 className="font-semibold mb-3">Selected research evidence</h3>
            <p className="text-sm text-[#596170] mb-4">
              Examples of what has been tested, not treatment recommendations or
              a complete literature review.
            </p>
            <div className="space-y-4">
              {hallmark.studies.map((s) => (
                <article
                  key={s.title}
                  className="rounded-lg border border-[#E2E2DF] p-4"
                >
                  <p className="text-sm font-medium text-indigo-800">
                    {s.evidence}
                  </p>
                  <h4 className="font-semibold mt-1">{s.title}</h4>
                  <p className="text-sm text-[#596170] mt-1">{s.population}</p>
                  <p className="mt-3 leading-relaxed">{s.finding}</p>
                  <p className="mt-3 leading-relaxed text-[#596170]">
                    <strong className="font-medium text-[#1A1A1A]">
                      What this does not establish:{" "}
                    </strong>
                    {s.limitation}
                  </p>
                  <SourceLinks ids={s.sourceIds} />
                </article>
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-semibold mb-2">Open question</h3>
            <p className="leading-relaxed text-[#596170]">
              How far does this evidence generalize beyond the specific tissue,
              population and outcome studied?
            </p>
            <p className="mt-2 leading-relaxed">{hallmark.uncertainty}</p>
          </section>
          <section>
            <h3 className="font-semibold mb-3">Sources</h3>
            <div className="space-y-4">
              {hallmark.citations.map((c) => (
                <CitationItem key={c.pmid} citation={c} />
              ))}
            </div>
          </section>
        </div>
        <footer className="shrink-0 border-t border-[#E2E2DF] p-4 flex justify-between gap-3">
          <button
            onClick={() => onNavigate("prev")}
            disabled={!prevHallmark}
            aria-label={"Previous: " + prevHallmark?.name}
            className="flex items-center gap-2 min-h-11 text-sm"
          >
            <ChevronLeft size={18} />
            <span>{prevHallmark?.name}</span>
          </button>
          <button
            onClick={() => onNavigate("next")}
            disabled={!nextHallmark}
            aria-label={"Next: " + nextHallmark?.name}
            className="flex items-center gap-2 min-h-11 text-sm text-right"
          >
            <span>{nextHallmark?.name}</span>
            <ChevronRight size={18} />
          </button>
        </footer>
      </div>
    </dialog>
  );
}
