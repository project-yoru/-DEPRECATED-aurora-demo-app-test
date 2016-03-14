(function() {
  Polymer({
    is: 'aurora-tachies',
    behaviors: [Aurora.behaviors.base],
    properties: {
      tachies: {
        type: Array,
        observer: '_tachiesChanged'
      }
    },
    ready: function() {},
    _tachiesChanged: function(newTachies, oldTachies) {}
  });

}).call(this);
