(function() {
  window.addElement = function(container, tagName, attrs) {
    var fjs, k, tag, v;
    if (attrs == null) {
      attrs = {};
    }
    if (attrs.id && container.getElementById(attrs.id)) {
      return container.getElementById(attrs.id);
    }
    fjs = container.getElementsByTagName(tagName)[0];
    tag = container.createElement(tagName);
    for (k in attrs) {
      v = attrs[k];
      tag[k] = v;
    }
    fjs.parentNode.insertBefore(tag, fjs);
    return tag;
  };

  window.log = function() {
    return console.log(arguments);
  };

  Storage.prototype.setObject = function(key, value) {
    return this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = function(key) {
    var value;
    if (!(value = this.getItem(key))) {
      return;
    }
    return JSON.parse(value);
  };

}).call(this);

(function() {
  if (GLOBALS.WEINRE_ADDRESS && (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) && !navigator.platform.match(/MacIntel/i)) {
    window.addElement(document, "script", {
      id: "weinre-js",
      src: "http://" + GLOBALS.WEINRE_ADDRESS + "/target/target-script-min.js#anonymous"
    });
  }

}).call(this);

(function() {
  var app;

  app = angular.module(GLOBALS.ANGULAR_APP_NAME, [GLOBALS.ANGULAR_APP_NAME + ".templates", "ionic", "angulartics.google.analytics", "angulartics.google.analytics.cordova"]);

}).call(this);

(function() {
  var app, k, v;

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  GLOBALS.APP_ROOT = location.href.replace(location.hash, "").replace("index.html", "");

  for (k in GLOBALS) {
    v = GLOBALS[k];
    app.constant(k, v);
  }

  app.run(function($rootScope) {
    return $rootScope.GLOBALS = GLOBALS;
  });

}).call(this);

(function() {
  var app;

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  ionic.Platform.ready(function() {
    if (GLOBALS.ENV !== "test") {
      console.log('ionic.Platform is ready! Running `angular.bootstrap()`...');
    }
    return angular.bootstrap(document, [GLOBALS.ANGULAR_APP_NAME]);
  });

  app.run(function($log, $timeout) {
    if (GLOBALS.ENV !== "test") {
      $log.debug("Ionic app \"" + GLOBALS.ANGULAR_APP_NAME + "\" has just started (app.run)!");
    }
    return $timeout(function() {
      var ref;
      return (ref = navigator.splashscreen) != null ? ref.hide() : void 0;
    });
  });

}).call(this);

(function() {
  var app;

  if (!GLOBALS.CORDOVA_GOOGLE_ANALYTICS_ID) {
    return;
  }

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  ionic.Platform.ready(function() {
    return app.config(function(googleAnalyticsCordovaProvider) {
      googleAnalyticsCordovaProvider.debug = GLOBALS.ENV !== 'production';
      return googleAnalyticsCordovaProvider.trackingId = GLOBALS.CORDOVA_GOOGLE_ANALYTICS_ID;
    });
  });

}).call(this);

(function() {
  var app;

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  app.config(function($httpProvider) {
    var base;
    $httpProvider.useApplyAsync(true);
    (base = $httpProvider.defaults.headers).patch || (base.patch = {});
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common["X-Api-Version"] = "1.0";
    return $httpProvider.interceptors.push(function($injector, $q, $log, $location) {
      return {
        responseError: function(response) {
          if (GLOBALS.ENV !== "test") {
            $log.debug("httperror: ", response.status);
          }
          if (response.status === 401) {
            $injector.invoke(function(Auth) {
              Auth.setAuthToken(null, null);
              return $location.path("/");
            });
          }
          return $q.reject(response);
        }
      };
    });
  });

}).call(this);

(function() {
  var app;

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(4);
    $ionicConfigProvider.templates.maxPrefetch(false);
    if (ionic.Platform.grade !== "a") {
      $ionicConfigProvider.views.transition("none");
      return $ionicConfigProvider.views.maxCache(2);
    }
  });

}).call(this);

(function() {
  var app;

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  app.config(function($logProvider, $compileProvider) {
    if (GLOBALS.ENV === "production") {
      $logProvider.debugEnabled(false);
      return $compileProvider.debugInfoEnabled(false);
    }
  });

}).call(this);

