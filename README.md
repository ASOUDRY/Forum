# Forum

## This is a simple chat app that makes use of firebase and react-native components.

# Installing and setting up your App.

### 1. Clone the application and download  it onto your computer.
### 2. Navigate to your cloned application, and type npm install, to install all your dependencies.

# Creating your Firebase Project.
Go to firebase https://firebase.google.com/

### 1. Login to your google account.

### 2. Click Get started.

### 3. Click Add project.

### 4. Name Your project.

### 5. Go through the Defaults and wait for your project to generate.

# Creating your Firebase Database.

### 1. Click Firestore Database
    
### 2.  Click Create database.

###  3. Click Start in test mode.

###  4. Choose your cloud Firestore location, closest to you.

###  5.  Click start collection, and name your collection, which is the collection id.

###  6. You will be prompted to create your first document. Click auto-Id, and then fill out the value table. After that hit save.

###  7.  (Optional) Delete the document you just created. Click the three dots on the far right of the screen. Click delete document, and then start delete.
    
# Connect your application to firebase.
    
 ### 1. Navigate to chatroom.js and go to line 25. Comment out the the contents of firebaseConfig.

 ### 2. Click the gear beside Project Overview, and click project settings. Navigate down to Your apps and click the </> icon.

### 3. Nickname your app, and check Register app.

### 4. Navigate down to const firebaseConfig. Copy the content of this variable, into the firebaseconfig in your Chat.js.

 ### 5. Navigate down to this.chatroomMessages. Replace the 'chatroom' inside firebase.firestore().collection('chatroom') with the name of your collections. 

# Authentication
    
### 1. Click Authenticatication, 
### 2. Click get started, 
### 3. Navigate down to Anomyous. 
### 4. Click enable, and then save.

# Running the Forum App

### Navigate to your root folder in your application, and type npm start into your terminal. Next choose ios, or android, to select how you want to run your app. Click the option, and it will start. Below lists the steps on how to set up for IOS and Android.

## Running your app as a Ios Application.
---

### 1. Enter expo whoami to see if you are logged into expo.

### 2. If you are not loggedin login to the application with expo login. If you have never made a account before, use expo register to make a account.

### 3. Go to the appstore and download the expo go app.

### 4. Log into the expo go app using the same account as the one in step 2.

### 5. Make sure your wifi is the same on your computer as it is on your mobile device. 

### 6. Run npm start on your terminal, the app should pop up on expo under recently in development.

## Running your app on a Android emulator.
---
### 1. Android Studio studio go to this url [here.](https://developer.android.com/studio/?gclid=Cj0KCQjw-NaJBhDsARIsAAja6dNdOKWSNRkXzCjLr10v98u65DcVk9Pu03K7og4YbRkPUHnBPlU_QlUaAiNAEALw_wcB&gclsrc=aw.ds)
    
### 2. Open up Android Studio go to Configure and click Android Virtual Device(AVD). Choose your configurations,(default) is fine. Press the play button under actions.

# For further questions contact the author at soudryalex@gmail.com