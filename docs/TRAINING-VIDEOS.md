# Training videos

Two short, captioned screen recordings of the real app with **fictional demo data**:

| Video | Length | Covers |
| --- | --- | --- |
| `staff.mp4` | ~1 min | Signing in with the emailed code, check in / check out, reporting remote work or absence, Hours and corrections, requesting leave, History |
| `managers.mp4` | ~1 min | Attendance across offices, an employee's details, approving leave, approved team leave, team Hours and correction requests, People, Reports |

Use them to onboard testers before the trial and as a backup in the pitch if the live demo is not available.

## Re-recording after the app changes

```bash
cd preview && npm install && npm run build
(cd dist && python3 -m http.server 4173 --bind 127.0.0.1 &)
cd .. && node preview/record-training-videos.mjs http://127.0.0.1:4173/ outputs/videos
```

Needs `ffmpeg` on the computer. Output goes to `outputs/videos/` (not committed). The script sets up
the demo data off camera (calendars, allowances, schedules, a colleague's leave and correction
request), fixes the on-screen clock to a normal working day, and adds the captions and highlights.

## Adding a voice-over (optional)

The captions carry the explanation, so the videos work without sound. To narrate, import the MP4
into iMovie / Clipchamp, record over it, and read the captions in order. The wording is in
`preview/record-training-videos.mjs` (each `caption(...)` line).
