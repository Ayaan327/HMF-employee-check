import AppKit
import AVFoundation

let folder = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let footage = folder.appendingPathComponent(UUID().uuidString + ".mp4")
let scenes: [(String, Int, String, String)] = [
    ("today", 29, "Employee · Today", "Start on Today. Choose your working location and select Check in. When you finish, return here to check out. The portal flags an open check-in that needs attention. The separate attendance form is for updating your status or reporting an absence."),
    ("hours", 25, "Employee · Hours", "Open Hours to compare recorded and scheduled time. Change the period to review a different date range. If a check-in or checkout is missing or wrong, use the correction action on that row and explain what needs to change."),
    ("schedule", 17, "Employee · Schedule", "Schedule shows the work pattern assigned to you. Change the date to see the schedule that applies on that day. Working days, shift times and breaks depend on the settings saved for your profile."),
    ("history", 16, "Employee · Attendance history", "History shows your previous attendance submissions, their status and when the record was updated. Use this page to check how a previous day was recorded."),
    ("profile", 16, "Employee · My profile", "My profile shows your employment and office details. Ask your manager or HR about incorrect information. Your work schedule and leave allowance depend on the information authorized staff maintain here."),
    ("leave", 24, "Employee · Leave and holidays", "Leave brings together your allowance, carry-forward, approved leave and remaining balance. When the office has configured its holiday calendar, public holidays are shown here. A blank balance means the setup information needed to calculate it is incomplete."),
    ("request", 22, "Employee · Request leave", "Select Request leave, enter the start and end dates, and submit. The request appears under My requests while it awaits a decision. Use Cancel request if your plans change while it is still pending."),
    ("admin", 30, "Admin · Team attendance", "Now we are in the management workspace. Attendance shows records for the people you can access. Use the date and office filters to focus the view. Open an employee record to see its details, including relevant attendance and activity history."),
    ("people", 23, "Admin · People", "People is the employee directory. Search for an employee or narrow the list by office and status. Authorized staff can open or edit a profile, assign a work schedule and manage account permissions."),
    ("teamhours", 24, "Admin · Team hours", "Team hours brings scheduled and recorded hours into the same view. Use the filters to find missing entries, late submissions or overtime. Review pending corrections and record a decision so the change can be tracked."),
    ("teamleave", 20, "Admin · Leave review", "The Leave review queue shows pending requests within your scope. Open a request to approve or decline it and enter a decision note. Employees can see the resulting status in their own Leave view."),
    ("settings", 21, "Admin · Settings", "Settings is where authorized administrators maintain offices, departments, attendance options and schedule templates. Agree on working-hour rules before applying them. The demo uses fictional records and example settings."),
    ("reports", 33, "Admin · CSV reports", "Open Reports, choose a start and end date, and download attendance submissions or team hours. Each download uses your team access. The attendance report includes submissions and omits private notes. This concludes the employee and admin walkthrough of HMF Attendance.")
]

let width = 1280, height = 800, fps: Int32 = 2
let writer = try AVAssetWriter(outputURL: footage, fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width, AVVideoHeightKey: height
])
let frames = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
    kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height
])
writer.add(input)
guard writer.startWriting() else { throw writer.error! }
writer.startSession(atSourceTime: .zero)

var frame: Int64 = 0
for (name, seconds, title, _) in scenes {
    let picture = NSImage(contentsOf: folder.appendingPathComponent(name + ".jpg"))!
    var buffer: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, frames.pixelBufferPool!, &buffer)
    let pixels = buffer!
    CVPixelBufferLockBaseAddress(pixels, [])
    let context = CGContext(data: CVPixelBufferGetBaseAddress(pixels), width: width, height: height,
        bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(pixels),
        space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(cgContext: context, flipped: false)
    NSColor(srgbRed: 0.06, green: 0.17, blue: 0.27, alpha: 1).setFill()
    NSBezierPath(rect: NSRect(x: 0, y: 0, width: width, height: height)).fill()
    picture.draw(in: NSRect(x: 0, y: 80, width: width, height: 720))
    (title as NSString).draw(at: NSPoint(x: 32, y: 25), withAttributes: [
        .font: NSFont.systemFont(ofSize: 25, weight: .semibold), .foregroundColor: NSColor.white
    ])
    ("HMF ATTENDANCE  /  DEMO" as NSString).draw(at: NSPoint(x: 980, y: 29), withAttributes: [
        .font: NSFont.systemFont(ofSize: 16, weight: .medium), .foregroundColor: NSColor.white
    ])
    NSGraphicsContext.restoreGraphicsState()
    CVPixelBufferUnlockBaseAddress(pixels, [])
    for _ in 0..<(seconds * Int(fps)) {
        while !input.isReadyForMoreMediaData && writer.status == .writing { Thread.sleep(forTimeInterval: 0.01) }
        guard frames.append(pixels, withPresentationTime: CMTime(value: frame, timescale: fps)) else { throw writer.error! }
        frame += 1
    }
}
writer.endSession(atSourceTime: CMTime(value: frame, timescale: fps))
input.markAsFinished()
await writer.finishWriting()
guard writer.status == .completed else { throw writer.error! }

let composition = AVMutableComposition()
let source = AVURLAsset(url: footage)
let duration = try await source.load(.duration)
let video = try await source.loadTracks(withMediaType: .video)[0]
let pictureTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
try pictureTrack.insertTimeRange(CMTimeRange(start: .zero, duration: duration), of: video, at: .zero)
let voiceTrack = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
var offset: Int64 = 0
for (name, seconds, _, narration) in scenes {
    let audio = folder.appendingPathComponent(name + ".aiff")
    let say = Process()
    say.executableURL = URL(fileURLWithPath: "/usr/bin/say")
    say.arguments = ["-v", "Samantha", "-r", "155", "-o", audio.path, narration]
    try say.run()
    say.waitUntilExit()
    guard say.terminationStatus == 0 else { fatalError("Could not generate narration for \(name)") }
    let asset = AVURLAsset(url: audio)
    let length = try await asset.load(.duration)
    let track = try await asset.loadTracks(withMediaType: .audio)[0]
    let at = CMTime(value: offset + 1, timescale: 1)
    let available = CMTime(value: Int64(seconds - 1), timescale: 1)
    try voiceTrack.insertTimeRange(CMTimeRange(start: .zero, duration: min(length, available)), of: track, at: at)
    offset += Int64(seconds)
}
let export = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality)!
export.shouldOptimizeForNetworkUse = true
try await export.export(to: output, as: .mp4)
let result = AVURLAsset(url: output)
print("Exported \(try await result.load(.duration).seconds) seconds with \(try await result.loadTracks(withMediaType: .audio).count) audio track.")
