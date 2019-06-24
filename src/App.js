import React, { Component } from 'react';
import './App.css';

function successCallback(res) {
  console.log(res);
  alert('Authentication successfull');
}

function errorCallback(err) {
  alert('Authentication invalid ' + err);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  }

  onDeviceReady = () => {
    window.Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);

    function isAvailableSuccess(result) {
      /*
      result depends on device and os. 
      iPhone X will return 'face' other Android or iOS devices will return 'finger'  
      */
      alert('Fingerprint available');
    }

    function isAvailableError(message) {
      alert(message);
    }

    this.setState({ data: window.Fingerprint });
  };

  processData = data => {
    console.log(data);
    const arr = [];
    for (let i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        arr.push({
          key: i,
          data: data[i]
        });
      }
    }
    console.log(arr);
    return arr;
  };

  renderData = data => {
    return data.map(item => (
      <ul key={item.key}>
        <li>{item.key}</li>
        <li>
          {typeof item.data === 'boolean'
            ? item.data
              ? 'true'
              : 'false'
            : item.data}
        </li>
      </ul>
    ));
  };

  render() {
    const { data } = this.state;

    if (!data) return null;

    const res = this.processData(data);

    return (
      <div className="App">
        {this.renderData(res)}
        <button
          style={{ marginTop: 100 }}
          onClick={() => {
            window.Fingerprint.show(
              {
                clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
                locale: 'ko-KR',
                clientSecret: 'o7aoOMYUbyxaD23oFAnJ',
                dialogTitle: '하이페이'
              },
              successCallback,
              errorCallback
            );
          }}
        >
          하이페이 앱으로 돌아가기
        </button>
      </div>
    );
  }
}

export default App;
