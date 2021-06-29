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
      apiKey: "AIzaSyB4oAvBUbZyk7-9Yd5H7hp8AuMSzXjSO4Q",
      authDomain: "forum-1f07e.firebaseapp.com",
      projectId: "forum-1f07e",
      storageBucket: "forum-1f07e.appspot.com",
      messagingSenderId: "212591689644",
      appId: "1:212591689644:web:b4362edd93eff024b1c409",
      measurementId: "G-BL59Q28M06"
    };

     // Initialize Firebase
     if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    else {
      firebase.app()
    }

    this.referenceList = firebase.firestore().collection("Messages")

  }

  componentDidMount() {
    this.unsubscribe = firebase.firestore().collection("Messages").onSnapshot(this.onCollectionUpdate)
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
         },
      ],
      
    })
    this.addMessage()
    // firebase.auth().onAuthStateChanged()
  }

  componentWillUnmount() {
    this.unsubscribe();
 }


 addMessage() {
   const message = this.state.messages[0]
  this.referenceLists.add({
      test: "test"
      // text: message.text || "",
      // createdAt: message.createdAt,
      // user: message.user.n,
      // image: message.image || "",
      // location: message.location || null,
      // sent: true,
  });
}


// function to send the messages in the message state to chat.
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.addMessage();
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
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />      
       </View>
          
    ) 
  }
}