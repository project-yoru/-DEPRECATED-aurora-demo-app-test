(function() {
  Polymer({
    is: 'aurora-loading-screen',
    behaviors: [Aurora.behaviors.base, Polymer.NeonAnimationRunnerBehavior],
    properties: {
      animationConfig: {
        value: function() {
          return {
            show: [
              {
                name: 'fade-in-animation',
                node: this.$.auroraLogo,
                timing: {
                  duration: 500
                }
              }, {
                name: 'fade-in-animation',
                node: this.$.spinner,
                timing: {
                  delay: 300
                }
              }
            ],
            exit: {
              name: 'fade-out-animation',
              node: this,
              timing: {
                duration: 400
              }
            }
          };
        }
      }
    },
    listeners: {
      'neon-animation-finish': '_onAnimationFinish'
    },
    ready: function() {
      this._waitedEnoughTimeBeforeFadeOut = false;
      this._triedToFadeOut = false;
      return this.async((function(_this) {
        return function() {
          if (_this._triedToFadeOut) {
            _this.fadeOut();
          } else {
            return _this._waitedEnoughTimeBeforeFadeOut = true;
          }
        };
      })(this), 1000);
    },
    attached: function() {
      return this.playAnimation('show');
    },
    tryFadeOut: function() {
      if (this._waitedEnoughTimeBeforeFadeOut) {
        this.fadeOut();
      } else {
        return this._triedToFadeOut = true;
      }
    },
    fadeOut: function() {
      this._animationStatus = 'fading_out';
      return this.playAnimation('exit');
    },
    _onAnimationFinish: function(e) {
      if (this._animationStatus !== 'fading_out') {
        return;
      }
      this.app.storyController.onOpeningScreenShown();
      return this._removeSelfDom();
    }
  });

}).call(this);
