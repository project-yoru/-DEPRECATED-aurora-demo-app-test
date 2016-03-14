(function() {
  var Aurora;

  Aurora = window.Aurora;

  if (Aurora.behaviors == null) {
    Aurora.behaviors = {};
  }

  Aurora.behaviors.base = {
    properties: {},
    created: function() {
      Aurora.utilities.log("component " + this.nodeName + " getting created");
      if (this.nodeName !== 'AURORA-APP') {
        return this._getGlobalVars();
      }
    },
    ready: function() {
      return Aurora.utilities.log("component " + this.nodeName + " getting ready");
    },
    _getGlobalVars: function() {
      return this.app = Aurora.app;
    },
    _removeSelfDom: function() {
      return Polymer.dom(this.parentNode).removeChild(this);
    },
    _log: function(message) {
      return Aurora.utilities.log(this.nodeName + ": " + message);
    }
  };

}).call(this);
