export function EcosystemNav() {
  return (
    <nav
      aria-label="Site navigation"
      className="border-b border-[#E2E2DF] bg-[#F8F8F7]"
    >
      <div className="mx-auto max-w-[1200px] px-6 min-h-14 flex flex-wrap items-center gap-4 py-3">
        <span className="font-semibold">HallmarksExplorer</span>
        <span className="text-sm text-[#596170]">Research reference</span>
        <a
          href="https://pubmed.ncbi.nlm.nih.gov/36599349/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm text-indigo-800 underline underline-offset-2"
        >
          Read the framework
        </a>
      </div>
    </nav>
  );
}
