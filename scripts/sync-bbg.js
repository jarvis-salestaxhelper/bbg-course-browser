#!/usr/bin/env node
/**
 * sync-bbg.js
 * Syncs BBG course content from the local scraped folder into content/
 * 
 * In Vercel environment, source files won't exist — but content/ is committed to git,
 * so the script exits early if content/courses/index.json already exists.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = '/root/.openclaw/workspace/knowledge/bbg-courses';
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const INDEX_PATH = path.join(CONTENT_DIR, 'courses', 'index.json');

// If already synced (e.g. committed content in Vercel), skip
if (fs.existsSync(INDEX_PATH) && !process.env.FORCE_SYNC) {
  console.log('content/courses/index.json already exists — skipping sync (use FORCE_SYNC=1 to override)');
  process.exit(0);
}

// Check source exists
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`Source dir not found: ${SOURCE_DIR}`);
  console.error('Run this on a machine with BBG course data, or commit content/ to git first.');
  process.exit(1);
}

// Ensure content dirs exist
fs.mkdirSync(path.join(CONTENT_DIR, 'courses'), { recursive: true });

// Course slugs (directories)
const allEntries = fs.readdirSync(SOURCE_DIR);
const courseSlugs = allEntries.filter(entry => {
  const full = path.join(SOURCE_DIR, entry);
  return fs.statSync(full).isDirectory();
});

console.log(`Found ${courseSlugs.length} course directories`);

function prettifySlug(slug) {
  // Special cases
  const overrides = {
    'finding-your-brand-dna': 'Finding Your Brand DNA',
    '8-figure-entrepreneur': '8-Figure Entrepreneur',
    'fast-cash-formula-mini-course': 'Fast Cash Formula Mini-Course',
    'high-earner-habits-mini-course': 'High Earner Habits Mini-Course',
  };
  if (overrides[slug]) return overrides[slug];
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const index = [];
let totalLessons = 0;
let totalWorkbooks = 0;
let totalVideos = 0;

for (const slug of courseSlugs) {
  const courseSource = path.join(SOURCE_DIR, slug);
  const courseDest = path.join(CONTENT_DIR, 'courses', slug);
  const lessonsDest = path.join(courseDest, 'lessons');
  fs.mkdirSync(lessonsDest, { recursive: true });

  // Copy .md lesson files
  const allFiles = fs.readdirSync(courseSource);
  const mdFiles = allFiles.filter(f => f.endsWith('.md'));
  for (const md of mdFiles) {
    fs.copyFileSync(path.join(courseSource, md), path.join(lessonsDest, md));
  }

  // Copy manifest.json
  const manifestSrc = path.join(courseSource, 'manifest.json');
  let manifest = null;
  if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, path.join(courseDest, 'manifest.json'));
    manifest = JSON.parse(fs.readFileSync(manifestSrc, 'utf-8'));
  }

  // Count workbooks from downloads/
  const downloadsDir = path.join(courseSource, 'downloads');
  let workbookFiles = [];
  if (fs.existsSync(downloadsDir)) {
    workbookFiles = fs.readdirSync(downloadsDir).filter(f => f.endsWith('.docx') || f.endsWith('.pdf'));
  }

  // Count videos from videos/
  const videosDir = path.join(courseSource, 'videos');
  let videoFiles = [];
  if (fs.existsSync(videosDir)) {
    videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));
  }

  const lessonCount = mdFiles.length;
  const workbookCount = workbookFiles.length;
  const videoCount = videoFiles.length;

  totalLessons += lessonCount;
  totalWorkbooks += workbookCount;
  totalVideos += videoCount;

  const courseName = manifest ? manifest.course_name : prettifySlug(slug);

  // Build lesson list from manifest if available
  let lessons = [];
  if (manifest && manifest.lessons) {
    lessons = manifest.lessons.map(l => ({
      index: l.index,
      title: l.title,
      file: l.file,
      slug: l.file ? l.file.replace('.md', '') : `lesson-${l.index}`,
      downloadCount: l.downloads ? l.downloads.length : 0,
      videoCount: l.videos ? l.videos.length : 0,
    }));
  } else {
    lessons = mdFiles.sort().map((f, i) => ({
      index: i + 1,
      title: f.replace('.md', '').replace(/^\d+-/, '').replace(/-/g, ' '),
      file: f,
      slug: f.replace('.md', ''),
      downloadCount: 0,
      videoCount: 0,
    }));
  }

  index.push({
    slug,
    name: courseName,
    lessonCount,
    workbookCount,
    videoCount,
    lessons,
    workbooks: workbookFiles.map(f => ({ filename: f })),
    videos: videoFiles.map(f => ({ filename: f })),
  });

  console.log(`  ✓ ${slug}: ${lessonCount} lessons, ${workbookCount} workbooks, ${videoCount} videos`);
}

// Write index.json
fs.writeFileSync(
  path.join(CONTENT_DIR, 'courses', 'index.json'),
  JSON.stringify(index, null, 2)
);
console.log(`\nWrote content/courses/index.json with ${index.length} courses`);

// Copy download-summary.md
const summarySrc = path.join(SOURCE_DIR, 'download-summary.md');
if (fs.existsSync(summarySrc)) {
  fs.copyFileSync(summarySrc, path.join(CONTENT_DIR, 'summary.md'));
  console.log('Copied download-summary.md → content/summary.md');
}

console.log(`\nTotals: ${totalLessons} lessons, ${totalWorkbooks} workbooks, ${totalVideos} videos`);
console.log('Sync complete!');
