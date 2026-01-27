/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from liusen
load dependency
"mbit": "file:../pxt-mbit"
*/



//% color="#C814B8" weight=25 icon="\uf1d4"
namespace mbit_显示类 {
    
    export enum enColor {

        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Yellow" block="黄色"
        Yellow,

    }
    export enum enLED1 {
        
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON =1
    }

    //% blockId=mbit_LED1 block="LED1|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function LED1(pin: DigitalPin, value: enLED1): void {

        pins.digitalWritePin(pin, value);

    }

    //% blockId=mbit_LED2 block="LED2|pin %pin|value %value"
    //% weight=4
    //% blockGap=8
    //% color="#C814B8"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value * 1024 / 256);

    }

    //% blockId=mbit_BreathLED block="BreathLED|pin %pin"
    //% weight=3
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function BreathLED(pin: AnalogPin): void {

        for (let i: number = 0; i < 1023; i++) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }
        basic.pause(10);
        for (let i: number = 1023; i > 0; i--) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }

    }

    //% blockId=mbit_RGB block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value1 %value1|value2 %value2|value3 %value3"
    //% weight=2
    //% blockGap=8
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void {

        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);

    }
    //% blockId=mbit_RGB2 block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value %value"
    //% weight=1
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB2(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Red: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Green: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Blue: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.White: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Cyan: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Pinkish: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Yellow: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
        }

    }
   
}
/*****************************************************************************************************************************************
 *  传感器类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% color="#87CEEB" weight=24 icon="\uf1b6"
namespace mbit_传感器类 {

    export enum enVoice {
        //% blockId="Voice" block="有声音"
        Voice = 0,
        //% blockId="NoVoice" block="无声音"
        NoVoice = 1
    }

    export enum enIR {
        //% blockId="Get" block="检测到"
        Get = 0,
        //% blockId="NoVoice" block="未检测"
        NoGet = 1
    }
    

    //% blockId=mbit_Voice_Sensor block="Voice_Sensor|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Voice_Sensor(pin: DigitalPin, value: enVoice): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    function IR_send_38k() {
        for (let i: number = 0; i < 8; i++) {
            pins.digitalWritePin(DigitalPin.P9, 1);
            control.waitMicros(13);
            pins.digitalWritePin(DigitalPin.P9, 0);
            control.waitMicros(13);
        }
    }
    //% blockId=mbit_IR_Sensor block="IR_Sensor|pin %pin| |%value|障碍物"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Sensor(pin: DigitalPin, value: enIR): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        //IR_send_38k();
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    //% blockId=mbit_IR_Send block="IR_Send|pin %pin"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Send(pin: DigitalPin): void {

        
        IR_send_38k();

    }
   
    //% blockId=mbit_ultrasonic block="Ultrasonic|Trig %Trig|Echo %Echo"
    //% color="#87CEEB"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {

        // send pulse

        let list:Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(Trig, PinPullMode.PullNone);
            pins.digitalWritePin(Trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(Trig, 1);
            control.waitMicros(15);
            pins.digitalWritePin(Trig, 0);
    
            let d = pins.pulseIn(Echo, PulseValue.High, 43200);
            list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(length);
    }
}

/*****************************************************************************************************************************************
 *  输入类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#808080" weight=23 icon="\uf11c"
namespace mbit_输入类 {

    export enum enRocker {
        //% blockId="Nostate" block="无"
        Nostate = 0,
        //% blockId="Up" block="上"
        Up,
        //% blockId="Down" block="下"
        Down,
        //% blockId="Left" block="左"
        Left,
        //% blockId="Right" block="右"
        Right,
        //% blockId="Press" block="按下"
        Press
    }

    export enum enTouch {
        //% blockId="NoTouch" block="未触摸"
        NoTouch = 0,
        //% blockId="Touch" block="触摸"
        Touch = 1
    }
    export enum enButton {
        //% blockId="Press" block="按下"
        Press = 0,
        //% blockId="Realse" block="松开"
        Realse = 1
    }

    //% blockId=mbit_TouchPad block="TouchPad|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }
    
    //% blockId=mbit_Rocker block="Rocker|VRX %pin1|VRY %pin2|SW %pin3|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: DigitalPin, value: enRocker): boolean {

        pins.setPull(pin3, PinPullMode.PullUp);
        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);
        let z = pins.digitalReadPin(pin3);
        let now_state = enRocker.Nostate;

        if (x < 100) // 上
        {

            now_state = enRocker.Up;

        }
        else if (x > 700) //
        {

            now_state = enRocker.Down;
        }
        else  // 左右
        {
            if (y < 100) //右
            {
                now_state = enRocker.Right;
            }
            else if (y > 700) //左
            {
                now_state = enRocker.Left;
            }
        }
        if (z == 0)
            now_state = enRocker.Press;
        if (now_state == value)
            return true;
        else
            return false;

    }

    //% blockId=mbit_Button block="Button|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(pin: DigitalPin, value: enButton): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }  
}

/*****************************************************************************************************************************************
 *    音乐类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#D2691E" weight=22 icon="\uf001"
namespace mbit_音乐类 {
    export enum enBuzzer {

        //% blockId="NoBeep" block="不响"
        NoBeep = 0,
        //% blockId="Beep" block="响"
        Beep
    }

    //% blockId=mbit_Buzzer block="Buzzer|pin %pin|value %value"
    //% weight=100
    //% blockGap=10 
    //% color="#D2691E"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(pin: DigitalPin, value: enBuzzer): void {

        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, value);

    }

}

/*****************************************************************************************************************************************
 *    电机类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#0000CD" weight=21 icon="\uf185"
namespace mbit_电机类 {

    //% blockId=mbit_Fan block="Fan|pin %pin|speed %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Fan(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);

    }

    //% blockId=mbit_Servo block="Servo|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo(pin: AnalogPin, value: number): void {

        pins.servoWritePin(pin, value);

    }

}

//% color="#006400" weight=20 icon="\uf1b9"
namespace mbit_小车类 {

  // --- 红外遥控功能 ---

  export const enum IrButton {
      //% block="any"
      Any = -1,

      // 方向控制
      UP = 0x62,    // 98
      LEFT = 0x22,  // 34
      RIGHT = 0xC2, // 194
      DOWN = 0xA8,  // 168
      OK = 0x02,    // 2

      // 数字键
      NUM0 = 0x4A,  // 74
      NUM1 = 0x68,  // 104
      NUM2 = 0x98,  // 152
      NUM3 = 0xB0,  // 176
      NUM4 = 0x30,  // 48
      NUM5 = 0x18,  // 24
      NUM6 = 0x7A,  // 122
      NUM7 = 0x10,  // 16
      NUM8 = 0x38,  // 56
      NUM9 = 0x5A,  // 90

      // 功能键
      STAR = 0x42,  // 66
      GRID = 0x52   // 82
  }

  export const enum IrButtonAction {
    //% block="pressed"
    Pressed = 0,
    //% block="released"
    Released = 1,
  }

  export const enum IrProtocol {
    //% block="Keyestudio"
    Keyestudio = 0,
    //% block="NEC"
    NEC = 1,
  }

  let irState: IrState;

  const IR_REPEAT = 256;
  const IR_INCOMPLETE = 257;
  const IR_DATAGRAM = 258;

  const REPEAT_TIMEOUT_MS = 120;

  interface IrState {
    protocol: IrProtocol;
    hasNewDatagram: boolean;
    bitsReceived: uint8;
    addressSectionBits: uint16;
    commandSectionBits: uint16;
    hiword: uint16;
    loword: uint16;
    activeCommand: number;
    repeatTimeout: number;
    onIrButtonPressed: IrButtonHandler[];
    onIrButtonReleased: IrButtonHandler[];
    onIrDatagram: () => void;
  }
  class IrButtonHandler {
    irButton: IrButton;
    onEvent: () => void;

    constructor(
      irButton: IrButton,
      onEvent: () => void
    ) {
      this.irButton = irButton;
      this.onEvent = onEvent;
    }
  }


  function appendBitToDatagram(bit: number): number {
    irState.bitsReceived += 1;

    if (irState.bitsReceived <= 8) {
      irState.hiword = (irState.hiword << 1) + bit;
      if (irState.protocol === IrProtocol.Keyestudio && bit === 1) {
        // recover from missing message bits at the beginning
        // Keyestudio address is 0 and thus missing bits can be detected
        // by checking for the first inverse address bit (which is a 1)
        irState.bitsReceived = 9;
        irState.hiword = 1;
      }
    } else if (irState.bitsReceived <= 16) {
      irState.hiword = (irState.hiword << 1) + bit;
    } else if (irState.bitsReceived <= 32) {
      irState.loword = (irState.loword << 1) + bit;
    }

    if (irState.bitsReceived === 32) {
      irState.addressSectionBits = irState.hiword & 0xffff;
      irState.commandSectionBits = irState.loword & 0xffff;
      return IR_DATAGRAM;
    } else {
      return IR_INCOMPLETE;
    }
  }

  function decode(markAndSpace: number): number {
    if (markAndSpace < 1600) {
      // low bit
      return appendBitToDatagram(0);
    } else if (markAndSpace < 2700) {
      // high bit
      return appendBitToDatagram(1);
    }

    irState.bitsReceived = 0;

    if (markAndSpace < 12500) {
      // Repeat detected
      return IR_REPEAT;
    } else if (markAndSpace < 14500) {
      // Start detected
      return IR_INCOMPLETE;
    } else {
      return IR_INCOMPLETE;
    }
  }

  function enableIrMarkSpaceDetection(pin: DigitalPin) {
    pins.setPull(pin, PinPullMode.PullNone);

    let mark = 0;
    let space = 0;

    pins.onPulsed(pin, PulseValue.Low, () => {
      // HIGH, see https://github.com/microsoft/pxt-microbit/issues/1416
      mark = pins.pulseDuration();
    });

    pins.onPulsed(pin, PulseValue.High, () => {
      // LOW
      space = pins.pulseDuration();
      const status = decode(mark + space);

      if (status !== IR_INCOMPLETE) {
        handleIrEvent(status);
      }
    });
  }

  function handleIrEvent(irEvent: number) {

    // Refresh repeat timer
    if (irEvent === IR_DATAGRAM || irEvent === IR_REPEAT) {
      irState.repeatTimeout = input.runningTime() + REPEAT_TIMEOUT_MS;
    }

    if (irEvent === IR_DATAGRAM) {
      irState.hasNewDatagram = true;

      if (irState.onIrDatagram) {
        background.schedule(irState.onIrDatagram, background.Thread.UserCallback, background.Mode.Once, 0);
      }

      const newCommand = irState.commandSectionBits >> 8;

      // Process a new command
      if (newCommand !== irState.activeCommand) {

        if (irState.activeCommand >= 0) {
          const releasedHandler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IrButton.Any === h.irButton);
          if (releasedHandler) {
            background.schedule(releasedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
          }
        }

        const pressedHandler = irState.onIrButtonPressed.find(h => h.irButton === newCommand || IrButton.Any === h.irButton);
        if (pressedHandler) {
          background.schedule(pressedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
        }

        irState.activeCommand = newCommand;
      }
    }
  }

  function initIrState() {
    if (irState) {
      return;
    }

    irState = {
      protocol: undefined,
      bitsReceived: 0,
      hasNewDatagram: false,
      addressSectionBits: 0,
      commandSectionBits: 0,
      hiword: 0, // TODO replace with uint32
      loword: 0,
      activeCommand: -1,
      repeatTimeout: 0,
      onIrButtonPressed: [],
      onIrButtonReleased: [],
      onIrDatagram: undefined,
    };
  }

  //% blockId="makerbit_infrared_connect_receiver"
  //% block="connect IR receiver at pin %pin"
  //% pin.fieldEditor="gridpicker"
  //% pin.fieldOptions.tooltips="false"
  //% weight=90
  export function connectIrReceiver(
    pin: DigitalPin
  ): void {
    initIrState();

    irState.protocol = IrProtocol.NEC;

    enableIrMarkSpaceDetection(pin);

    background.schedule(notifyIrEvents, background.Thread.Priority, background.Mode.Repeat, REPEAT_TIMEOUT_MS);
  }

  function notifyIrEvents() {
    if (irState.activeCommand === -1) {
      // skip to save CPU cylces
    } else {
      const now = input.runningTime();
      if (now > irState.repeatTimeout) {
        // repeat timed out

        const handler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IrButton.Any === h.irButton);
        if (handler) {
          background.schedule(handler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
        }

        irState.bitsReceived = 0;
        irState.activeCommand = -1;
      }
    }
  }

  //% blockId=makerbit_infrared_on_ir_button
  //% block="on IR button | %button | %action"
  //% button.fieldEditor="gridpicker"
  //% button.fieldOptions.tooltips="false"
  //% weight=50
  export function onIrButton(
    button: IrButton,
    action: IrButtonAction,
    handler: () => void
  ) {
    initIrState();
    if (action === IrButtonAction.Pressed) {
      irState.onIrButtonPressed.push(new IrButtonHandler(button, handler));
    }
    else {
      irState.onIrButtonReleased.push(new IrButtonHandler(button, handler));
    }
  }

  namespace background {

        export enum Thread {
            Priority = 0,
            UserCallback = 1,
        }

        export enum Mode {
            Repeat,
            Once,
        }

        class Executor {
            _newJobs: Job[] = undefined;
            _jobsToRemove: number[] = undefined;
            _pause: number = 100;
            _type: Thread;

            constructor(type: Thread) {
                this._type = type;
                this._newJobs = [];
                this._jobsToRemove = [];
                control.runInParallel(() => this.loop());
            }

            push(task: () => void, delay: number, mode: Mode): number {
                if (delay > 0 && delay < this._pause && mode === Mode.Repeat) {
                    this._pause = Math.floor(delay);
                }
                const job = new Job(task, delay, mode);
                this._newJobs.push(job);
                return job.id;
            }

            cancel(jobId: number) {
                this._jobsToRemove.push(jobId);
            }

            loop(): void {
                const _jobs: Job[] = [];

                let previous = control.millis();

                while (true) {
                    const now = control.millis();
                    const delta = now - previous;
                    previous = now;

                    // Add new jobs
                    this._newJobs.forEach(function (job: Job, index: number) {
                        _jobs.push(job);
                    });
                    this._newJobs = [];

                    // Cancel jobs
                    this._jobsToRemove.forEach(function (jobId: number, index: number) {
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            const job = _jobs[i];
                            if (job.id == jobId) {
                                _jobs.removeAt(i);
                                break;
                            }
                        }
                    });
                    this._jobsToRemove = []


                    // Execute all jobs
                    if (this._type === Thread.Priority) {
                        // newest first
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    } else {
                        // Execute in order of schedule
                        for (let i = 0; i < _jobs.length; i++) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    }

                    basic.pause(this._pause);
                }
            }
        }

        class Job {
            id: number;
            func: () => void;
            delay: number;
            remaining: number;
            mode: Mode;

            constructor(func: () => void, delay: number, mode: Mode) {
                this.id = randint(0, 2147483647)
                this.func = func;
                this.delay = delay;
                this.remaining = delay;
                this.mode = mode;
            }

            run(delta: number): boolean {
                if (delta <= 0) {
                    return false;
                }
                
                this.remaining -= delta;
                if (this.remaining > 0) {
                    return false;
                }

                switch (this.mode) {
                    case Mode.Once:
                        this.func();
                        basic.pause(0);
                        return true;
                    case Mode.Repeat:
                        this.func();
                        this.remaining = this.delay;
                        basic.pause(0);
                        return false;
                }
            }
        }

        const queues: Executor[] = [];

        export function schedule(
            func: () => void,
            type: Thread,
            mode: Mode,
            delay: number,
        ): number {
            if (!func || delay < 0) return 0;

            if (!queues[type]) {
                queues[type] = new Executor(type);
            }

            return queues[type].push(func, delay, mode);
        }

        export function remove(type: Thread, jobId: number): void {
            if (queues[type]) {
                queues[type].cancel(jobId);
            }
        }
    }


    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false
    let yahStrip: neopixel.Strip;

    export enum enColor {

        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Yellow" block="黄色"
        Yellow,

    }
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    export enum enPos {

        //% blockId="LeftState" block="左边状态"
        LeftState = 0,
        //% blockId="RightState" block="右边状态"
        RightState = 1
    }

    export enum enLineState {
        //% blockId="White" block="白线"
        White = 0,
        //% blockId="Black" block="黑线"
        Black = 1

    }
    
    export enum enAvoidState {
        //% blockId="OBSTACLE" block="有障碍物"
        OBSTACLE = 0,
        //% blockId="NOOBSTACLE" block="无障碍物"
        NOOBSTACLE = 1

    }

    
    export enum enServo {
        
        S1 = 1,
        S2,
        S3
    }
    export enum CarState {
        //% blockId="Car_Run" block="前行"
        Car_Run = 1,
        //% blockId="Car_Back" block="后退"
        Car_Back = 2,
        //% blockId="Car_Left" block="左转"
        Car_Left = 3,
        //% blockId="Car_Right" block="右转"
        Car_Right = 4,
        //% blockId="Car_Stop" block="停止"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="原地左旋"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="原地右旋"
        Car_SpinRight = 7
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }


    function Car_run(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }

        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023-speed); //速度控制

       // pins.analogWritePin(AnalogPin.P0, speed);//速度控制
       // pins.digitalWritePin(DigitalPin.P8, 0);
    }

    function Car_back(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed); //速度控制

        //pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        //pins.digitalWritePin(DigitalPin.P8, 1);
    }

    function Car_left(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_right(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }

    function Car_stop() {
       
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_spinleft(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }        
        
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed);
    } 

    function Car_spinright(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }      
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);
        //pins.analogWritePin(AnalogPin.P0, 1023-speed);
        //pins.digitalWritePin(DigitalPin.P8, 1);

        //pins.digitalWritePin(DigitalPin.P16, 1);
        //pins.analogWritePin(AnalogPin.P1, 1023-speed);

    }

    /**
     * *****************************************************************
     * @param index
     */
    //% blockId=mbit_RGB_Car_Big2 block="RGB_Car_Big2|value %value"
    //% weight=101
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big2(value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Red: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Green: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Blue: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.White: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Cyan: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Pinkish: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Yellow: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
        }
    }
    //% blockId=mbit_RGB_Car_Big block="RGB_Car_Big|value1 %value1|value2 %value2|value3 %value3"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value1: number, value2: number, value3: number): void {

        let R = value1 * 16;
        let G = value2 * 16;
        let B = value3 * 16;

        if (R > 4096)
            R = 4095;
        if (G > 4096)
            G = 4095;
        if (B > 4096)
            B = 4095;

        setPwm(0, 0, R);
        setPwm(1, 0, G);
        setPwm(2, 0, B);

    }

    //% blockId=mbit_RGB_Car_Program block="RGB_Car_Program"
    //% weight=99
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {
         
        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB);
        }
        return yahStrip;  
    }


	//% blockId=mbit_ultrasonic_car block="ultrasonic return distance(cm)"
    //% color="#006400"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {

        // send pulse (pxt-sonar logic)
        let trig = DigitalPin.P14;
        let echo = DigitalPin.P15;
        let maxCmDistance = 500;

        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        return Math.floor(d / 58);
    }

    //% blockId=mbit_Music_Car block="Music_Car|%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
    //% blockId=mbit_Servo_Car block="Servo_Car|num %num|value %value"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% num.min=1 num.max=3 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo_Car(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num + 2, 0, pwm);

    }

    //% blockId=mbit_Avoid_Sensor block="Avoid_Sensor|value %value"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Avoid_Sensor(value: enAvoidState): boolean {

        let temp: boolean = false;
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
        pins.digitalWritePin(DigitalPin.P9, 0);
        control.waitMicros(100);
        switch (value) {
            case enAvoidState.OBSTACLE: {
                serial.writeNumber(pins.analogReadPin(AnalogPin.P3))
                if (pins.analogReadPin(AnalogPin.P3) < 800) {
                
                    temp = true;
                    setPwm(8, 0, 0);
                }
                else {                 
                    temp = false;
                    setPwm(8, 0, 4095);
                }
                break;
            }

            case enAvoidState.NOOBSTACLE: {
                if (pins.analogReadPin(AnalogPin.P3) > 800) {

                    temp = true;
                    setPwm(8, 0, 4095);
                }
                else {
                    temp = false;
                    setPwm(8, 0, 0);
                }
                break;
            }
        }
        pins.digitalWritePin(DigitalPin.P9, 1);
        return temp;

    }
    //% blockId=mbit_Line_Sensor block="Line_Sensor|direct %direct|value %value"
    //% weight=94
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(direct: enPos, value: enLineState): boolean {

        let temp: boolean = false;

        switch (direct) {
            case enPos.LeftState: {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(7, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(7, 0, 0);
                }
                break;
            }

            case enPos.RightState: {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(6, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(6, 0, 0);
                }
                break;
            }
        }
        return temp;

    }
    //% blockId=mbit_CarCtrl block="CarCtrl|%index"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(255, 255); break;
            case CarState.Car_Back: Car_back(255, 255); break;
            case CarState.Car_Left: Car_left(0, 255); break;
            case CarState.Car_Right: Car_right(255, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255, 255); break;
            case CarState.Car_SpinRight: Car_spinright(255, 255); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed block="CarCtrlSpeed|%index|speed %speed"
    //% weight=92
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed, speed); break;
            case CarState.Car_Back: Car_back(speed, speed); break;
            case CarState.Car_Left: Car_left(0, speed); break;
            case CarState.Car_Right: Car_right(speed, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed, speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed, speed); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed2 block="CarCtrlSpeed2|%index|speed1 %speed1|speed2 %speed2"
    //% weight=91
    //% blockGap=10
    //% speed1.min=0 speed1.max=255 speed2.min=0 speed2.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed2(index: CarState, speed1: number, speed2: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed1, speed2); break;
            case CarState.Car_Back: Car_back(speed1, speed2); break;
            case CarState.Car_Left: Car_left(0, speed2); break;
            case CarState.Car_Right: Car_right(speed1, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed1, speed2); break;
            case CarState.Car_SpinRight: Car_spinright(speed1, speed2); break;
        }
    }
}
