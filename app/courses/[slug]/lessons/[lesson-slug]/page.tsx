import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCourses, getCourse, getLessonContent } from "@/lib/courses";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Props {
  params: Promise<{ slug: string; "lesson-slug": string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  const params: { slug: string; "lesson-slug": string }[] = [];
  for (const course of courses) {
    for (const lesson of course.lessons) {
      params.push({ slug: course.slug, "lesson-slug": lesson.slug });
    }
  }
  return params;
}

export default async function LessonPage({ params }: Props) {
  const { slug, "lesson-slug": lessonSlug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const content = getLessonContent(slug, lessonSlug);
  if (!content) notFound();

  const lesson = course.lessons.find(l => l.slug === lessonSlug);
  const lessonIndex = lesson ? lesson.index : 0;
  const prevLesson = course.lessons.find(l => l.index === lessonIndex - 1);
  const nextLesson = course.lessons.find(l => l.index === lessonIndex + 1);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6 flex-wrap" style={{ color: '#94a3b8' }}>
        <Link href="/" className="hover:text-yellow-400 transition-colors">Courses</Link>
        <span>›</span>
        <Link href={`/courses/${slug}`} className="hover:text-yellow-400 transition-colors">{course.name}</Link>
        <span>›</span>
        <span style={{ color: '#c9a84c' }}>
          {lesson ? lesson.title : lessonSlug}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left sidebar: lesson list */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: '#94a3b8' }}>
              {course.name}
            </h3>
            <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {course.lessons.map(l => (
                <Link key={l.slug} href={`/courses/${slug}/lessons/${l.slug}`}>
                  <div className={`flex items-start gap-2 px-2 py-1.5 rounded text-xs cursor-pointer transition-colors ${l.slug === lessonSlug ? 'font-semibold' : ''}`}
                    style={{
                      backgroundColor: l.slug === lessonSlug ? '#2d3d54' : 'transparent',
                      color: l.slug === lessonSlug ? '#c9a84c' : '#94a3b8',
                    }}>
                    <span className="font-mono min-w-5 text-right opacity-50">{String(l.index).padStart(2, '0')}</span>
                    <span className="leading-snug">{l.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Lesson title */}
          {lesson && (
            <div className="mb-6 pb-4" style={{ borderBottom: '1px solid #2d3d54' }}>
              <div className="text-xs font-mono mb-2" style={{ color: '#4a5568' }}>
                Lesson {lesson.index} of {course.lessonCount}
              </div>
              <h1 className="text-2xl font-bold" style={{ color: '#c9a84c' }}>
                {lesson.title}
              </h1>
            </div>
          )}

          {/* Markdown content */}
          <MarkdownRenderer content={content} />

          {/* Prev/Next navigation */}
          <div className="mt-10 pt-6 flex items-center justify-between gap-4" style={{ borderTop: '1px solid #2d3d54' }}>
            {prevLesson ? (
              <Link href={`/courses/${slug}/lessons/${prevLesson.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-80"
                style={{ backgroundColor: '#243044', color: '#94a3b8' }}>
                ← {prevLesson.title.length > 40 ? prevLesson.title.slice(0, 40) + '…' : prevLesson.title}
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link href={`/courses/${slug}/lessons/${nextLesson.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-80 text-right"
                style={{ backgroundColor: '#243044', color: '#94a3b8' }}>
                {nextLesson.title.length > 40 ? nextLesson.title.slice(0, 40) + '…' : nextLesson.title} →
              </Link>
            ) : (
              <Link href={`/courses/${slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-80"
                style={{ backgroundColor: '#2d3d54', color: '#c9a84c' }}>
                ✓ Course Complete — Back to {course.name}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
