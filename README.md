# Campus Blood Donation App 🩸

A mobile application designed to streamline blood donation participation among university students by reducing procedural friction, providing verification systems, and incentivizing donations through a points-based reward mechanism.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Key Capabilities](#key-capabilities)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

## 🎯 Overview

The Campus Blood Donation App addresses the challenge of low student participation in blood donation drives by providing a university-specific platform that:

- Simplifies donor registration and verification
- Connects students with campus blood donation events
- Rewards students with points for each donation
- Allows universities to manage events and approve requests
- Provides real-time updates and notifications

## ✨ Features

### For Students
- **Simple Registration**: Quick signup with student ID verification
- **Event Discovery**: Browse upcoming blood donation drives on campus
- **Reward System**: Earn points for each donation and redeem them for rewards
- **Real-time Dashboard**: View available events, donation history, and point balance
- **Pull-to-Refresh**: Instantly sync data with the latest updates
- **Request Tracking**: Monitor status of event registration and reward redemption requests

### For Universities
- **Event Management**: Create and manage blood donation events
- **Request Approval**: Review and approve/reject student event registrations
- **Reward Distribution**: Create rewards and manage redemption requests
- **Analytics Dashboard**: View top donors and donation statistics
- **Real-time Updates**: Instant synchronization across all users

## 🛠 Technology Stack

- **Frontend**: React Native (v0.82.1)
- **Backend**: Firebase (Firestore, Authentication)
- **Navigation**: React Navigation (v7)
- **State Management**: React Hooks
- **Date/Time**: Moment.js
- **UI Components**: Custom responsive components
- **Platform**: Android (iOS support ready)

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **Yarn** package manager
- **React Native CLI** - Install via: `npm install -g react-native-cli`
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
  - Android SDK
  - Android Virtual Device (AVD) or physical Android device
- **JDK** (Java Development Kit) version 17 or higher
- **Git** - [Download](https://git-scm.com/)

For detailed environment setup, visit: [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

## 🚀 Installation

1. **Clone the Repository**
   ```bash
   git clone 
   cd DonerProject
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install
   
   # OR using npx
   npx install
   
   # OR using Yarn
   yarn install
   ```

3. **Firebase Configuration**
   
   **Note:** This project already includes a Firebase configuration. You can use the existing setup to test the app immediately.
   
   **To Replace with Your Own Firebase Project:**
   
   If you want to use your own Firebase project:
   
   1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   2. Enable **Email/Password Authentication**:
      - Go to Authentication → Sign-in method
      - Enable Email/Password provider
   3. Create a **Firestore Database**:
      - Go to Firestore Database → Create database
      - Start in **test mode** (or configure security rules later)
   4. Download your `google-services.json`:
      - Go to Project Settings → Your apps → Android app
      - Download `google-services.json`
      - Replace the existing file in `android/app/google-services.json`
   5. For iOS, download `GoogleService-Info.plist` and place it in `ios/DonerProject/`
   
   **Firebase Collections Used:**
   - `User` - Student and university profiles
   - `Events` - Blood donation events
   - `reward` - Available rewards (lowercase collection name)
   - `RewardRequests` - Student reward redemption requests
   - `EventRegistration` - Student event registration requests

   **Creating University Admin Account:**
   
   To create a university admin account with access to the University portal:
   
   1. Go to Firebase Console → **Authentication** → Click **Add User**
   2. Enter email and password, then click **Add User**
   3. Copy the generated **User UID** from the Users table
   4. Go to Firebase Console → **Firestore Database** → **User** collection
   5. Click **Add Document**
   6. Paste the copied **UID** in the **Document ID** field
   7. Add a field:
      - **Field**: `Role`
      - **Type**: `string`
      - **Value**: `University`
   8. Click **Save**
   
   The created email can now login successfully and access the University portal.

4. **Android Setup**
   
   Ensure your `android/local.properties` file contains the Android SDK path:
   ```properties
   sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```

## 🏃 Running the Project

### Step 1: Start Metro Bundler

Metro is the JavaScript bundler for React Native. Start it first:

```bash
# Using npm
npm start

# OR using npx
npx react-native start

# OR using Yarn
yarn start
```

To reset cache (if experiencing issues):
```bash
npm start -- --reset-cache
```

### Step 2: Run on Android

Open a new terminal window and run:

```bash
# Using npm
npm run android

# OR using npx
npx react-native run-android

# OR using Yarn
yarn android
```

**Alternative**: Open the project in Android Studio (`android` folder) and click the "Run" button.

### Step 3: Run on iOS (macOS only)

1. Install CocoaPods dependencies:
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. Run the app:
   ```bash
   # Using npm
   npm run ios
   
   # OR using Yarn
   yarn ios
   ```

**Alternative**: Open `ios/DonerProject.xcworkspace` in Xcode and click the "Run" button.

### Building for Production

**Android Release Build:**
```bash
cd android
./gradlew assembleRelease
cd ..
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

## 📁 Project Structure

```
DonerProject/
├── SRC/                           # Main source code
│   ├── Assets/                    # Images, SVG icons
│   │   └── Svg/                   # Custom SVG components
│   ├── Component/                 # Reusable UI components
│   │   ├── CustomProgressBar.js   # Progress bar for capacity
│   │   ├── Dropdown.js            # Dropdown selector
│   │   ├── InputText.js           # Custom text input
│   │   ├── MainContainer.js       # Screen wrapper
│   │   ├── ResponsiveText.js      # Auto-scaling text
│   │   └── SimpleButton.js        # Custom button
│   ├── Constant/                  # App constants
│   │   └── Route.js               # Navigation route names
│   ├── FireBase/                  # Firebase integration
│   │   └── Index.js               # All Firebase operations
│   ├── Navigation/                # Navigation structure
│   │   ├── AuthNavigation/        # Login/Signup flow
│   │   ├── BottomNavigation/      # Student bottom tabs
│   │   ├── StackNavigation/       # Main stack navigator
│   │   └── UniversityBottomNavigation/  # University tabs
│   ├── Screen/                    # App screens
│   │   ├── App/
│   │   │   ├── StudentFlow/       # Student-specific screens
│   │   │   └── UniversityFlow/    # University-specific screens
│   │   └── Auth/                  # Authentication screens
│   ├── Theme/                     # App theming
│   │   └── Color/                 # Color constants
│   └── Utils/                     # Helper functions
├── android/                       # Android native code
├── ios/                           # iOS native code
└── App.js                         # App entry point
```

## 👥 User Roles

### Student Role
- **Registration**: Sign up with email, student ID, blood type
- **Event Discovery**: Browse upcoming donation events with details
- **Event Registration**: Request to participate in events (subject to approval)
- **Donation Tracking**: View donation history and accumulated points
- **Reward Redemption**: Browse rewards and request redemption using points
- **Real-time Updates**: Automatically see latest events, rewards, and point balance

### University Role
- **Event Creation**: Create blood donation events with date, location, capacity
- **Request Management**: 
  - Approve/reject student event registration requests
  - Approve/reject student reward redemption requests
- **Reward Creation**: Add rewards with point values for student redemption
- **Analytics**: View top donors, total donations, and event statistics
- **Donor Management**: Track students who have donated blood

## 📱 Key Mobile Capabilities

This application leverages several mobile-specific features:

1. **Real-time Data Synchronization**
   - Firebase Firestore's `onSnapshot` listeners for instant updates
   - Automatic UI refresh when data changes server-side
   - No manual refresh needed for critical information

2. **Pull-to-Refresh Gesture**
   - Native `RefreshControl` component
   - Intuitive gesture to manually sync data
   - Implemented on dashboard and report screens

3. **Responsive Design**
   - Custom `hp()` and `wp()` functions for screen adaptation
   - Scales UI elements based on device dimensions
   - Consistent experience across different screen sizes

4. **Native Navigation**
   - React Navigation with native transitions
   - Bottom tab navigation for quick access
   - Stack navigation for hierarchical flows

5. **Form Input Optimization**
   - Specialized keyboards (numeric for points)
   - Email input with email keyboard
   - Optimized input types for better UX

6. **Firebase Cloud Services**
   - Cloud-based authentication
   - Real-time database with offline persistence
   - Scalable backend without server management

## Step 3: Development Notes

The app uses **Fast Refresh** powered by React Native for instant updates during development. When you save your code, changes will automatically reflect in the app.

**Dev Menu Access:**
- **Android**: Press <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS)
- **iOS**: Press <kbd>Cmd ⌘</kbd> + <kbd>D</kbd> in iOS Simulator

**Reload App:**
- **Android**: Press <kbd>R</kbd> key twice
- **iOS**: Press <kbd>R</kbd> in iOS Simulator

## 🔧 Troubleshooting

### Common Issues

**1. Metro Bundler Cache Issues**
```bash
# Clear cache and restart
npm start -- --reset-cache
```

**2. Android Build Failures**
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

**3. Firebase Connection Issues**
- Verify `google-services.json` is in `android/app/` directory
- Check Firebase project configuration
- Ensure Firestore and Authentication are enabled

**4. Pod Installation Errors (iOS)**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**5. "Cannot read property of undefined" Errors**
- Clear Metro cache: `npm start -- --reset-cache`
- Rebuild the app completely
- Check if Firebase collections exist and have correct names

**6. App Not Updating After Code Changes**
- Ensure Metro bundler is running
- Press `R` key twice in Android to reload
- For major changes, rebuild the app

### Additional Resources

- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)

## 👨‍💻 Contributors

- **Developer**: Salman Zahid, Roshan Bhandhary

## 📄 License

This project is developed for educational purposes.

---

**Note**: Make sure to configure your Firebase project with the appropriate security rules for production deployment. The current setup is designed for development and testing.
