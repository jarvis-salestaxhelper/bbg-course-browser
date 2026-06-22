"use client";

import Link from "next/link";
import { LessonMeta } from "@/lib/courses";

interface Props {
  lesson: LessonMeta;
  courseSlug: string;
}

export default function LessonItem({ lesson, courseSlug }: Props) {
  return (
    <Link href={`/courses/${courseSlug}/lessons/${lesson.slug}`} className="block">
      <div
        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 hover:translate-x-1 hover:border-yellow-500/30"
        style={{ backgroundColor: '#243044', border: '1px solid #2d3d54' }}>
        <span
          className="text-xs font-mono mt-0.5 min-w-6 text-right"
          style={{ color: '#4a5568' }}>
          {String(lesson.index).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <span className="text-sm" style={{ color: '#e2e8f0' }}>
            {lesson.title}
          </span>
          {(lesson.downloadCount > 0 || lesson.videoCount > 0) && (
            <div className="flex gap-2 mt-1">
              {lesson.downloadCount > 0 && (
                <span className="text-xs" style={{ color: '#4a5568' }}>📄 {lesson.downloadCount}</span>
              )}
              {lesson.videoCount > 0 && (
                <span className="text-xs" style={{ color: '#4a5568' }}>🎬 {lesson.videoCount}</span>
              )}
            </div>
          )}
        </div>
        <span style={{ color: '#c9a84c' }} className="text-xs mt-0.5">›</span>
      </div>
    </Link>
  );
}
