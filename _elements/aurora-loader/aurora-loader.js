(function() {
  Polymer({
    is: 'aurora-loader',
    behaviors: [Aurora.behaviors.base],
    ready: function() {
      var category, i, len, manifests, ref;
      this._resourcesCategories = ['backgrounds', 'images', 'music', 'sounds', 'tachies', 'videos', 'voices'];
      manifests = {
        config: {
          path: 'config/',
          manifest: [
            {
              id: 'config-application',
              src: 'application.json'
            }, {
              id: 'config-custom',
              src: 'custom.json'
            }
          ]
        },
        story: {
          path: 'story/',
          manifest: [
            {
              id: 'story-characters',
              src: 'characters.json'
            }, {
              id: 'story-scripts-main',
              src: 'scripts/main.json'
            }
          ]
        }
      };
      this.loadingQueue = new createjs.LoadQueue(true);
      this.loadingQueue.on('fileload', this._fileLoaded, this);
      this.loadingQueue.on('complete', this._loadingCompleted, this);
      this.loadingQueue.loadManifest(manifests.config, false);
      this.loadingQueue.loadManifest(manifests.story, false);
      ref = this._resourcesCategories;
      for (i = 0, len = ref.length; i < len; i++) {
        category = ref[i];
        this.loadingQueue.loadFile({
          id: "resources-meta-" + category,
          src: "resources/" + category + "/" + category + ".json"
        }, false);
      }
      this._log('starting loading');
      return this.loadingQueue.load();
    },
    _fileLoaded: function(e) {
      var base, category, fileContent, fileId, filePath, item, resourceKey;
      item = e.item;
      fileId = item.id;
      filePath = item.src;
      fileContent = e.result;
      this._log("file loaded: " + fileId + ", " + filePath);
      if (fileId.startsWith('resources-meta-')) {
        category = _.replace(fileId, 'resources-meta-', '');
        this._resourcesMetaLoaded(category, fileContent);
        return;
      }
      if (fileId.startsWith('resource-')) {
        category = fileId.split('-')[1];
        resourceKey = _.replace(fileId, "resource-" + category + "-", '');
        this._resourceContentLoaded(category, resourceKey, filePath, fileContent);
        return;
      }
      switch (fileId) {
        case 'config-application':
          return this.app.config.application = fileContent;
        case 'story-characters':
          return this.app.story.characters = fileContent;
        case 'story-scripts-main':
          if ((base = this.app.story).scripts == null) {
            base.scripts = {};
          }
          return this.app.story.scripts.main = fileContent;
      }
    },
    _resourcesMetaLoaded: function(category, metaContent) {
      var base, character, filesToListInManifest, resourceKey, tachieAlter;
      this._log("resources meta for " + category + " loaded");
      if ((base = this.app.resources)[category] == null) {
        base[category] = {};
      }
      this.app.resources[category]['meta'] = metaContent;
      if (category !== 'tachies') {
        filesToListInManifest = [];
        for (resourceKey in metaContent) {
          filesToListInManifest.push({
            id: "resource-" + category + "-" + resourceKey,
            src: metaContent[resourceKey].fileName
          });
        }
      } else {
        filesToListInManifest = [];
        for (character in metaContent) {
          for (tachieAlter in metaContent[character]) {
            filesToListInManifest.push({
              id: "resource-tachies-" + character + "-" + tachieAlter,
              src: character + "/" + metaContent[character][tachieAlter].fileName
            });
          }
        }
      }
      this._log("resources manifest for " + category + " builded, starting loading");
      return this.loadingQueue.loadManifest({
        path: "resources/" + category + "/",
        manifest: filesToListInManifest
      });
    },
    _resourceContentLoaded: function(category, key, path, content) {
      var base;
      if ((base = this.app.resources[category])[key] == null) {
        base[key] = {};
      }
      this.app.resources[category][key]['filePath'] = path;
      return _.merge(this.app.resources[category][key], this.app.resources[category]['meta'][key]);
    },
    _loadingCompleted: function(e) {
      this._log('loading queue completed');
      this.app.resources.getResource = (function(_this) {
        return function(category, key) {
          _this._log("getting resources: " + category + ", " + key);
          return _this.app.resources[category][key];
        };
      })(this);
      return this.app.storyController.start();
    }
  });

}).call(this);
