import { getAllCourses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export default function HomePage() {
  const courses = getAllCourses();

  const totalLessons = courses.reduce((s, c) => s + c.lessonCount, 0);
  const totalWorkbooks = courses.reduce((s, c) => s + c.workbookCount, 0);
  const totalVideos = courses.reduce((s, c) => s + c.videoCount, 0);

  return (
    <div>
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#c9a84c' }}>
          Brand Builders Group
        </h1>
        <p className="text-xl mb-6" style={{ color: '#94a3b8' }}>
          Your complete course library — {courses.length} courses, ready to browse.
        </p>
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Courses', value: courses.length },
            { label: 'Lessons', value: totalLessons.toLocaleString() },
            { label: 'Workbooks', value: totalWorkbooks.toLocaleString() },
            { label: 'Videos', value: totalVideos.toLocaleString() },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: '#243044', border: '1px solid #2d3d54' }}>
              <div className="text-3xl font-bold" style={{ color: '#c9a84c' }}>{stat.value}</div>
              <div className="text-sm mt-1" style={{ color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map(course => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
