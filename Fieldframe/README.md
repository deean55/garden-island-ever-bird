# Fieldframe

Kotlin Multiplatform app for professional photo documentation — property, vehicle, construction, and inspection records.

Shared Kotlin domain, Room + CameraX + PdfDocument on Android, Compose Multiplatform UI on Android and iOS.

## What it does

- Projects with twelve standard angles, custom sections, and before/after sets
- Camera capture (CameraX on Android, system camera on iOS)
- Android Photo Picker / iOS photo library
- Autosaved names, descriptions, rotation, reorder, and moves
- Numbered PDF reports with cover page (Android `PdfDocument`)
- Save / open / share PDF (Storage Access Framework + FileProvider + Sharesheet on Android)
- Export / import `.photodoc` packages

## Open in Android Studio

1. Android Studio Ladybug or newer (Kotlin 2.1, AGP 8.7).
2. **File → Open** this `Fieldframe` folder.
3. Let Gradle sync. Install the Android SDK (compileSdk 35) if prompted.
4. Run the **composeApp** configuration on a device or emulator.

```
./gradlew :composeApp:assembleDebug
```

The debug APK is written to `composeApp/build/outputs/apk/debug/`.

## iOS

On a Mac with Xcode 16+:

```
./gradlew :composeApp:embedAndSignAppleFrameworkForXcode
```

Open `iosApp/iosApp.xcodeproj` (or create an Xcode project that links the `ComposeApp` framework produced by Gradle) and run on a simulator or device. Camera and photo library usage strings are in `iosApp/iosApp/Info.plist`.

## Architecture

```
shared/        common models, repository, PDF spec, .photodoc zip
  androidMain  Room, file store, PdfDocument, CameraX-ready image ops
  iosMain      document-directory store, JPEG PDF writer
composeApp/    Compose Multiplatform UI, Navigation, ViewModels
  androidMain  CameraX, Photo Picker, SAF, FileProvider, PdfRenderer
  iosMain      PHPicker, UIImagePicker, PDFKit, share sheet
```

MVVM + repository. All project data stays on device.
