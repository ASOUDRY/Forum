import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';
import 'firebase/storage'

export default class CustomActions extends React.Component {
     // upload image to Storage with XMLHttpRequest
  uploadImage = async(uri) => {
    try{
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
  
      const splitUri = uri.split('/');
      const imageName = splitUri[splitUri.length - 1];
  
      console.log(imageName);
  
      const ref = firebase
        .storage()
        .ref()
        .child(`${imageName}`);
            
      const snapshot = await ref.put(blob);
      blob.close();
      return await snapshot.ref.getDownloadURL();
    }
    catch (error)  {
      console.log(error.message);
    }
  }

  pickImage = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'Images',
        }).catch(error => console.log(error));
     
      if (!result.cancelled) {
            const imageUrlLink = result.uri;
            this.uploadImage(result.uri);
            this.props.onSend({ image: imageUrlLink })
            this.props.addImages(imageUrlLink);
      }
      }
  }
    catch (error) {
      console.log(error.message);
    }
  }

  getLocation = async () => {
    try {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status === 'granted') {
          let result = await Location.getCurrentPositionAsync({});
          if (result) {
            this.props.onSend({
                location: {
                  longitude: result.coords.longitude,
                  latitude: result.coords.latitude,
                },
            });
          }
        }
    }
    catch (error) {
        console.log(error.message);
    }
  }
      
  takePhoto = async () => {
    try {
        const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchCameraAsync({
              mediaTypes: 'Images',
        }).catch(error => console.log(error));
        const imageUrlLink = result.uri;
        this.uploadImage(result.uri);
        this.props.onSend({ image: imageUrlLink });
    }
    catch (error) {
        console.log(error.message);
    }
  }
        
  onActionsPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    try {
      this.context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        async (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              return this.pickImage() ;
            case 1:
              return this.takePhoto();
            case 2:
              return this.getLocation();
            default:
          }
        },
      );
    }
    catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionsPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
