(function() {
  Polymer({
    is: 'aurora-bgm',
    behaviors: [Aurora.behaviors.base, Polymer.NeonAnimationRunnerBehavior],
    properties: {
      musicName: {
        type: String,
        observer: '_musicNameChanged'
      },
      music: {
        type: Object,
        observer: '_musicChanged'
      },
      showed: {
        type: Boolean,
        value: false
      },
      animationConfig: {
        value: function() {
          return {
            entry: {
              name: 'fade-in-animation',
              node: this,
              timing: {
                delay: 0,
                duration: 500
              }
            },
            exit: {
              name: 'fade-out-animation',
              node: this,
              timing: {
                delay: 0,
                duration: 500
              }
            }
          };
        }
      }
    },
    play: function() {
      this.$.audioElement.play();
      return this._showMusicName();
    },
    pause: function() {
      return this.$.audioElement.pause();
    },
    _showMusicName: function() {
      if (this.exitAnimationTask != null) {
        this.cancelAsync(this.exitAnimationTask);
      }
      if (this.showed !== true) {
        this.toggleAttribute('hidden', false);
        this.playAnimation('entry');
        this.showed = true;
      }
      return this.exitAnimationTask = this.async((function(_this) {
        return function() {
          return _this._hideMusicName();
        };
      })(this), 5000);
    },
    _hideMusicName: function() {
      this.playAnimation('exit');
      return this.async((function(_this) {
        return function() {
          _this.toggleAttribute('hidden', true);
          return _this.showed = false;
        };
      })(this), 475);
    },
    _musicNameChanged: function() {
      return this.music = this.app.resources.getResource('music', this.musicName);
    },
    _musicChanged: function() {
      this.$.audioElement.src = this.music.filePath;
      return this.play();
    }
  });

}).call(this);