(function() {
  var app;

  if (window.Rollbar == null) {
    return;
  }

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  app.factory('$exceptionHandler', function($log) {
    return function(e, cause) {
      $log.error(e.message);
      return Rollbar.error(e);
    };
  });

  Rollbar.configure({
    payload: {
      deploy_time: GLOBALS.DEPLOY_TIME,
      deploy_date: moment(GLOBALS.DEPLOY_TIME).format(),
      bundle_name: GLOBALS.BUNDLE_NAME,
      bundle_version: GLOBALS.BUNDLE_VERSION
    },
    transform: function(payload) {
      var frame, frames, i, len, ref, ref1, ref2, results;
      if (frames = (ref = payload.data) != null ? (ref1 = ref.body) != null ? (ref2 = ref1.trace) != null ? ref2.frames : void 0 : void 0 : void 0) {
        results = [];
        for (i = 0, len = frames.length; i < len; i++) {
          frame = frames[i];
          results.push(frame.filename = frame.filename.replace(GLOBALS.APP_ROOT, GLOBALS.ROLLBAR_SOURCEMAPS_URL_PREFIX + "/"));
        }
        return results;
      }
    }
  });

  app.run(function(Auth) {
    return Auth.on("user.updated", function(user) {
      return Rollbar.configure({
        payload: {
          person: (user ? {
            id: user.id,
            email: user.email
          } : void 0)
        }
      });
    });
  });

  app.run(function(onRouteChangeCallback) {
    return onRouteChangeCallback(function(state) {
      return Rollbar.configure({
        payload: {
          context: state.name
        }
      });
    });
  });

}).call(this);

(function() {
  if (GLOBALS.WEINRE_ADDRESS && (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) && !navigator.platform.match(/MacIntel/i)) {
    window.addElement(document, "script", {
      id: "weinre-js",
      src: "http://" + GLOBALS.WEINRE_ADDRESS + "/target/target-script-min.js#anonymous"
    });
  }

}).call(this);

(function() {
  var app;

  app = angular.module(GLOBALS.ANGULAR_APP_NAME);

  app.run(function($window, $injector) {
    return $window.$a = $injector.get;
  });

}).call(this);

(function() {
  angular.module("synthesizer").directive('synthNode', function() {
    return {
      restrict: 'A',
      require: '^o-key',
      template: '<div>aksjdnakjsndkjn</div>'
    };
  });

}).call(this);

(function() {
  angular.module("synthesizer").factory('FormFactory', function($q) {

    /*
    Basic form class that you can extend in your actual forms.
    
    Object attributes:
    - loading[Boolean] - is the request waiting for response?
    - message[String] - after response, success message
    - errors[String[]] - after response, error messages
    
    Options:
      - submitPromise[function] (REQUIRED) - creates a form request promise
      - onSuccess[function] - will be called on succeded promise
      - onFailure[function] - will be called on failed promise
     */
    var FormFactory;
    return FormFactory = (function() {
      function FormFactory(options) {
        this.options = options != null ? options : {};
        this.loading = false;
      }

      FormFactory.prototype.submit = function() {
        if (!this.loading) {
          return this._handleRequestPromise(this._createSubmitPromise());
        }
      };

      FormFactory.prototype._onSuccess = function(response) {
        this.message = response.message || response.success;
        return response;
      };

      FormFactory.prototype._onFailure = function(response) {
        var ref, ref1, ref2, ref3, ref4;
        this.errors = ((ref = response.data) != null ? (ref1 = ref.data) != null ? ref1.errors : void 0 : void 0) || ((ref2 = response.data) != null ? ref2.errors : void 0) || [((ref3 = response.data) != null ? ref3.error : void 0) || response.error || ((ref4 = response.data) != null ? ref4.message : void 0) || response.message || "Something has failed. Try again."];
        return $q.reject(response);
      };

      FormFactory.prototype._createSubmitPromise = function() {
        return this.options.submitPromise();
      };

      FormFactory.prototype._handleRequestPromise = function($promise, onSuccess, onFailure) {
        this.$promise = $promise;
        this.loading = true;
        this.submitted = false;
        this.message = null;
        this.errors = [];
        this.$promise.then((function(_this) {
          return function(response) {
            _this.errors = [];
            _this.submitted = true;
            return response;
          };
        })(this)).then(_.bind(this._onSuccess, this)).then(onSuccess || this.options.onSuccess)["catch"](_.bind(this._onFailure, this))["catch"](onFailure || this.options.onFailure)["finally"]((function(_this) {
          return function() {
            return _this.loading = false;
          };
        })(this));
        return this.$promise;
      };

      return FormFactory;

    })();
  });

}).call(this);

