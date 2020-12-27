import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import * as firebase from 'firebase'


export default class LoginScreen extends React.Component {
    constructor()
    {
        super()
        this.state = {
            Email: '',
            Password: ''
        }
    }


    login = async(Email, Password) =>{
     if (Email && Password){
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(Email, Password)

            if (response){
                console.log('user loginned sucesfully')
                this.props.navigate.navigation('Transaction')
            }
         }  

         catch (error) {
            switch (error.code){
                case 'auth/usernotfound':
                        console.log('error')
                        alert("User does not exist")
                        break

                case 'auth/invalidemail':
                        console.log('error2')
                        alert('wrong email or password')
                        break
                

            }
     }     
     }  
     else {
        alert('Enter email-id and password')
    } 
    }

    
    render()
    {
        return(
        
        <KeyboardAvoidingView>
            <View>
                <Image source = {require('../assets/booklogo.jpg')}/>
                <Text style = {{textAlign: 'center', fontSize: 20}}>willy</Text>
            </View>
               
            <View>

            <TextInput 
                    placeholder = 'enter email'
                    keyboardType =  'email-address'
                    onChangeText = {(Text) =>{
                        this.setState({Email: Text})
                    }}
                    >
                </TextInput>

            <TextInput 
                    placeholder = 'enter password'
                    secureTextEntry = {true}
                    onChangeText = {(Text) =>{
                        this.setState({Password: Text})
                    }}
                    >
            </TextInput>
            

            </View>




            <View>
                <TouchableOpacity onPress = {() =>{
                    this.login(this.state.Email, this.state.Password)
                }}>



                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        
    )

}
}