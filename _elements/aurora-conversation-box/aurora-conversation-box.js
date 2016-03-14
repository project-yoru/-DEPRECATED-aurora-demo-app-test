(function() {
  Polymer({
    is: 'aurora-conversation-box',
    behaviors: [Aurora.behaviors.base],
    properties: {
      node: {
        type: Object,
        observer: '_nodeChanged'
      }
    },
    listeners: {
      tap: '_onTapOnBox'
    },
    ready: function() {},
    _nodeChanged: function() {
      this.nodeTypeIsLine = this.node.type === 'line';
      this.nodeTypeIsNarrate = this.node.type === 'narrate';
      return this.nodeTypeIsOptions = this.node.type === 'options';
    },
    _roleNameOfLine: function(line) {
      if (line.role == null) {
        return;
      }
      return this.app.story.characters[line.role].name;
    },
    _onTapOnBox: function(e) {
      switch (this.node.type) {
        case 'line':
        case 'narrate':
          return this.app.storyController.jumpToNextNode();
      }
    },
    _onTapOnOption: function(e) {
      var getNodeById, option;
      getNodeById = (function(_this) {
        return function(id) {
          return _this.app.story.scripts.main.filter(function(node) {
            return node.id === id;
          })[0];
        };
      })(this);
      option = e.model.option;
      this.app.storyController.jumpToNode(getNodeById(option.next));
      return e.stopPropagation();
    }
  });

}).call(this);
