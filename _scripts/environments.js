(function() {
  var Aurora;

  Aurora = window.Aurora;

  Aurora.env || (Aurora.env = {});

  Aurora.env.debugging = true;

  Aurora.env.platform = {
    isPhonegap: false,
    device: void 0
  };

  document.addEventListener('deviceready', (function() {
    Aurora.env.platform.isPhonegap = true;
    return Aurora.env.device = window.device;
  }), false);

}).call(this);
