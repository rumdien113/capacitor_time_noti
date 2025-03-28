# capacitor_time_noti
Setting:
  Node -v23.9.0
  Java openjdk-17
  Ide Neovim
  Build code with cli
Build Web Assets: `npm run build`
Sync with Capacitor: `npx cap sync`
Run the App: `npx http-server dist --port 3000 --cors -o`
On Android (APK): `cd android && ./gradlew assembleDebug`
Get file apk from android `android/app/build/outputs/apk/debug`
