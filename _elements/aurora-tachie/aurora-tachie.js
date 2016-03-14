(function() {
  Polymer({
    is: 'aurora-tachie',
    behaviors: [Aurora.behaviors.base, Polymer.NeonAnimationRunnerBehavior],
    properties: {
      tachie: {
        type: Object,
        observer: '_tachieChanged'
      },
      currentTachieResource: {
        type: Object
      },
      animationConfig: {
        value: function() {
          return {
            entry: {
              name: 'fade-in-animation',
              node: this
            },
            exit: {
              name: 'fade-out-animation',
              node: this
            }
          };
        }
      }
    },
    listeners: {
      'neon-animation-finish': '_onNeonAnimationFinish'
    },
    _tachieChanged: function(newTachie, oldTachie) {
      var characterName, resourceKey, tachieAlter;
      characterName = Object.keys(this.tachie)[0];
      tachieAlter = this.tachie[characterName];
      resourceKey = characterName + "-" + tachieAlter;
      this.newTachieResource = this.app.resources.getResource('tachies', resourceKey);
      if (this.newTachieResource !== this.currentTachieResource) {
        if (this.currentTachieResource == null) {
          return this._setImageSrcAndfadeIn();
        } else {
          return this._fadeOut();
        }
      }
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
    },
    _setImageSrcAndfadeIn: function() {
      this.currentTachieResource = this.newTachieResource;
      return this._fadeIn();
    }
  });

}).call(this);
