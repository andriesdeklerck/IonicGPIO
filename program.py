#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time
import time
import paho.mqtt.client as mqtt

def on_connect( client, userdata, flags, rc):
    print ("Connected with Code")
    # Subscribe Topic from here
    # client.subscribe("test")

def on_message( client, obj, msg):
    # print the message received from the subscribed topic
#     print (msg.topic+" "+str(msg.payload) )
    if msg.payload == "20=1":
            GPIO.output(20, True)
            print("led 20 aan")
    elif msg.payload == "20=0":
             GPIO.output(20, False)
             print("led 20 uit")

    elif msg.payload == "21=1":
             GPIO.output(21, True)
             print("led 21 aan")

    elif msg.payload == "21=0":
             GPIO.output(21, False)
             print("led 21 uit")

def on_publish(client, obj, mid):
    print(str(mid))

def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(obj))

def on_log(client, obj, level, string):
    print(string)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
# client.on_publish = on_publish
# client.on_subscribe = on_subscribe
# client.on_log = on_log

client.username_pw_set("kcjnkpgf", "-E6ZivmBYi-D")
client.connect("farmer.cloudmqtt.com", 14514, 60)

GPIO.setmode(GPIO.BCM)

GPIO.setup(2, GPIO.IN)
GPIO.setup(3, GPIO.IN)
GPIO.setup(20, GPIO.OUT)
GPIO.setup(21, GPIO.OUT)

client.loop_start()
time.sleep(1)
# client.loop_forever()
while True:
        button2 = GPIO.input(2)
        button3 = GPIO.input(3)
        client.subscribe("GPIO")
        if button2 == True:
                client.publish("GPIO", "button2=1")
        else:
                client.publish("GPIO", "button2=0")
        time.sleep(1)
        if button3 == True:
                client.publish("GPIO", "button3=1")
        else:
                client.publish("GPIO", "button3=0")        
        time.sleep(1)
client.loop_stop()
client.disconnect()
