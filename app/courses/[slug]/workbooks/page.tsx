import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCourses, getCourse, prettifyWorkbookName } from "@/lib/courses";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.filter(c => c.workbookCount > 0).map(c => ({ slug: c.slug }));
}

export default async function WorkbooksPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#94a3b8' }}>
        <Link href="/" className="hover:text-yellow-400 transition-colors">Courses</Link>
        <span>›</span>
        <Link href={`/courses/${slug}`} className="hover:text-yellow-400 transition-colors">{course.name}</Link>
        <span>›</span>
        <span style={{ color: '#c9a84c' }}>Workbooks</span>
      </div>

      <h1 className="text-3xl font-bold mb-2" style={{ color: '#c9a84c' }}>
        {course.name}
      </h1>
      <p className="mb-8" style={{ color: '#94a3b8' }}>
        {course.workbooks.length} workbook{course.workbooks.length !== 1 ? 's' : ''} available locally
      </p>

      <div className="space-y-3 max-w-2xl">
        {course.workbooks.map((wb, i) => {
          const prettyName = prettifyWorkbookName(wb.filename);
          const extension = wb.filename.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX";
          return (
            <div key={i}
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ backgroundColor: '#243044', border: '1px solid #2d3d54' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: '#1a2332' }}>
                📄
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-snug" style={{ color: '#e2e8f0' }}>
                  {prettyName}
                </p>
                <p className="text-xs mt-1" style={{ color: '#4a5568' }}>
                  {wb.filename}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded whitespace-nowrap" style={{ backgroundColor: '#1a2332', color: '#c9a84c' }}>
                {extension}
              </span>
            </div>
          );
        })}
      </div>

      {course.workbooks.length === 0 && (
        <div className="text-center py-16" style={{ color: '#4a5568' }}>
          <p className="text-5xl mb-4">📄</p>
          <p>No workbooks found for this course.</p>
        </div>
      )}
    </div>
  );
}
