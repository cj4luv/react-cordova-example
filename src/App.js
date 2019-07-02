import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  }

  onDeviceReady = () => {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal.startInit('7ea1280d-59a6-48d7-8cf4-27d3c1dca813')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
  };

  render() {
    return <div className="App">index</div>;
  }
}

export default App;
