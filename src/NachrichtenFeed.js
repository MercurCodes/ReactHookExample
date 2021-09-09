import React from "react";

class NachrichtenFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nachrichten: []
    }
  }
  
  componentDidMount() {
    window.NachrichtenHook = this.receiveMessage;
  }

  componentWillUnmount() {
    window.NachrichtenHook = undefined;
  }

  receiveMessage = (newMessage) => {
    let nachrichten = this.state.nachrichten;
    nachrichten.push("Empfangen: " + newMessage);
    nachrichten = [...nachrichten];
    this.setState({nachrichten: nachrichten});
  }

  input = "";

  inputChanged = (event) => {
    this.input = event.target.value;
  }

  senden = (event) => {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.someMessageHandler) {
      window.webkit.messageHandlers.someMessageHandler.postMessage({
          "message": this.input
      });
    } else if(window.MyNewInterface && window.MyNewInterface.someMessageHandler) {
      window.MyNewInterface.someMessageHandler("message: " + this.input);
    } else {
      let nachrichten = this.state.nachrichten;
      nachrichten.push("Missed" + "No interface found");
      nachrichten = [...nachrichten];
      this.setState({nachrichten: nachrichten});
    }
    console.log("Clicked" + this.input);
  }

  render() {
    return <React.Fragment>
      {
        this.state.nachrichten.map((entry) => <React.Fragment>
          {entry}
          <br/>
        </React.Fragment>)
      }
      <input onChange={this.inputChanged}/>
      <button onClick={this.senden}>Senden</button>
    </React.Fragment>
  }

}

export default NachrichtenFeed;