import React from 'react';
import RefreshToken from '../refresh_token/RefreshToken';

export default class Clock extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      count: 0,
      running: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount(prevProps, prevState){

    if(prevState){
      if(this.state.running !== prevState.running){
        if(this.state.running) {
          this.handleStart();
        }
      }
    }else{
      this.handleStart();
    }

    if (window.location.pathname !== '/login'){
      if(await localStorage.getItem('token') === ''){
        window.location.assign('/login');
      }
    }
  }

  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }
  render () {
    const {time} = this.props;
    return (
      <div className="displayedTime">
        <h1>{this.format(time)}</h1>
      </div>
    )
  }

  async handleStart() {

    const remaining_time = parseInt((localStorage.expiration_time - new Date().getTime()) / 1000);
    await this.setState({ count: remaining_time >= 0 ? remaining_time : 0 })
    
    this.timer = setInterval(async () => {
      const newCount = this.state.count - 1;

      if(newCount <= 60 && newCount >= 10){
        
        this.handleStop();

        if(await window.confirm("refresh token")){
          await RefreshToken();
          await this.handleRestart(600);
        }else{
          this.handleFullStop();
        }
        
      }else{
        // else if(window.location.pathname !== "/login"){
        //   window.location.assign("/login");
        // }
        
        this.setState(
          {count: newCount >= 0 ? newCount : 0}
        );
      }

    }, 1000);
  }
  
  handleStop() {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState(
        {running:false}
      );
    }
  }

  handleFullStop(){
    this.handleStop();
    this.handleReset();
    localStorage.setItem("expiration_time", 0);
    localStorage.setItem("tokenC", "");
    localStorage.setItem("tokenR", "");
    localStorage.setItem("tokenU", "");
  }
  
  handleReset() {
    this.setState(
      {count: 0}
    );
  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    })
  }
  
  async handleRestart(seconds){
    await this.handleStop();
    await this.handleReset();
    await this.handleCountdown(seconds);
    await this.handleStart();
  }
}