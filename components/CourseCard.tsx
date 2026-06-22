"use client";

import Link from "next/link";
import { CourseMeta } from "@/lib/courses";

interface Props {
  course: CourseMeta;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      <div
        className="rounded-xl p-5 h-full cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-yellow-500/60 hover:shadow-lg"
        style={{
          backgroundColor: '#243044',
          border: '1px solid #2d3d54',
        }}>
        {/* Course icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-lg font-bold"
          style={{ backgroundColor: '#1a2332', color: '#c9a84c' }}>
          {course.name.charAt(0)}
        </div>
        <h2 className="font-semibold text-base mb-3 leading-tight" style={{ color: '#ffffff' }}>
          {course.name}
        </h2>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: '#1a2332', color: '#94a3b8' }}>
            📖 {course.lessonCount} lessons
          </span>
          {course.workbookCount > 0 && (
            <span
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: '#1a2332', color: '#94a3b8' }}>
              📄 {course.workbookCount} workbooks
            </span>
          )}
          {course.videoCount > 0 && (
            <span
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: '#1a2332', color: '#94a3b8' }}>
              🎬 {course.videoCount} videos
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
