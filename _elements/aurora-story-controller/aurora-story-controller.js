(function() {
  Polymer({
    is: 'aurora-story-controller',
    behaviors: [Aurora.behaviors.base],
    properties: {
      node: {
        type: Object,
        observer: '_nodeChanged'
      }
    },
    ready: function() {},
    start: function() {
      var music, ref, ref1;
      this.app.loadingScreen.tryFadeOut();
      if ((music = (ref = this.app.resources.custom) != null ? (ref1 = ref.opening) != null ? ref1.bgm : void 0 : void 0) != null) {
        return this.app.bgm.musicName = music;
      }
    },
    onOpeningScreenShown: function() {
      return this.app.topBar.show();
    },
    _nodeChanged: function(newNode, oldNode) {
      return this._renderNode(this.node);
    },
    startScript: function(node) {
      return this.node = node;
    },
    _renderNode: function(node) {
      if (node.type === 'video') {
        this.app.video.allowSkipping = node.allowSkipping;
        this.app.video.video = node.video;
        return;
      }
      if (node.background != null) {
        this.app.background.options = node.background;
      }
      if (node.tachies != null) {
        this.app.tachies.tachies = node.tachies;
      }
      this.app.conversationBox.node = node;
      if (node.bgm != null) {
        return this.app.bgm.musicName = node.bgm;
      }
    },
    jumpToNode: function(node) {
      return this.node = node;
    },
    jumpToNextNode: function() {
      var getNodeById;
      if (!((this.node != null) && (this.node.next != null))) {
        return;
      }
      getNodeById = (function(_this) {
        return function(id) {
          return _this.app.story.scripts.main.filter(function(node) {
            return node.id === id;
          })[0];
        };
      })(this);
      return this.node = getNodeById(this.node.next);
    }
  });

}).call(this);
