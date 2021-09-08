type npm install to install all dependencies
    Libraries that must be installed if you prefer to do them individually.

install your preferred method for testing the app.

For ios go to app store and download expo go

    log into expo go.

    Make sure your wifi is the same on your computer as it is on your mobile device. 

For Android studio go to this url https://developer.android.com/studio/?gclid=Cj0KCQjw-NaJBhDsARIsAAja6dNdOKWSNRkXzCjLr10v98u65DcVk9Pu03K7og4YbRkPUHnBPlU_QlUaAiNAEALw_wcB&gclsrc=aw.ds
    
    Open up Android Studio go to Configure and click Android Virtual Device(AVD). Choose your configurations,(default) is fine. Press the play button under actions.

open expo using npm start

    Next click on the operating system you wish to test.
        
        Click Ios to launch app in your expo

        Click Android to watch app via Android studio.

Setting up your own storage.

Go to firebase https://firebase.google.com/

    Click Get started.

    Click Add project.

    Name Your project.

    Go through the Default 

Set up your database.
    
    Click Firestore Database

    Click Create database.

    Click Start in test mode.

    Choose your cloud Firestore location, closest to you.

    Click start collection, and name your collection name.

    Create your first documentation

    Auto Id, and create the following fields, with the following types

        Field: _id Type: String

        Field: createdAt Type: timestam[]

        Field: image Type: String

        Field: location Type: null

        Field: text Type: String 

        Field: array {
            Field: _id Type: String
        } 
Connect your application to firebase.
    
    Navigate to chatroom.js and go to line 25. Comment out the the contents of firebaseConfig.

    Click the gear beside Project Overview, and click project settings. Navigate down to Your apps and click the </> icon.

    Nickname your app, and check Register app.

    Navigate down to const firebaseConfig. Copy the content of this variable, into the firebaseconfig in your Chat.js.

    Navigate down to this.chatroomMessages. Replace the 'chatroom' inside firebase.firestore().collection('chatroom') with the name of your collections.

For further questions contact the author at soudryalex@gmail.com