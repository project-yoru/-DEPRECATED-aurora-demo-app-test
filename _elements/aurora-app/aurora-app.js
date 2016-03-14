(function() {
  Polymer({
    is: 'aurora-app',
    behaviors: [Aurora.behaviors.base],
    created: function() {
      window.Aurora.app = this;
      this.config = {};
      this.resources = {};
      return this.story = {};
    },
    ready: function() {
      this.storyController = this.$.storyController;
      this.background = this.$.background;
      this.conversationBox = this.$.conversationBox;
      this.tachies = this.$.tachies;
      this.video = this.$.video;
      this.openingScreen = this.$.openingScreen;
      this.loadingScreen = this.$.loadingScreen;
      this.topBar = this.$.topBar;
      return this.bgm = this.$.bgm;
    },
    openDrawer: function() {
      var drawerPanel;
      drawerPanel = this.$$('paper-drawer-panel');
      return drawerPanel.openDrawer();
    }
  });

}).call(this);
