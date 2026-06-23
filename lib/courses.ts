import fs from 'fs';
import path from 'path';

export interface LessonMeta {
  index: number;
  title: string;
  file: string;
  slug: string;
  downloadCount: number;
  videoCount: number;
}

export interface WorkbookMeta {
  filename: string;
}

export interface VideoMeta {
  filename: string;
}

export interface CourseMeta {
  slug: string;
  name: string;
  lessonCount: number;
  workbookCount: number;
  videoCount: number;
  lessons: LessonMeta[];
  workbooks: WorkbookMeta[];
  videos: VideoMeta[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllCourses(): CourseMeta[] {
  const indexPath = path.join(CONTENT_DIR, 'courses', 'index.json');
  const raw = fs.readFileSync(indexPath, 'utf-8');
  return JSON.parse(raw);
}

export function getCourse(slug: string): CourseMeta | null {
  const courses = getAllCourses();
  return courses.find(c => c.slug === slug) || null;
}

export function getLessonContent(courseSlug: string, lessonSlug: string): string | null {
  const lessonPath = path.join(CONTENT_DIR, 'courses', courseSlug, 'lessons', `${lessonSlug}.md`);
  if (!fs.existsSync(lessonPath)) return null;
  return fs.readFileSync(lessonPath, 'utf-8');
}

export function getSummaryContent(): string {
  const summaryPath = path.join(CONTENT_DIR, 'summary.md');
  if (!fs.existsSync(summaryPath)) return '# Summary\n\nNo summary available.';
  return fs.readFileSync(summaryPath, 'utf-8');
}

export function prettifyWorkbookName(filename: string): string {
  return filename
    .replace(/\.(docx|pdf)$/i, '')
    .replace(/_[a-z0-9]{12,}$/, '') // Remove hash suffix
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function prettifyVideoName(filename: string): string {
  return filename
    .replace(/\.mp4$/i, '')
    .replace(/__[a-z0-9]+$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
