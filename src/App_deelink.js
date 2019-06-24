import React, { Component } from 'react';
import './App.css';

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
    window.universalLinks.subscribe('openNewsListPage', function(eventData) {
      // do some work
      console.log('Did launch application from the link: ' + eventData.url);
    });
    this.setState({ data: window.device });
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
    // const { data } = this.state;
    //
    // if (!data) return null;
    //
    // const res = this.processData(data);

    return (
      <div className="App">
      <button
        style={{ marginTop: 100 }}
        onClick={() => window.open('android-app://io.hipay.com/http/myhost.com/auth/nice?isNice=OK')}
      >
        하이페이 앱으로 돌아가기
      </button>
      </div>
    );
  }
}

export default App;
