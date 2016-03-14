(function() {
  Polymer({
    is: 'aurora-video',
    behaviors: [Aurora.behaviors.base],
    properties: {
      video: {
        type: Object,
        observer: '_videoChanged'
      },
      allowSkipping: {
        type: Boolean
      }
    },
    listeners: {
      tap: '_onTap'
    },
    ready: function() {},
    _videoChanged: function(newVideo, oldVideo) {
      var videoFilePath;
      this._holdBgmPlaying();
      this._show();
      videoFilePath = this.app.resources.getResource('videos', newVideo).filePath;
      this.$.videoElement.src = videoFilePath;
      this.$.videoElement.addEventListener('ended', this._onVideoFinish.bind(this), false);
      return this.$.videoElement.play();
    },
    _onTap: function(e) {
      if (this.allowSkipping) {
        return this._finish();
      }
    },
    _holdBgmPlaying: function() {
      return this.app.bgm.pause();
    },
    _onVideoFinish: function(e) {
      return this._finish();
    },
    _finish: function() {
      this.$.videoElement.pause();
      this.app.bgm.play();
      this._hide();
      return this.app.storyController.jumpToNextNode();
    },
    _show: function() {
      return this.toggleClass('hide', false);
    },
    _hide: function() {
      return this.toggleClass('hide', true);
    }
  });

}).call(this);
