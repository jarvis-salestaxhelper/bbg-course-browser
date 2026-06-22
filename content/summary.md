# BBG Course Download Summary

**Completed:** 2026-06-21 23:25:48 CEST
**Local folder:** `/root/.openclaw/workspace/knowledge/bbg-courses`

## Result

Downloaded and organized the BBG/Circle course reference set that was available from the saved authenticated session and local scrape outputs.

## Counts

- Course/post spaces with manifests: **19**
- Lesson records: **332**
- Virtual/community post records: **102**
- Markdown reference files: **495**
- Raw JSON records: **477**
- Workbook/download links found: **83 total / 82 unique**
- DOCX files on disk: **82**
- PDF files on disk: **0** (none were found in the scraped assets)
- Unique Wistia embeds found by raw scan: **430**
- MP4 files on disk: **431**
- Wistia download results: **430 downloaded, 0 failed**
- Folder size after completion: **50GB**
- Free disk remaining after completion: **66GB**

## Course / Space Inventory

| Course / Space | Slug | Lessons | Posts | Workbook Links | Course Manifest Videos |
|---|---:|---:|---:|---:|---:|
| 8-Figure Entrepreneur | `8-figure-entrepreneur` | 20 | 0 | 6 | 19 |
| Bestseller Launch Plan | `bestseller-launch-plan` | 18 | 0 | 6 | 17 |
| Building Your Revenue Engine | `building-your-revenue-engine` | 51 | 0 | 8 | 50 |
| Captivating Content | `captivating-content` | 31 | 0 | 6 | 30 |
| Conquering Impossible Goals | `conquering-impossible-goals` | 0 | 0 | 0 | 0 |
| Fast Cash Formula Mini-Course | `fast-cash-formula-mini-course` | 7 | 0 | 1 | 7 |
| Finding Your Brand DNA | `finding-your-brand-dna` | 43 | 0 | 7 | 29 |
| Full Keynote Calendar | `full-keynote-calendar` | 28 | 0 | 6 | 27 |
| High-Earner Habits Mini-Course | `high-earner-habits-mini-course` | 0 | 0 | 0 | 0 |
| High Traffic Strategies | `high-traffic-strategies` | 20 | 0 | 6 | 19 |
| Influential Leader | `influential-leader` | 14 | 0 | 7 | 11 |
| Multiplier Mentality | `multiplier-mentality` | 15 | 0 | 7 | 14 |
| New Pro Member Onboarding | `new-pro-member-onboarding` | 15 | 0 | 0 | 6 |
| Podcast Power | `podcast-power` | 19 | 0 | 7 | 18 |
| Pressure Free Persuasion | `pressure-free-persuasion` | 26 | 0 | 7 | 25 |
| Scale Your Sales | `scale-your-sales` | 16 | 0 | 6 | 12 |
| Virtual Training Library | `virtual-training-library` | 0 | 100 | 0 | 0 |
| World Class Presentation Craft | `world-class-presentation-craft` | 9 | 0 | 3 | 1 |
| Courses by Journey | `your-journey` | 0 | 2 | 0 | 0 |

## Downloaded Assets

- Text/content pages were saved as `.md` files inside each course/space folder.
- Raw API/page records were saved as `_raw.json` files for auditability and future parsing.
- Workbooks were downloaded into each course folder under `downloads/`. The scrape found 83 workbook links, but one URL appeared twice, producing 82 unique DOCX files on disk.
- Wistia videos were downloaded as MP4 files under each course folder under `videos/`. They were downloaded at Wistia `iphone-360p` quality where available to fit local storage.
- The earlier original-quality test download remains at `fast-cash-formula-mini-course/videos/Fast Cash Formula Course Introduction.mp4`, so there are 431 MP4 files for 430 unique Wistia hashes.

## Manifests / Logs

- `download-index.json` — current aggregate index for courses, counts, duplicate workbook URL, and final file counts.
- `all-wistia-videos.json` — consolidated manifest of 430 unique Wistia hashes/URLs, source files, titles, and output templates.
- `video-download-log.jsonl` — one JSON line per Wistia download attempt; all 430 are marked `downloaded`.
- Each course/space folder has its own `manifest.json`.

## Failures / Caveats

- No current Wistia video download failures.
- No current workbook download failures identified. The DOCX count is 82 because one workbook URL was duplicated in the source manifests.
- Original-resolution videos were not downloaded across the full library because the sample original was about 1GB by itself; the full original-quality set would likely exceed available disk. The complete local video set is therefore 360p MP4 for reference use.
- No PDFs were found in the scraped asset lists; downloads were DOCX workbooks/transcripts.
- `master-manifest.json` appears older/partial compared with the per-course manifests and the new `download-index.json`; use `download-index.json` as the current summary source.