(function() {
  var slice = [].slice;

  angular.module("synthesizer").factory('ObserverFactory', function($rootScope) {
    var ObserverFactory;
    return ObserverFactory = (function() {
      function ObserverFactory() {}

      ObserverFactory.prototype.on = function(eventName, listener) {
        var base;
        if (this.listeners == null) {
          this.listeners = {};
        }
        if ((base = this.listeners)[eventName] == null) {
          base[eventName] = [];
        }
        return this.listeners[eventName].push(listener);
      };

      ObserverFactory.prototype.once = function(eventName, listener) {
        listener.__once__ = true;
        return this.on(eventName, listener);
      };

      ObserverFactory.prototype.off = function(eventName, listener) {
        var i, j, len, ref, ref1, results, v;
        if (!((ref = this.listeners) != null ? ref[eventName] : void 0)) {
          return;
        }
        if (!listener) {
          return delete this.listeners[eventName];
        }
        ref1 = this.listeners[eventName];
        results = [];
        for (v = j = 0, len = ref1.length; j < len; v = ++j) {
          i = ref1[v];
          if (this.listeners[eventName] === listener) {
            this.listeners.splice(i, 1);
            break;
          } else {
            results.push(void 0);
          }
        }
        return results;
      };

      ObserverFactory.prototype.fireEvent = function() {
        var eventName, j, len, params, ref, ref1, ref2, v;
        eventName = arguments[0], params = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        if (!((ref = this.listeners) != null ? (ref1 = ref[eventName]) != null ? ref1.length : void 0 : void 0)) {
          return;
        }
        ref2 = this.listeners[eventName];
        for (j = 0, len = ref2.length; j < len; j++) {
          v = ref2[j];
          v.apply(this, params);
          if (v.__once__) {
            this.off(eventName, v);
          }
        }
        if (!$rootScope.$$phase) {
          return $rootScope.$apply();
        }
      };

      return ObserverFactory;

    })();
  });

}).call(this);

