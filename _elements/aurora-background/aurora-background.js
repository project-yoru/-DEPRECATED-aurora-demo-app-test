(function() {
  Polymer({
    is: 'aurora-background',
    behaviors: [Aurora.behaviors.base, Polymer.NeonAnimationRunnerBehavior],
    properties: {
      options: {
        type: Object,
        observer: '_optionsChanged'
      },
      currentBackground: {
        type: Object
      },
      entryAnimation: {
        value: 'fade-in-animation'
      },
      exitAnimation: {
        value: 'fade-out-animation'
      }
    },
    listeners: {
      'neon-animation-finish': '_onNeonAnimationFinish'
    },
    _optionsChanged: function(newOptions, oldOptions) {
      this.newBackground = this.app.resources.getResource('backgrounds', this.options.name);
      if (this.newBackground !== this.currentBackground) {
        if (this.currentBackground == null) {
          return this._setImageSrcAndfadeIn();
        } else {
          return this._fadeOut();
        }
      }
    },
    _setImageSrcAndfadeIn: function() {
      this.currentBackground = this.newBackground;
      this.style.backgroundImage = "url('" + this.currentBackground.filePath + "')";
      return this._fadeIn();
    },
    _onNeonAnimationFinish: function(e) {
      switch (this._animationState) {
        case 'fading_in':
          return this._animationState = void 0;
        case 'fading_out':
          return this._setImageSrcAndfadeIn();
      }
    },
    _fadeOut: function() {
      this._animationState = 'fading_out';
      return this.playAnimation('exit');
    },
    _fadeIn: function() {
      this._animationState = 'fading_in';
      return this.playAnimation('entry');
    }
  });

}).call(this);
