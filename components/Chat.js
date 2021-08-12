import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';


const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name:  this.props.route.params.name
    }

    let firebaseConfig = {
    apiKey: "AIzaSyBRDZym0HeoUzADYSuRtCxkrhY5f32Hqbs",
    authDomain: "forum-292a4.firebaseapp.com",
    projectId: "forum-292a4",
    storageBucket: "forum-292a4.appspot.com",
    messagingSenderId: "642873887082",
    appId: "1:642873887082:web:7c770526331c3eca277d13",
    measurementId: "G-XH2J9YX9ZH"
    };

     // Initialize Firebase
     if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    else {
      firebase.app()
    }
  }

  componentDidMount() {
    this.chatroomMessages = firebase.firestore().collection('chatroom')

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
      });

    this.messageSnapshot = this.chatroomMessages.onSnapshot(this.onCollectionUpdate);  
    });

    this.setState({
      // default messages dispatched when the user enters the chat
      messages: [
        {
          _id: 1,
          text: 'Hello' + ' ' + this.state.name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: 'Welcome to the Forum',
          createdAt: new Date(),
          system: true,
         },
         {
          _id: 3,
          text: this.state.name + ' ' + 'has entered the chat',
          createdAt: new Date(),
          system: true,
         }
      ],
    })
  }

  componentWillUnmount() {
    this.messageSnapshot();
 }

 addMessages(messages) {
   this.chatroomMessages.add({
     _id: messages[0]._id,
     createdAt: messages[0].createdAt,
     text: messages[0].text,
     user: messages[0].user
   })
 }

 onCollectionUpdate = (querySnapshot) => {
   const list = []
   querySnapshot.forEach(
     (doc) => {
      var data = (doc.data)
      console.log(data)
      }
     )
 }

// function to send the messages in the message state to chat.
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.addMessages(messages);
  }
// changes the speach bubble to set a color, in this case black.""
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  
  render() {
    // sets name on the top of the chatroom
      let { name } = this.props.route.params; 
      this.props.navigation.setOptions({ title: name });

      return (
        // wraps the return in a single wrapper. Style is needed for View to render.
       <View style={{
        height: '100%', width: '100%'}} >
          {/* Fixes height for for Android phones and Ioss Ipad */}
         <KeyboardAvoidingView behavior="height" />
         {/* The actual chatroom component */}
         <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => {
              this.onSend(messages)
              this.addMessages(messages)
            }}
            user={{
              _id: 1,
            }}
          />      
       </View>
          
    ) 
  }
}