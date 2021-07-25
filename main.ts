microIoT.microIoT_MQTT_Event(microIoT.TOPIC.topic_0, function (message) {
    Mode = message
    microIoT.microIoT_clear()
    microIoT.microIoT_showUserText(1, "Mode: " + Mode)
})
function curtain_up () {
    if (curtainIsUp == false) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
        basic.pause(2000)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
        curtainIsUp = true
    }
}
input.onButtonPressed(Button.AB, function () {
    alarmOn = false
})
function curtain_down () {
    if (curtainIsUp == true) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 180)
        basic.pause(2000)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
        curtainIsUp = false
    }
}
let alarmOn = false
let curtainIsUp = false
let Mode = ""
microIoT.microIoT_initDisplay()
microIoT.microIoT_WIFI("DGINCB_WT6F", "20210601")
microIoT.microIoT_MQTT(
"vkW338gnR",
"DkZq38gnRz",
"DanDCZznR",
microIoT.SERVERS.English
)
microIoT.microIoT_showUserText(0, "DFRobot")
basic.forever(function () {
    let message = ""
    if (Mode == "sunny mode") {
        pins.analogWritePin(AnalogPin.P12, 0)
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 0)
        curtain_up()
    }
    if (message == "rainy mode") {
        pins.analogWritePin(AnalogPin.P12, 500)
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
        curtain_down()
    }
    if (message == "sleep mode") {
        pins.analogWritePin(AnalogPin.P12, 50)
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
        curtain_down()
    }
    if (message == "security mode") {
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
        curtain_down()
        if (sonar.ping(
        DigitalPin.P14,
        DigitalPin.P13,
        PingUnit.Centimeters
        ) < 5) {
            alarmOn = true
        }
    }
})
basic.forever(function () {
    if (alarmOn == true) {
        for (let index = 0; index < 5; index++) {
            pins.analogWritePin(AnalogPin.P12, 500)
            basic.pause(500)
            pins.analogWritePin(AnalogPin.P12, 0)
            basic.pause(500)
        }
        music.playMelody("C5 C5 C5 C5 C5 C5 C5 C5 ", 120)
    } else {
        pins.analogWritePin(AnalogPin.P12, 0)
        music.stopAllSounds()
    }
})
