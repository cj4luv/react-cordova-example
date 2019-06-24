import React, { Component } from 'react';
import './App.css';

function show(status) {
  console.log('show status', status);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }

  componentDidMount() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  }

  onDeviceReady = () => {
    this.openQRScan();
  };

  openQRScan = () => {
    window.QRScanner.prepare(this.onDone); // show the prompt
  };

  onDone(err, status) {
    if (err) {
      // here we can handle errors and clean up any loose ends.
      console.error(err);
    }
    if (status.authorized) {
      function displayContents(err, text) {
        if (err) {
          // an error occurred, or the scan was canceled (error code `6`)
          console.log(err);
        } else {
          // The scan completed, display the contents of the QR code:
          window.QRScanner.pausePreview(function(status) {
            console.log('pausePreview', status);
            alert(text);
          });
        }
      }

      // W00t, you have camera access and the scanner is initialized.
      // QRscanner.show() should feel very fast.
      console.log('authorized', status.authorized);
      window.QRScanner.scan(displayContents);
      window.QRScanner.show(show);
    } else if (status.denied) {
      // The video preview will remain black, and scanning is disabled. We can
      // try to ask the user to change their mind, but we'll have to send them
      // to their device settings with `QRScanner.openSettings()`.
      console.log('denied', status.denied);
      window.QRScanner.openSettings();
    } else {
      // we didn't get permission, but we didn't get permanently denied. (On
      // Android, a denial isn't permanent unless the user checks the "Don't
      // ask again" box.) We can ask again at the next relevant opportunity.
    }
  }

  reset = () =>
    window.QRScanner.resumePreview(function(status) {
      console.log('resumePreview', status);
      function displayContents(err, text) {
        if (err) {
          // an error occurred, or the scan was canceled (error code `6`)
          console.log(err);
        } else {
          // The scan completed, display the contents of the QR code:
          window.QRScanner.pausePreview(function(status) {
            console.log('pausePreview', status);
            alert(text);
          });
        }
      }

      // W00t, you have camera access and the scanner is initialized.
      // QRscanner.show() should feel very fast.
      console.log('authorized', status.authorized);
      window.QRScanner.scan(displayContents);
    });

  render() {
    return (
      <div className="App">
        <div
          style={{
            border: '2px solid red',
            width: 250,
            height: 250
          }}
        />
        <button
          onClick={this.reset}
          style={{ position: 'absolute', left: 150, bottom: 50 }}
        >
          재시작
        </button>
      </div>
    );
  }
}

export default App;
