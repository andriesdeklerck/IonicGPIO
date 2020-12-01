import React, { useState } from 'react';
import { IonRadioGroup, IonList, IonListHeader, IonItem, IonItemDivider, IonRadio, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel } from '@ionic/react';
import './Tab2.css';

import Paho from 'paho-mqtt'

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
}

function onSubscribed() {
}

var output20 = '';
var output21 = '';

const Tab2: React.FC = () => {

  const [led20, setLed20] = useState<string>('off');
  const [led21, setLed21] = useState<string>('off');

  output20 = led20;
  output21 = led21;

  message = new Paho.Message("");
  if (output20 === 'off') {
    var message = new Paho.Message("20=0");
    message.destinationName = "GPIO";
    client.send(message);
  }
  if (output20 === 'on') {
    var message = new Paho.Message("20=1");
    message.destinationName = "GPIO";
    client.send(message);
  }
  if (output21 === 'off') {
    var message = new Paho.Message("21=0");
    message.destinationName = "GPIO";
    client.send(message);
  }
  if (output21 === 'on') {
    var message = new Paho.Message("21=1");
    message.destinationName = "GPIO";
    client.send(message);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Outputs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Outputs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonRadioGroup value={led20} onIonChange={e => setLed20(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Led 20</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>on</IonLabel>
              <IonRadio slot="start" value="on" />
            </IonItem>
            <IonItem>
              <IonLabel>off</IonLabel>
              <IonRadio slot="start" value="off" />
            </IonItem>
          </IonRadioGroup>
          <IonItemDivider>Your Selection</IonItemDivider>
          <IonItem>{led20 ?? '(none selected'}</IonItem>
        </IonList>
        <IonList>
          <IonRadioGroup value={led21} onIonChange={e => setLed21(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Led 21</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>on</IonLabel>
              <IonRadio slot="start" value="on" />
            </IonItem>
            <IonItem>
              <IonLabel>off</IonLabel>
              <IonRadio slot="start" value="off" />
            </IonItem>
          </IonRadioGroup>
          <IonItemDivider>Your Selection</IonItemDivider>
          <IonItem>{led21 ?? '(none selected'}</IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
