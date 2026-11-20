# Teams and Fluent case-study QA

Audited locally on 20 November 2026 at `http://localhost:3000/teams` and `/fluent`. Changes are saved in the source project and the running localhost preview. Nothing was deployed or pushed.

## Confirmed issues and fixes

| Severity | Reproduction | Expected / actual before fix | Fix and verification |
| --- | --- | --- | --- |
| High | Enter Present Mode and navigate to a Teams image slide before its lazy image loads. | A stable media frame / several frames collapsed to about 2px. | Reserve image and video aspect ratios before loading. All 31 media frames retained their dimensions before and after loading. |
| High | Teams Present Mode, 375×667, Scope. | Readable copy and usable video / copy left about 3px for the video. | When copy leaves less than 120px for media, use consecutive copy and media views. Content order and text sizes are retained. Passed the full viewport matrix. |
| High | Present Mode at a constrained 600×400 CSS viewport, Hero or About. | All content accessible / content extended outside the visible page. | Keep fitting content within the available width and height; use internal scrolling when natural-height content cannot fit. The hero keeps its full available width in that fallback, including its overlapping previews. Verified scrolling reaches the remaining content without horizontal clipping. |
| Medium | Navigate through slides containing videos. | Only relevant video plays / previous effect cleanup restarted all videos on slide changes. Regular pages also eagerly loaded every video. | Videos load near the viewport or when their slide becomes active, and pause when inactive. Initial source loading fell from all 8 Teams / 11 Fluent videos to the visible hero. Verified advancing playback time on every video, hidden-video pause, rapid navigation, and repeated sessions. |
| Medium | Abort an image/video request, reject autoplay, or delay video loading. | A useful recovery action / empty frames or indefinitely loading hero UI. | Added image/video retry, a user-triggered Play action, and a recovery message after 15 seconds of waiting. Tested successful recovery in both normal and presentation views. |
| Medium | Trigger image failure in a small Teams hero preview. | Retry remains within its own preview / the new fallback initially positioned against the whole preview row and clipped its button. | Give each preview its own positioning context and compact fallback layout. Retested at 375×667; retry decodes the image successfully. |
| Low | Load the Teams hero with a fresh cache. | Above-the-fold previews should load promptly / Next.js reported lazy-loaded previews as the largest contentful paint. | Mark hero previews eager; the final console check has no errors or warnings. |
| Low | Inspect Fluent Process and Implementation heading IDs. | Unique accessible section targets / both used the same ID. | Assigned Process its own ID without changing copy. |

Presentation teardown also cancels pending measurements and ignores late font-ready callbacks. Eight enter/navigate/exit cycles per route left listener and observer counts unchanged. Four additional cycles per route included repeated resizing and confirmed style, inert-state, scroll-position, and focus restoration.

## Coverage actually performed

Both scrolling and Present Mode were inspected at:

- 1920×1080 and 1440×900
- 1366×768 and 1280×720
- 1024×768 and 768×1024
- 390×844 and 375×667
- 844×390

Every presentation view was checked for viewport containment, collapsed media, and hidden playback. Additional normal-page element-bound checks and presentation control-overlap checks passed at all nine sizes. A continuous sequence of resizes in 16px width increments from 360 to 1920, with changing heights, passed; further resize cycles exercised dense content and slide-state transitions. The extra responsive suite completed 534 checks without findings.

Real Chromium tab zoom was set to 125% and 200%, verified using the browser's zoom API and page dimensions. At a 1366×768 browser viewport this produced 1093×614 and 683×384 CSS viewports. Every presentation view remained accessible in both studies. An additional 600×400 test exercised the scrolling fallback.

Verified interactions:

- Enter, Exit, Restart button and R; ArrowLeft/Right, Home/End, Page navigation handling; first/last boundaries.
- Escape with editable content and video focus; button-focus exit; restored scroll position and focus on Present Mode.
- Side-zone mouse clicks away from the carets, hover reveal, keyboard activation, and touch navigation without hover.
- Hidden sections are inert and videos are paused; active video time advances.
- About and Outcome centered against the viewport, common role/media widths, standard 12px About overline, unchanged 16px desktop body copy.
- Hero remains unscaled with its unique preview layout; Fluent Problem fills its frame proportionally.
- Next-project links hidden only in presentation; final “Any questions?” centered on both axes.

Loading checks:

- Direct route visits, fresh and warm reloads, disabled cache.
- 150ms latency, 200,000 bytes/sec download and 100,000 bytes/sec upload, including rapid navigation and resizing before media finishes.
- Every image decoded and every one of the 19 videos played, in both normal and presentation views.
- All 19 videos inspected with ffprobe: H.264 video in MP4 containers. Observed media responses used image/png, image/webp, or video/mp4; partial video responses returned HTTP 206. No unexpected request failures or browser exceptions were recorded during the loading suite.
- Representative aborted images/videos, delayed video responses exceeding 15 seconds, blocked autoplay and recovery. No poster assets were added; reserved frames and loading/recovery UI cover the waiting states.
- Delayed font requests and media loading did not change reserved media-frame heights. Presentation fitting is recalculated when fonts or metadata arrive.

## Verification and reusable tests

Passed:

- Production build (`npm run build`), using an isolated local build directory so the development server was not interrupted.
- TypeScript (`tsc --noEmit`).
- ESLint on all changed TSX files.
- Git whitespace check.
- `scripts/qa-case-studies.cjs`: 80 successful checks, no failures or browser exceptions.
- `scripts/qa-case-study-viewports.cjs`: no viewport findings or browser exceptions.
- Loading/recovery suite: all 9 checks passed; additional phone-size Present Mode video recovery passed for both routes.

Run the saved regression scripts against an already-running local server:

```sh
node scripts/qa-case-studies.cjs
node scripts/qa-case-study-viewports.cjs
```

They require Playwright and a Chromium installation. If these are supplied outside this project's dependencies, set `PLAYWRIGHT_MODULE` to the Playwright package path and `PLAYWRIGHT_BROWSER_PATH` to the browser executable. Optional settings: `QA_BASE_URL`, `QA_CASE_PASSWORD`, and `QA_ARTIFACT_DIR`. The default target is localhost:3000; the tests use the existing local case-study password when no override is supplied. They do not publish changes. Reports default to the system temporary directory under `case-study-qa`.

The additional audit evidence—including network simulations, real-zoom results, lifecycle counts, screenshots, and format inspection—is in `/private/tmp/portfolio-qa`. Authentication storage in that temporary directory is not part of the repository.

## Limits

No unresolved failure remains in the checks above. Testing used local Chromium and the in-app browser, with simulated mobile viewports/touch. Physical iOS/Android devices, Safari, Firefox, screen-reader software, real mobile browser chrome, and long-duration endurance testing were not exercised. Throttling represents selected adverse conditions, not every possible connection failure. Local development-server timing is not a production performance benchmark. The live website was not changed or audited as part of this task.
