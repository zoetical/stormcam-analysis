import Vision
import Foundation
import AppKit

let arguments = CommandLine.arguments
if arguments.count < 2 {
    print("Usage: swift ocr.swift <image_directory>")
    exit(1)
}

let dirPath = arguments[1]
let fm = FileManager.default

do {
    let files = try fm.contentsOfDirectory(atPath: dirPath)
    let pngFiles = files.filter { $0.hasSuffix(".PNG") || $0.hasSuffix(".png") }.sorted()
    
    for file in pngFiles {
        let imagePath = dirPath + "/" + file
        guard let image = NSImage(contentsOfFile: imagePath),
              let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
            continue
        }
        
        print("---")
        print("File: \(file)")
        print("---")
        
        let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        let request = VNRecognizeTextRequest { (request, error) in
            guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
            for observation in observations {
                guard let topCandidate = observation.topCandidates(1).first else { continue }
                print(topCandidate.string)
            }
        }
        request.recognitionLanguages = ["zh-Hans", "zh-Hant", "en-US"]
        
        try requestHandler.perform([request])
        print("\n")
    }
} catch {
    print("Error: \(error)")
}
