(function() {
  Polymer({
    is: 'aurora-opening-screen',
    behaviors: [Aurora.behaviors.base, Polymer.NeonAnimationRunnerBehavior],
    properties: {
      animationConfig: {
        value: function() {
          return {
            exit: {
              name: 'fade-out-animation',
              node: this
            }
          };
        }
      }
    },
    listeners: {
      'neon-animation-finish': '_onAnimationFinish'
    },
    ready: function() {},
    _startBtnOnTap: function(e) {
      return this._fadeOut();
    },
    _fadeOut: function() {
      return this.playAnimation('exit');
    },
    _onAnimationFinish: function(e) {
      this._log("event triggered: animation-finish");
      this.app.storyController.startScript(this.app.story.scripts.main[0]);
      return this._removeSelfDom();
    }
  });

}).call(this);
