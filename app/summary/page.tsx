import { getSummaryContent } from "@/lib/courses";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";

export default function SummaryPage() {
  const content = getSummaryContent();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#94a3b8' }}>
        <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
        <span>›</span>
        <span style={{ color: '#c9a84c' }}>Download Summary</span>
      </div>

      <div className="max-w-3xl">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
