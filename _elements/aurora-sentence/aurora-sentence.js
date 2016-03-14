(function() {
  Polymer({
    is: 'aurora-sentence',
    behaviors: [Aurora.behaviors.base],
    properties: {
      sentence: {
        type: String,
        observer: '_onSentenceChanged'
      }
    },
    attached: function() {},
    _onSentenceChanged: function(newSentence) {}
  });

}).call(this);
