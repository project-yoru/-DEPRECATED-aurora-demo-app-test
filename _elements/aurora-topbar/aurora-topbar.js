(function() {
  Polymer({
    is: 'aurora-topbar',
    behaviors: [Aurora.behaviors.base, Polymer.NeonAnimationRunnerBehavior],
    properties: {
      animationConfig: {
        value: function() {
          return {
            show: [
              {
                name: 'fade-in-animation',
                node: this,
                timing: {
                  delay: 500,
                  duration: 1000
                }
              }
            ]
          };
        }
      }
    },
    listeners: {
      'neon-animation-finish': '_onAnimationFinish'
    },
    ready: function() {},
    show: function() {
      this.style.opacity = 0;
      this.toggleClass('hide', false);
      return this.playAnimation('show');
    },
    _onAnimationFinish: function(e) {
      return this.style.opacity = 1;
    },
    _onDrawerBtnTap: function(e) {
      return this.app.openDrawer();
    }
  });

}).call(this);
