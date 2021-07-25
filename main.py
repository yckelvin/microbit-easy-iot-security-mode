def on_microiot_mqtt_topic_microiot.topic.topic_0(message):
    if message == "sunny mode":
        pins.analog_write_pin(AnalogPin.P12, 0)
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 0)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
        basic.pause(2000)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
    elif message == "sleep mode":
        pins.analog_write_pin(AnalogPin.P12, 50)
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 180)
        basic.pause(2000)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
    elif message == "security mode":
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 180)
        basic.pause(2000)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
microIoT.microIoT_MQTT_Event(microIoT.TOPIC.TOPIC_0,
    on_microiot_mqtt_topic_microiot.topic.topic_0)

def on_button_pressed_a():
    microIoT.microIoT_SendMessage("sunny mode", microIoT.TOPIC.TOPIC_0)
    basic.pause(1000)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    microIoT.microIoT_SendMessage("security mode", microIoT.TOPIC.TOPIC_0)
    basic.pause(1000)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    microIoT.microIoT_SendMessage("sleep mode", microIoT.TOPIC.TOPIC_0)
    basic.pause(1000)
input.on_button_pressed(Button.B, on_button_pressed_b)

microIoT.microIoT_initDisplay()
WiFi_name = "DGINCB_WT6F"
microIoT.microIoT_WIFI(WiFi_name, "20210601")
microIoT.microIoT_MQTT("vkW338gnR",
    "DkZq38gnRz",
    "DanDCZznR",
    microIoT.SERVERS.ENGLISH)
microIoT.microIoT_showUserText(0, WiFi_name)