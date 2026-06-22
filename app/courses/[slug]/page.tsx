import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCourses, getCourse } from "@/lib/courses";
import LessonItem from "@/components/LessonItem";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map(c => ({ slug: c.slug }));
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#94a3b8' }}>
        <Link href="/" className="hover:text-yellow-400 transition-colors">Courses</Link>
        <span>›</span>
        <span style={{ color: '#c9a84c' }}>{course.name}</span>
      </div>

      {/* Course header */}
      <div className="mb-8 pb-6" style={{ borderBottom: '1px solid #2d3d54' }}>
        <h1 className="text-3xl font-bold mb-3" style={{ color: '#c9a84c' }}>
          {course.name}
        </h1>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#243044', color: '#94a3b8' }}>
            📖 {course.lessonCount} lessons
          </span>
          {course.workbookCount > 0 && (
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#243044', color: '#94a3b8' }}>
              📄 {course.workbookCount} workbooks
            </span>
          )}
          {course.videoCount > 0 && (
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#243044', color: '#94a3b8' }}>
              🎬 {course.videoCount} videos
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lessons list - takes 2 columns */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#ffffff' }}>Lessons</h2>
          <div className="space-y-2">
            {course.lessons.map(lesson => (
              <LessonItem key={lesson.slug} lesson={lesson} courseSlug={slug} />
            ))}
          </div>
        </div>

        {/* Right sidebar: workbooks + videos */}
        <div className="space-y-6">
          {/* Workbooks */}
          {course.workbooks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#ffffff' }}>
                  <span>📄</span> Workbooks
                </h2>
                <Link
                  href={`/courses/${slug}/workbooks`}
                  className="text-xs px-2 py-1 rounded transition-colors hover:opacity-80"
                  style={{ backgroundColor: '#2d3d54', color: '#c9a84c' }}>
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {course.workbooks.slice(0, 5).map((wb, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#243044', border: '1px solid #2d3d54' }}>
                    <p className="text-xs leading-snug" style={{ color: '#94a3b8' }}>
                      {wb.filename.replace(/\.docx$/, '').replace(/_[a-z0-9]{12,}$/, '').replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#4a5568' }}>📁 Available locally</p>
                  </div>
                ))}
                {course.workbooks.length > 5 && (
                  <Link
                    href={`/courses/${slug}/workbooks`}
                    className="block text-xs text-center py-2 rounded transition-colors hover:opacity-80"
                    style={{ color: '#c9a84c' }}>
                    +{course.workbooks.length - 5} more →
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Videos */}
          {course.videos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#ffffff' }}>
                <span>🎬</span> Videos
              </h2>
              <div className="space-y-2">
                {course.videos.slice(0, 5).map((vid, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#243044', border: '1px solid #2d3d54' }}>
                    <p className="text-xs leading-snug" style={{ color: '#94a3b8' }}>
                      {vid.filename.replace(/\.mp4$/, '').replace(/[-_]/g, ' ')}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#4a5568' }}>🎬 Available locally</p>
                  </div>
                ))}
                {course.videos.length > 5 && (
                  <p className="text-xs text-center py-1" style={{ color: '#4a5568' }}>
                    +{course.videos.length - 5} more videos available locally
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
