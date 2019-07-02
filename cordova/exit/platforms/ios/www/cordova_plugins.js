cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "kr.co.joycorp.cordova.exitapp.exitApp",
      "file": "plugins/kr.co.joycorp.cordova.exitapp/www/ExitApp.js",
      "pluginId": "kr.co.joycorp.cordova.exitapp",
      "merges": [
        "navigator.app"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.3",
    "kr.co.joycorp.cordova.exitapp": "1.0.0"
  };
});