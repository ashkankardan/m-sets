import React from 'react';
import SaveSet from './save-set';
import * as Tone from 'tone';

export default class Modules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: this.props.currentUser[0].artistName,
      setName: 'newSetName',
      artistId: this.props.currentUser[0].artistId,
      osc1: false,
      waveForm1: 'sine',
      frq1: 180,
      lp1: false,
      hp1: false,
      delay1: false,
      reverb1: false,
      distortion1: false,
      gain1: 0,
      osc2: false,
      waveForm2: 'sine',
      frq2: 180,
      lp2: false,
      hp2: false,
      delay2: false,
      reverb2: false,
      distortion2: false,
      gain2: 0,
      output: 0,
      playPause: false,
      saveBtn: true
    };

    this.osc1 = new Tone.Oscillator();
    this.gainNode1 = new Tone.Gain(0);
    this.dist1 = new Tone.Distortion(0.5);
    this.lowpass1 = new Tone.Filter();
    this.highpass1 = new Tone.Filter();
    this.reverb1 = new Tone.Reverb();
    this.delay1 = new Tone.PingPongDelay({
      delayTime: '8n',
      feedback: 0.6,
      wet: 0.5
    });
    this.toneMeter = new Tone.Meter({ channels: 2 });
    this.osc1OnOff1 = this.osc1OnOff1.bind(this);
    this.distortion1 = this.distortion1.bind(this);
    this.reverbFn1 = this.reverbFn1.bind(this);
    this.delayFn1 = this.delayFn1.bind(this);
    this.lp1 = this.lp1.bind(this);
    this.hp1 = this.hp1.bind(this);

    this.osc2 = new Tone.Oscillator();
    this.gainNode2 = new Tone.Gain(0);
    this.dist2 = new Tone.Distortion(0.5);
    this.lowpass2 = new Tone.Filter();
    this.highpass2 = new Tone.Filter();
    this.reverb2 = new Tone.Reverb();
    this.delay2 = new Tone.PingPongDelay({
      delayTime: '8n',
      feedback: 0.6,
      wet: 0.5
    });
    this.osc1OnOff2 = this.osc1OnOff2.bind(this);
    this.distortion2 = this.distortion2.bind(this);
    this.reverbFn2 = this.reverbFn2.bind(this);
    this.delayFn2 = this.delayFn2.bind(this);
    this.lp2 = this.lp2.bind(this);
    this.hp2 = this.hp2.bind(this);

    this.newSet = this.newSet.bind(this);
    this.disableSave = this.disableSave.bind(this);
    this.openSet = this.openSet.bind(this);
    this.playPause = this.playPause.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  newSet() {
    this.setState({
      artistName: this.props.currentUser[0].artistName,
      setName: 'newSetName',
      artistId: this.props.currentUser[0].artistId,
      osc1: false,
      waveForm1: 'sine',
      frq1: 180,
      lp1: false,
      hp1: false,
      delay1: false,
      reverb1: false,
      distortion1: false,
      gain1: 0,
      osc2: false,
      waveForm2: 'sine',
      frq2: 180,
      lp2: false,
      hp2: false,
      delay2: false,
      reverb2: false,
      distortion2: false,
      gain2: 0,
      output: 0,
      playPause: false,
      saveBtn: true
    });
  }

  openSet() {
    this.props.divSetView('search');
  }

  disableSave() {
    this.setState({
      saveBtn: false
    });
  }

  playPause() {
    if (this.state.playPause) {
      this.osc1.stop();
      this.osc2.stop();
      this.setState({
        osc1: false,
        osc2: false,
        playPause: false
      });
    } else {
      this.osc1.start();
      this.osc2.start();
      this.setState({
        osc1: true,
        osc2: true,
        playPause: true
      });
    }
  }

  handleNameChange(evt) {
    this.setState({
      setName: evt.target.value
    });
  }

  handleChange(evt) {
    const eName = evt.target.name;
    const eValue = evt.target.value;

    this.setState({
      [eName]: eValue
    });

    this.[eName]();
  }

  waveForm1() {
    this.osc1.type = this.state.waveForm1;
  }

  waveForm2() {
    this.osc2.type = this.state.waveForm2;
  }

  frq1() {
    this.osc1.frequency.value = this.state.frq1;
  }

  frq2() {
    this.osc2.frequency.value = this.state.frq2;
  }

  gain1() {
    this.gainNode1.gain.rampTo(this.state.gain1);
  }

  gain2() {
    this.gainNode2.gain.rampTo(this.state.gain2);
  }

  output() {
    this.osc1.volume.value = this.state.output;
    this.osc2.volume.value = this.state.output;
  }

  osc1OnOff1() {
    if (this.state.osc1) {
      this.osc1.stop();
      this.setState({
        osc1: false
      });
    } else {
      this.osc1.start();
      this.setState({
        osc1: true
      });
    }
  }

  osc1OnOff2() {
    if (this.state.osc2) {
      this.osc2.stop();
      this.setState({
        osc2: false
      });
    } else {
      this.osc2.start();
      this.setState({
        osc2: true
      });
    }
  }

  distortion1() {
    if (this.state.distortion1) {
      this.osc1.disconnect(this.dist1);
      this.setState({
        distortion1: false
      });
    } else {
      this.osc1.connect(this.dist1);
      this.setState({
        distortion1: true
      });
    }
  }

  distortion2() {
    if (this.state.distortion2) {
      this.osc2.disconnect(this.dist2);
      this.setState({
        distortion2: false
      });
    } else {
      this.osc2.connect(this.dist2);
      this.setState({
        distortion2: true
      });
    }
  }

  reverbFn1() {
    if (this.state.reverb1) {
      this.osc1.disconnect(this.reverb1);
      this.setState({
        reverb1: false
      });
    } else {
      this.osc1.connect(this.reverb1);
      this.setState({
        reverb1: true
      });
    }
  }

  reverbFn2() {
    if (this.state.reverb2) {
      this.osc2.disconnect(this.reverb2);
      this.setState({
        reverb2: false
      });
    } else {
      this.osc2.connect(this.reverb2);
      this.setState({
        reverb2: true
      });
    }
  }

  delayFn1() {
    if (this.state.delay1) {
      this.osc1.disconnect(this.delay1);
      this.setState({
        delay1: false
      });
    } else {
      this.osc1.connect(this.delay1);
      this.setState({
        delay1: true
      });
    }
  }

  delayFn2() {
    if (this.state.delay2) {
      this.osc2.disconnect(this.delay2);
      this.setState({
        delay2: false
      });
    } else {
      this.osc2.connect(this.delay2);
      this.setState({
        delay2: true
      });
    }
  }

  lp1() {
    if (this.state.lp1) {
      this.osc1.disconnect(this.lowpass1);
      this.setState({
        lp1: false
      });
    } else {
      this.osc1.connect(this.lowpass1);
      this.setState({
        lp1: true
      });
    }
  }

  lp2() {
    if (this.state.lp2) {
      this.osc2.disconnect(this.lowpass2);
      this.setState({
        lp2: false
      });
    } else {
      this.osc2.connect(this.lowpass2);
      this.setState({
        lp2: true
      });
    }
  }

  hp1() {
    if (this.state.hp1) {
      this.osc1.disconnect(this.highpass1);
      this.setState({
        hp1: false
      });
    } else {
      this.osc1.connect(this.highpass1);
      this.setState({
        hp1: true
      });
    }
  }

  hp2() {
    if (this.state.hp2) {
      this.osc2.disconnect(this.highpass2);
      this.setState({
        hp2: false
      });
    } else {
      this.osc2.connect(this.highpass2);
      this.setState({
        hp2: true
      });
    }
  }

  initialize() {
    this.setState({
      artistName: this.props.currentUser[0].artistName,
      artistId: this.props.currentUser[0].artistId
    });
    this.osc1.type = this.state.waveForm1;
    this.osc1.frequency.value = this.state.frq1;
    this.lowpass1.set({
      type: 'lowpass'
    });
    this.highpass1.set({
      type: 'highpass'
    });
    this.osc1.connect(this.gainNode1);
    this.osc1.connect(this.reverb1);
    this.gainNode1.toDestination();
    this.lowpass1.toDestination();
    this.highpass1.toDestination();
    this.dist1.toDestination();
    this.reverb1.toDestination();
    this.delay1.toDestination();
    this.delay1.connect(this.toneMeter);
    this.osc1.volume.value = this.state.output;

    this.osc2.type = this.state.waveForm2;
    this.osc2.frequency.value = this.state.frq2;
    this.lowpass2.set({
      type: 'lowpass'
    });
    this.highpass2.set({
      type: 'highpass'
    });
    this.osc2.connect(this.gainNode2);
    this.osc2.connect(this.reverb2);
    this.gainNode2.toDestination();
    this.lowpass2.toDestination();
    this.highpass2.toDestination();
    this.dist2.toDestination();
    this.reverb2.toDestination();
    this.delay2.toDestination();
    this.delay2.connect(this.toneMeter);
    this.osc2.volume.value = this.state.output;

    if (this.props.selectedSet) {
      this.setState({
        artistName: this.props.selectedSet.artistName,
        setName: this.props.selectedSet.setName,
        artistId: this.props.selectedSet.artistId,
        osc1: this.props.selectedSet.osc1,
        waveForm1: this.props.selectedSet.waveForm1,
        frq1: this.props.selectedSet.frq1,
        lp1: this.props.selectedSet.lp1,
        hp1: this.props.selectedSet.hp1,
        delay1: this.props.selectedSet.delay1,
        reverb1: this.props.selectedSet.reverb1,
        distortion1: this.props.selectedSet.distortion1,
        gain1: this.props.selectedSet.gain1,
        osc2: this.props.selectedSet.osc2,
        waveForm2: this.props.selectedSet.waveForm2,
        frq2: this.props.selectedSet.frq2,
        lp2: this.props.selectedSet.lp2,
        hp2: this.props.selectedSet.hp2,
        delay2: this.props.selectedSet.delay2,
        reverb2: this.props.selectedSet.reverb2,
        distortion2: this.props.selectedSet.distortion2,
        gain2: this.props.selectedSet.gain2,
        output: this.props.selectedSet.output
      });

      if (this.props.selectedSet.artistName !== this.props.currentUser[0].artistName) {
        this.disableSave();
      }
    }
  }

  componentDidMount() {

    this.initialize();
  }

  render() {
    return (
      <div className="msets-container">

        <div className="modules">

          <div className="data-control">
            <div className="row">

              <input className="setName" type="text" name="setName" onChange={ this.handleNameChange } value={ this.state.setName } />

              <button disabled className="artistName">{`By: ${this.state.artistName}`}</button>
            </div>

            <div className="divider"></div>

            <div className="row">

              <button onClick={ this.newSet } className="newSet">New Set</button>
              <button onClick={ this.openSet } className="openSet">Open Set</button>

            </div>

            <div className="divider"></div>

            <div className="row">
              <button onClick={ this.playPause } className={`playPause ${this.state.playPause}`}>Play/Pause</button>
              <SaveSet saveState={this.state.saveBtn} disableSave={this.disableSave} setData={this.state}/>
            </div>
          </div>

          <div className="divider"></div>

          <div className="rack1">
            <div className="row">
              <button disabled className="osc">OSC1</button>
              <button onClick={ this.osc1OnOff1 } className={`osc1onoff ${this.state.osc1}`}>ON/OFF</button>
            </div>
            <div className="row">
              <select className="waveForm" onChange={ this.handleChange } name="waveForm1" id="waveForm1">
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
              </select>
              <input onChange={ this.handleChange } value={ this.state.frq1 } className="frq" type="number" name="frq1" min="140" max="320" />
              <button onClick={ this.lp1 } className={`lp ${this.state.lp1}`}>L/P</button>
              <button onClick={ this.hp1 } className={`hp ${this.state.hp1}`}>H/P</button>
            </div>
            <div className="row">
              <button onClick={ this.delayFn1 } className={`delay ${this.state.delay1}`}>Delay</button>
              <button onClick={ this.reverbFn1 } className={`reverb ${this.state.reverb1}`}>Reverb</button>
              <button onClick={ this.distortion1 } className={`distortion ${this.state.distortion1}`}>Distortion</button>
            </div>
            <input className="gain" type="range" name="gain1" onChange={ this.handleChange } value={ this.state.gain1 } min="0" max="5"/>
          </div>
          <div className="divider"></div>
          <div className="rack2">
            <div className="row">
              <button disabled className="osc">OSC2</button>
              <button onClick={ this.osc1OnOff2 } className={`osc1onoff ${this.state.osc2}`}>ON/OFF</button>
            </div>
            <div className="row">
              <select className="waveForm" onChange={ this.handleChange } name="waveForm2" id="waveForm2">
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
              </select>
              <input onChange={ this.handleChange } value={ this.state.frq2 } className="frq" type="number" name="frq2" min="140" max="320" />
              <button onClick={ this.lp2 } className={`lp ${this.state.lp2}`}>L/P</button>
              <button onClick={ this.hp2 } className={`hp ${this.state.hp2}`}>H/P</button>
            </div>
            <div className="row">
              <button onClick={ this.delayFn2 } className={`delay ${this.state.delay2}`}>Delay</button>
              <button onClick={ this.reverbFn2 } className={`reverb ${this.state.reverb2}`}>Reverb</button>
              <button onClick={ this.distortion2 } className={`distortion ${this.state.distortion2}`}>Distortion</button>
            </div>
            <input className="gain" type="range" name="gain2" onChange={ this.handleChange } value={ this.state.gain2 } min="0" max="5"/>
          </div>
          <div className="divider"></div>
          <input className="output" name="output" onChange={ this.handleChange } type="range" min="-48" max="0"/>
        </div>
      </div>
    );
  }
}