(function() {
  angular.module("synthesizer").factory('PromiseFactory', function($q) {
    var constructor;
    return constructor = function(value, resolve) {
      var deferred;
      if (resolve == null) {
        resolve = true;
      }
      if ((value != null) && typeof (value != null ? value.then : void 0) === 'function') {
        return value;
      } else {
        deferred = $q.defer();
        if (resolve) {
          deferred.resolve(value);
        } else {
          deferred.reject(value);
        }
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  Array.prototype.contains = function(item) {
    return this.indexOf(item !== -1);
  };

}).call(this);

(function() {
  window._ = {};

  window._.defined = function(obj) {
    return typeof obj !== 'undefined';
  };

}).call(this);

(function() {
  String.prototype.isNodeKey = function() {
    return this.length === 1 && this.match(/[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]/i);
  };

}).call(this);

(function() {
  angular.module("synthesizer").service('Auth', function($http, PromiseFactory) {
    var Auth, USER_EMAIL_CACHE_KEY, USER_TOKEN_CACHE_KEY;
    USER_EMAIL_CACHE_KEY = "user_email";
    USER_TOKEN_CACHE_KEY = "user_token";
    return new (Auth = (function() {
      function Auth() {
        this.setAuthToken(localStorage.getItem(USER_EMAIL_CACHE_KEY), localStorage.getItem(USER_TOKEN_CACHE_KEY));
      }

      Auth.prototype.setAuthToken = function(email, token, user) {
        this.email = email != null ? email : null;
        this.token = token != null ? token : null;
        if (this.email && this.token) {
          $http.defaults.headers.common["X-User-Email"] = this.email;
          $http.defaults.headers.common["X-User-Token"] = this.token;
          localStorage.setItem(USER_EMAIL_CACHE_KEY, this.email);
          localStorage.setItem(USER_TOKEN_CACHE_KEY, this.token);
        } else {
          delete $http.defaults.headers.common["X-User-Email"];
          delete $http.defaults.headers.common["X-User-Token"];
          localStorage.removeItem(USER_EMAIL_CACHE_KEY);
          localStorage.removeItem(USER_TOKEN_CACHE_KEY);
        }
        return this.refreshUser(user);
      };

      Auth.prototype.refreshUser = function(user) {
        if (user == null) {
          user = null;
        }
        return this.user = user ? (user.$promise = PromiseFactory(user), user.$resolved = true, user) : this.email && this.token ? void 0 : null;
      };

      Auth.prototype.isSignedIn = function() {
        return !!this.token;
      };

      Auth.prototype.resetSession = function() {
        return this.setAuthToken(null, null);
      };

      return Auth;

    })());
  });

}).call(this);

(function() {
  angular.module("synthesizer").controller("PatchDetailCtrl", function($scope, $stateParams, PetService) {
    return $scope.pet = PetService.get($stateParams.petId);
  });

}).call(this);

(function() {
  angular.module("synthesizer").controller("PatchIndexCtrl", function($scope, BoardService) {
    return $scope.boards = BoardService.all();
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("PatchService", function() {
    var patches;
    patches = [
      {
        id: 0,
        title: "Cats",
        description: "Furry little creatures. Obsessed with plotting assassination, but never following through on it."
      }, {
        id: 1,
        title: "Dogs",
        description: "Lovable. Loyal almost to a fault. Smarter than they let on."
      }, {
        id: 2,
        title: "Turtles",
        description: "Everyone likes turtles."
      }, {
        id: 3,
        title: "Sharks",
        description: "An advanced pet. Needs millions of gallons of salt water. Will happily eat you."
      }
    ];
    return {
      all: function() {
        return patches;
      },
      get: function(patchId) {
        return patches[patchId];
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("AudioAnalyzerService", function($window, AudioContextService) {
    var analyzer, context;
    context = AudioContextService.getContext();
    analyzer = context.createAnalyser();
    analyzer.connect(context.destination);
    return {
      getAnalyzer: function() {
        return analyzer;
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("AudioContextService", function($window) {
    var context, nodes;
    nodes = {};
    context = new ($window.AudioContext || $window.webkitAudioContext)();
    return {
      getContext: function() {
        return context;
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("LoopService", function() {
    var Node, nodes;
    nodes = {};
    Node = (function() {
      function Node(key) {
        this.key = key;
      }

      Node.prototype.silence = function(velocity) {
        return console.log(velocity);
      };

      Node.prototype.activate = function(velocity) {
        return console.log(velocity);
      };

      return Node;

    })();
    return {
      all: function() {
        return [];
      },
      nodeForKey: function(nodeKey) {
        return new Node(nodeKey);
      },
      silence: function(nodeKey) {
        return node[patchId].silence();
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  angular.module("synthesizer").factory("NodeService", function(OscillatorService, TimeService, RecordService, TrackService, LoopService) {
    var IvoryNode, Node, RecordNode, control_keys, ivory_keys, record_key;
    Node = (function() {
      function Node(key1) {
        this.key = key1;
        this.active = false;
      }

      Node.prototype.silence = function(velocity) {
        return this.active = false;
      };

      Node.prototype.sustain = function(velocity) {
        return console.log(this.key);
      };

      Node.prototype.activate = function(velocity) {
        if (this.active) {
          return this.sustain(velocity);
        } else {
          return this.active = true;
        }
      };

      return Node;

    })();
    IvoryNode = (function(superClass) {
      extend(IvoryNode, superClass);

      function IvoryNode(key1, frequency) {
        this.key = key1;
        this.frequency = frequency;
        IvoryNode.__super__.constructor.call(this, this.key);
      }

      IvoryNode.prototype.activate = function(velocity) {
        if (!this.active) {
          console.log('note on' + this.key);
          OscillatorService.nodeOn(this);
        }
        return IvoryNode.__super__.activate.call(this, velocity);
      };

      IvoryNode.prototype.silence = function(velocity) {
        OscillatorService.nodeOff(this);
        return IvoryNode.__super__.silence.call(this);
      };

      return IvoryNode;

    })(Node);
    RecordNode = (function(superClass) {
      extend(RecordNode, superClass);

      function RecordNode(key1) {
        this.key = key1;
        RecordNode.__super__.constructor.call(this, this.key);
      }

      RecordNode.prototype.activate = function(velocity) {
        RecordNode.__super__.activate.call(this, velocity);
        return RecordService.startRecording();
      };

      RecordNode.prototype.silence = function(velocity) {
        OscillatorService.nodeOff(this);
        RecordService.startRecording();
        return RecordNode.__super__.silence.call(this);
      };

      return RecordNode;

    })(Node);
    ivory_keys = "abcdefghijklmnopqrstuvwxyz1234567890";
    control_keys = ",./;[]`-='← → ↑ ↓";
    record_key = " ";
    return {
      initializeNodes: function() {
        var i, key, len, nodes, ref;
        nodes = {};
        ref = ivory_keys.toUpperCase().split('');
        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          nodes[key] = new IvoryNode(key, OscillatorService.frequencyForKey(key));
        }
        nodes[record_key] = new RecordNode(record_key);
        return nodes;
      },
      nodeForKey: function(key) {
        return this.nodes[key];
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("OscillatorService", function(AudioContextService, AudioAnalyzerService) {
    var audioContext, oscillators;
    audioContext = AudioContextService.getContext();
    oscillators = [];
    return {
      initializeOscillators: function() {
        var addOscillator;
        addOscillator = function(type) {
          var analyzer, osc;
          osc = audioContext.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = 0;
          analyzer = AudioAnalyzerService.getAnalyzer();
          osc.connect(analyzer);
          osc.start();
          return oscillators.push(osc);
        };
        addOscillator('sin');
        addOscillator('sin');
        addOscillator('sin');
        addOscillator('sin');
        addOscillator('sin');
        return addOscillator('sin');
      },
      fetchOscillator: function(node) {
        var i, len, osc;
        for (i = 0, len = oscillators.length; i < len; i++) {
          osc = oscillators[i];
          if (_.defined(osc.originNode)) {
            if (osc.originNode.key === node.key && node.active) {
              return osc;
            }
          } else if (!node.active) {
            return osc;
          }
        }
      },
      nodeOn: function(node) {
        var osc;
        osc = this.fetchOscillator(node);
        osc.originNode = node;
        return osc.frequency.value = node.frequency;
      },
      nodeOff: function(node) {
        var osc;
        osc = this.fetchOscillator(node);
        osc.frequency.value = 0;
        return delete osc.originNode;
      },
      frequencyForKey: function(key) {
        var ratioDictionary, root;
        root = 100;
        ratioDictionary = {
          Z: 1,
          X: 256 / 243,
          C: 16 / 15,
          V: 10 / 9,
          B: 9 / 8,
          N: 32 / 27,
          M: 6 / 5,
          A: 5 / 4,
          S: 81 / 64,
          D: 4 / 3,
          F: 27 / 20,
          G: 45 / 32,
          H: 729 / 512,
          J: 3 / 2,
          K: 128 / 81,
          L: 8 / 5,
          Q: 5 / 3,
          W: 27 / 16,
          E: 16 / 9,
          R: 9 / 5,
          T: 15 / 8,
          Y: 243 / 128,
          U: 2,
          I: 20 / 9,
          O: 42 / 7,
          P: 42 / 7,
          1: 42 / 7,
          2: 42 / 7,
          3: 42 / 7,
          4: 42 / 7,
          5: 42 / 7,
          6: 42 / 7,
          7: 42 / 7,
          8: 42 / 7,
          9: 42 / 7,
          0: 42 / 7
        };
        return root * ratioDictionary[key];
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("RecordService", function() {
    return {
      startRecording: function(o) {
        return console.log('start');
      },
      stopRecording: function(o) {
        return console.log('stop');
      }
    };
  });

}).call(this);

(function() {
  angular.module("synthesizer").controller("SynthCtrl", function($scope, $stateParams, SynthService, AudioVisualizerService) {
    var findNodeKey;
    $scope.nodes = SynthService.nodes;
    $scope.activateNode = function(key) {
      return SynthService.activate(key);
    };
    $scope.silenceNode = function(key) {
      return SynthService.silence(key);
    };
    $scope.keyPress = function() {
      return console.log('up');
    };
    $scope.keyRelease = function() {
      return console.log('down');
    };
    findNodeKey = function(e) {
      var charCode;
      e = e || window.event;
      charCode = typeof e.which === 'number' ? e.which : e.keyCode;
      switch (false) {
        case charCode !== 37:
          return '←';
        case charCode !== 38:
          return '↑';
        case charCode !== 39:
          return '→';
        case charCode !== 40:
          return '↓';
        default:
          return String.fromCharCode(charCode).toUpperCase();
      }
    };
    document.onkeydown = function(e) {
      var nodeKey;
      nodeKey = findNodeKey(e);
      $scope.activateNode(nodeKey);
    };
    return document.onkeyup = function(e) {
      var nodeKey;
      nodeKey = findNodeKey(e);
      $scope.silenceNode(nodeKey);
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("SynthService", function(NodeService, OscillatorService) {
    var nodes, oscillators;
    nodes = NodeService.initializeNodes();
    oscillators = OscillatorService.initializeOscillators();
    return {
      activate: function(o) {
        if (typeof nodes[o] === 'undefined') {
          console.log(nodes);
        }
        return nodes[o].activate();
      },
      silence: function(o) {
        if (typeof nodes[o] !== 'undefined') {
          return nodes[o].silence();
        }
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("TimeService", function(TrackService) {
    return {
      slow: function(track, speed) {
        TrackService.get(track);
        return console.log('slow down' + track + ' by ' + speed);
      },
      silence: function(nodeKey) {
        return node[patchId].silence();
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("TrackService", function() {
    var Track, tracks;
    tracks = {};
    Track = (function() {
      function Track(key1) {
        this.key = key1;
        console.log(this.key);
      }

      return Track;

    })();
    return {
      get: function(key) {
        if (typeof tracks[nodeKey] === 'undefined') {
          tracks[nodeKey] = new Track(key);
        }
        return new Track(nodeKey);
      },
      mix: function() {
        var key, results, track;
        console.log('mix');
        results = [];
        for (track in tracks) {
          key = tracks[track];
          results.push(console.log(key));
        }
        return results;
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("AudioVisualizerService", function(AudioAnalyzerService, $window) {
    var analyser, canvas, canvasCtx, drawFrame;
    canvas = $window.document.querySelector('.oscilloscope');
    analyser = AudioAnalyzerService.getAnalyzer();
    canvasCtx = canvas.getContext('2d');
    return drawFrame = function() {
      var HEIGHT, WIDTH, drawVisual, i, sliceWidth, v, x, y;
      WIDTH = $window.getClientWidth();
      HEIGHT = 200;
      drawVisual = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();
      sliceWidth = WIDTH * 1.0 / bufferLength;
      x = 0;
      i = 0;
      while (i < bufferLength) {
        v = dataArray[i] / 128.0;
        y = v * HEIGHT / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
        i++;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
      return draw();
    };
  });

}).call(this);

(function() {
  angular.module("synthesizer").config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("app", {
      url: "/app",
      abstract: true,
      templateUrl: "templates/app.html"
    }).state("app.patches", {
      url: "/patches",
      views: {
        "main-content": {
          templateUrl: "templates/patch-index.html",
          controller: "PatchIndexCtrl"
        }
      }
    }).state("app.patch-detail", {
      url: "/patch/:patchId",
      views: {
        "main-content": {
          templateUrl: "templates/patch-detail.html",
          controller: "PatchDetailCtrl"
        }
      }
    }).state("app.synth", {
      url: "/synth",
      views: {
        "main-content": {
          templateUrl: "templates/synth.html",
          controller: "SynthCtrl"
        }
      }
    }).state("info", {
      url: "/info",
      views: {
        "main-content": {
          templateUrl: "templates/info.html"
        }
      }
    });
    return $urlRouterProvider.otherwise("/app/synth");
  });

}).call(this);

//# sourceMappingURL=app.js.map