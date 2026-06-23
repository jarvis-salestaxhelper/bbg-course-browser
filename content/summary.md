# BBG Course Browser Summary

**Last reconciled:** 2026-06-23 CEST  
**Local folder:** `/root/.openclaw/workspace/knowledge/bbg-courses`  
**Source of truth:** OneDrive vs local audit, `audits/bbg-onedrive-audit-2026-06-23.md`

## Result

Downloaded, organized, and reconciled the BBG/Circle course reference set. The final audit confirmed that local storage and OneDrive are in full sync.

## Counts

- Course/post spaces: **19**
- Browser lesson/reference pages: **494**
- Markdown reference files: **495**
- Raw JSON records: **477**
- Videos: **431 OneDrive / 431 local**
- Workbooks: **87 OneDrive / 87 local**
- Missing from local: **0 videos, 0 workbooks**
- Missing from OneDrive: **0 videos, 0 workbooks**
- Folder size after completion: **50GB**
- Free disk remaining after completion: **66GB**

## Course / Space Inventory

| Course / Space | Browser Pages | Workbooks | Videos |
|---|---:|---:|---:|
| 8-Figure Entrepreneur | 21 | 6 | 18 |
| Bestseller Launch Plan | 19 | 6 | 17 |
| Building Your Revenue Engine | 52 | 8 | 49 |
| Captivating Content | 32 | 6 | 30 |
| Conquering Impossible Goals | 23 | 1 | 19 |
| Fast Cash Formula Mini-Course | 8 | 1 | 8 |
| Finding Your Brand DNA | 44 | 6 | 42 |
| Full Keynote Calendar | 28 | 6 | 27 |
| High-Earner Habits Mini-Course | 3 | 0 | 2 |
| High Traffic Strategies | 21 | 6 | 19 |
| Influential Leader | 15 | 7 | 13 |
| Multiplier Mentality | 16 | 7 | 14 |
| New Pro Member Onboarding | 17 | 0 | 14 |
| Podcast Power | 20 | 7 | 18 |
| Pressure Free Persuasion | 27 | 7 | 24 |
| Scale Your Sales | 17 | 6 | 15 |
| Virtual Training Library | 101 | 0 | 77 |
| World Class Presentation Craft | 27 | 7 | 25 |
| Courses by Journey | 3 | 0 | 0 |

## Downloaded Assets

- Text/content pages were saved as `.md` files inside each course/space folder.
- Raw API/page records were saved as `_raw.json` files for auditability and future parsing.
- Workbooks were downloaded into each course folder under `downloads/` and include both DOCX and PDF files.
- Wistia videos were downloaded as MP4 files under each course folder under `videos/`.
- Videos were kept as reference copies to fit local storage.

## Manifests / Logs

- `download-index.json` — current aggregate index for courses, counts, duplicate workbook URL, and final file counts.
- `all-wistia-videos.json` — consolidated manifest of 430 unique Wistia hashes/URLs, source files, titles, and output templates.
- `video-download-log.jsonl` — one JSON line per Wistia download attempt; all 430 are marked `downloaded`.
- Each course/space folder has its own `manifest.json`.

## Failures / Caveats

- No current Wistia video download failures.
- No current workbook download failures identified.
- Original-resolution videos were not downloaded across the full library because the sample original was about 1GB by itself; the full original-quality set likely exceeds local storage capacity.
- `your-journey` remains a placeholder with no videos or workbooks on both local and OneDrive.
- `master-manifest.json` appears older/partial compared with the per-course manifests and the new `download-index.json`; use `download-index.json` as the current summary source.
