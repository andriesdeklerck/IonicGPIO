import React, { useEffect, useState } from 'react';
import { IonContent, IonFooter, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, IonItem } from '@ionic/react';
import './Tab1.css';

import Paho from 'paho-mqtt'
var input = '';
var kleur1 = "";
var kleur2 = "";

var mqttHost = "farmer.cloudmqtt.com";
var mqttPort = 34514;

// Create a client instance
var clientId = Math.floor(Math.random() * 10001);
const client = new Paho.Client(mqttHost, mqttPort, String(clientId));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect(
  {
    onSuccess: onConnected,
    userName: 'kcjnkpgf',
    password: '-E6ZivmBYi-D',
    useSSL: true
  }
);

// called when the client connects
function onConnected() {
  client.subscribe("GPIO",
    {
      onSuccess: onSubscribed
    }
  );
}

// called when the client loses its connection
function onConnectionLost(responseObject: any) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message: any) {
  input = message.payloadString;
  if (input === 'button2=0') {
      kleur1 = "red";

  }
  if (input === 'button2=1') {
    kleur1 = "green";
  }
  if (input === 'button3=0') {
    kleur2 = "red";
  }
  if (input === 'button3=1') {
    kleur2 = "green";
  }
  console.log("kleur 1: " + kleur1);
  console.log("kleur 2: " + kleur2);
}

function onSubscribed() {
}

const Tab1: React.FC = () => {

  var [buttonKleur1] = useState(false);
  var [buttonKleur2] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inputs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inputs</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
      <IonFooter>
        <IonItem class="ion-text-center">
          <IonLabel style={{ color: buttonKleur1 }}>Pin 2</IonLabel>
        </IonItem>
        <IonItem class="ion-text-center">
          <IonLabel style={{ color: buttonKleur2 }}>Pin 3</IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Tab1;
