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
  angular.module("synthesizer").controller("PatchDetailCtrl", function($scope, $stateParams, PetService) {
    return $scope.patch = PatchService.get($stateParams.petId);
  });

}).call(this);

(function() {
  angular.module("synthesizer").controller("PatchIndexCtrl", function($scope, PatchService) {
    return $scope.patches = PatchService.all();
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
        info: "Cat sample patch"
      }, {
        id: 1,
        title: "Dogs",
        info: "Real Doggy barks"
      }, {
        id: 2,
        title: "Turtles",
        info: "Turtle sound patch"
      }, {
        id: 3,
        title: "Sharks",
        info: "Cat sample patch"
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
  angular.module("synthesizer").factory("AudioAnalyserService", function($window, AudioContextService) {
    var HEIGHT, WIDTH, context, ianalyser, icanvas, initialized, ipainter, ivisualizer, oanalyser, ocanvas, opainter, ovisualizer;
    context = AudioContextService.getContext();
    ianalyser = context.createAnalyser();
    oanalyser = context.createAnalyser();
    ianalyser.fftSize = 2048;
    oanalyser.fftSize = 2048;
    ivisualizer = '';
    ovisualizer = '';
    icanvas = document.getElementById('inputWaveForm');
    ocanvas = document.getElementById('outputWaveForm');
    WIDTH = icanvas.clientWidth;
    HEIGHT = icanvas.clientHeight;
    ipainter = icanvas.getContext("2d");
    opainter = ocanvas.getContext("2d");
    initialized = false;
    $window.drawOutputWaveForm = function() {
      var bufferLength, i, sliceWidth, timeBuffer, x, y;
      ovisualizer = requestAnimationFrame(drawOutputWaveForm);
      bufferLength = oanalyser.frequencyBinCount;
      timeBuffer = new Uint8Array(bufferLength);
      oanalyser.getByteTimeDomainData(timeBuffer);
      opainter.fillStyle = 'rgb(255, 255, 255)';
      opainter.fillRect(0, 0, WIDTH, HEIGHT);
      opainter.lineWidth = 1;
      opainter.strokeStyle = 'rgb(100, 100, 255)';
      opainter.beginPath();
      sliceWidth = WIDTH * 1.0 / bufferLength;
      x = 0;
      i = 0;
      opainter.moveTo(0, opainter.height / 2);
      while (i < bufferLength) {
        y = timeBuffer[i] / 2;
        if (i === 0) {
          opainter.moveTo(x, y);
        } else {
          opainter.lineTo(x, y);
        }
        x += sliceWidth;
        i++;
      }
      opainter.lineTo(opainter.width, opainter.height);
      return opainter.stroke();
    };
    $window.drawInputWaveForm = function() {
      var bufferLength, i, sliceWidth, timeBuffer, x, y;
      ivisualizer = requestAnimationFrame(drawInputWaveForm);
      bufferLength = ianalyser.frequencyBinCount;
      timeBuffer = new Uint8Array(bufferLength);
      ianalyser.getByteTimeDomainData(timeBuffer);
      ipainter.fillStyle = 'rgb(255, 255, 255)';
      ipainter.fillRect(0, 0, WIDTH, HEIGHT);
      ipainter.lineWidth = 1;
      ipainter.strokeStyle = 'rgb(100, 100, 255)';
      ipainter.beginPath();
      sliceWidth = WIDTH * 1.0 / bufferLength;
      x = 0;
      i = 0;
      ipainter.moveTo(0, ipainter.height / 2);
      while (i < bufferLength) {
        y = timeBuffer[i] / 2;
        if (i === 0) {
          ipainter.moveTo(x, y);
        } else {
          ipainter.lineTo(x, y);
        }
        x += sliceWidth;
        i++;
      }
      ipainter.lineTo(ipainter.width, ipainter.height);
      return ipainter.stroke();
    };
    return {
      getAnalyser: function(type) {
        if (!this.initialized) {
          this.initialize();
        }
        if (type === 'input') {
          return ianalyser;
        } else {
          return oanalyser;
        }
      },
      initialize: function() {
        this.initialized = true;
        $window.analyzer = ianalyser;
        $window.drawInputWaveForm();
        return $window.drawOutputWaveForm();
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
  angular.module("synthesizer").factory("BiquadService", function(AudioContextService) {
    var context, filter, supportedParams;
    context = AudioContextService.getContext();
    filter = context.createBiquadFilter();
    filter.type = "highshelf";
    filter.frequency.value = 0;
    filter.gain.value = 0;
    supportedParams = {
      'lowpass': ['Q', 'frequency'],
      'highpass': ['Q', 'frequency'],
      'bandpass': ['Q', 'frequency'],
      'lowshelf': ['Q', 'gain'],
      'highshelf': ['Q', 'gain'],
      'peaking': ['Q', 'frequency', 'gain'],
      'notch': ['Q', 'frequency'],
      'allpass': ['Q', 'frequency']
    };
    return {
      getFilter: function() {
        return filter;
      },
      setFrequency: function(cutoff) {
        return filter.frequency.value = cutoff;
      },
      getFrequency: function() {
        return filter.frequency.value;
      },
      setDetune: function(tune) {
        return filter.detune.value = tune;
      },
      getDetune: function() {
        return filter.detune.value;
      },
      setQ: function(quality) {
        return filter.Q.value = quality;
      },
      getQ: function() {
        return filter.Q.value;
      },
      setGain: function(gain) {
        return filter.gain.value = gain;
      },
      getType: function() {
        return filter.type;
      },
      setType: function(type) {
        return filter.type = type;
      },
      supports: function(parameter) {
        var supportedParamsForType;
        supportedParamsForType = this.getModeParameters(this.getType());
        return supportedParamsForType.indexOf(parameter);
      },
      getFilterModes: function(gain) {
        return Object.keys(supportedParams);
      },
      getModeParameters: function(mode) {
        return supportedParams[mode];
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("DelayService", function(AudioContextService) {
    var context, currentVolume, delay, feedback;
    context = AudioContextService.getContext();
    delay = context.createDelay();
    feedback = context.createGain();
    currentVolume = 1;
    delay.connect(feedback);
    feedback.connect(delay);
    return {
      setFeedback: function(vol) {
        return feedback.gain.value = vol;
      },
      getOutput: function() {
        return feedback;
      },
      mute: function(destination) {
        if (!_.defined(destination)) {
          destination = 'output';
        }
        return control.gain.value = 0;
      },
      unMute: function(destination) {
        if (!_.defined(destination)) {
          destination = 'output';
        }
        return gainNodes[destination].gain.value = currentVolume;
      },
      max: function(destination) {
        if (!_.defined(destination)) {
          destination = 'output';
        }
        return this.setVolume(1, destination);
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("GainService", function(AudioContextService) {
    var context, control, currentVolume, gainNodes;
    context = AudioContextService.getContext();
    control = context.createGain();
    currentVolume = 1;
    gainNodes = {
      'output': context.createGain(),
      'input': context.createGain()
    };
    return {
      setVolume: function(vol, destination) {
        console.log(vol, destination);
        if (!_.defined(destination)) {
          destination = 'output';
        }
        currentVolume = vol;
        return gainNodes[destination].gain.value = vol;
      },
      getGain: function(destination) {
        if (!_.defined(destination)) {
          destination = 'output';
        }
        if (!_.defined(gainNodes[destination])) {
          return this.createGain(destination);
        }
        return gainNodes[destination];
      },
      createGain: function(name) {
        gainNodes[name] = context.createGain();
        return gainNodes[name];
      },
      mute: function(destination) {
        if (!_.defined(destination)) {
          destination = 'output';
        }
        return control.gain.value = 0;
      },
      unMute: function(destination) {
        if (!_.defined(destination)) {
          destination = 'output';
        }
        return gainNodes[destination].gain.value = currentVolume;
      },
      max: function(destination) {
        if (!_.defined(destination)) {
          destination = 'output';
        }
        return this.setVolume(1, destination);
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("HudService", function($window, TrackService) {
    var context, hud;
    hud = $window.document.getElementById('hud');
    context = hud.getContext('2d');
    return {
      paint: function() {
        var HEIGHT, WIDTH, dataArray, i, index, j, len, sliceWidth, track, tracks, v, x, y;
        WIDTH = 1000;
        HEIGHT = 108;
        tracks = TrackService.getTracks();
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(0, 0, WIDTH, HEIGHT);
        context.lineWidth = 1;
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.beginPath();
        for (index = j = 0, len = tracks.length; j < len; index = ++j) {
          track = tracks[index];
          dataArray = track.buffer.getChannelData(0);
          sliceWidth = WIDTH / dataArray.length;
          x = 0;
          i = 0;
          while (i < dataArray.length) {
            v = dataArray[i];
            y = v + index * HEIGHT / tracks.lenght;
            if (i === 0) {
              context.moveTo(x, y);
            } else {
              context.lineTo(x, y);
            }
            x += sliceWidth;
            i++;
          }
          context.lineTo(hud.width, hud.height / index);
        }
        return context.stroke();
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("LoopService", function() {
    var instantLoop;
    instantLoop = true;
    return {
      toggleInstantLoop: function() {
        return instantLoop = !instantLoop;
      },
      instantLoopEnabled: function() {
        return instantLoop;
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

  angular.module("synthesizer").factory("NodeService", function(OscillatorService, TimeService, RecordService, TrackService, ShiftService, StateService, AudioAnalyserService, HudService, LoopService) {
    var IvoryNode, Node, RecordNode, RootModifierNode, SampleNode, ShiftNode, StateToggleNode, control_keys, ivory_keys, nodes, record_key;
    Node = (function() {
      function Node(key1) {
        this.key = key1;
        this.active = false;
      }

      Node.prototype.silence = function(velocity) {
        return this.active = false;
      };

      Node.prototype.sustain = function(velocity) {
        return this.velocity += 1;
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
    RootModifierNode = (function(superClass) {
      extend(RootModifierNode, superClass);

      function RootModifierNode(key1, multiplier) {
        this.key = key1;
        this.multiplier = multiplier;
        RootModifierNode.__super__.constructor.call(this, this.key);
      }

      RootModifierNode.prototype.activate = function(velocity) {
        var newRoot;
        if (!this.active) {
          newRoot = OscillatorService.getRootFrequency() * this.multiplier;
          OscillatorService.setRootFrequency(newRoot);
        }
        return RootModifierNode.__super__.activate.call(this, velocity);
      };

      RootModifierNode.prototype.silence = function(velocity) {
        return RootModifierNode.__super__.silence.call(this);
      };

      return RootModifierNode;

    })(Node);
    ShiftNode = (function(superClass) {
      extend(ShiftNode, superClass);

      function ShiftNode() {
        ShiftNode.__super__.constructor.call(this, 'shift');
      }

      ShiftNode.prototype.activate = function(velocity) {
        if (!this.active) {
          ShiftService.shift();
        }
        return ShiftNode.__super__.activate.call(this, velocity);
      };

      ShiftNode.prototype.silence = function(velocity) {
        ShiftService.unShift();
        return ShiftNode.__super__.silence.call(this);
      };

      return ShiftNode;

    })(Node);
    RecordNode = (function(superClass) {
      extend(RecordNode, superClass);

      function RecordNode(key1) {
        this.key = key1;
        RecordNode.__super__.constructor.call(this, this.key);
      }

      RecordNode.prototype.activate = function(velocity) {
        if (!this.active) {
          RecordService.toggleRecording(function(buffer) {
            TrackService.addTrack(buffer, LoopService.instantLoopEnabled);
            return HudService.paint();
          });
        }
        return RecordNode.__super__.activate.call(this, velocity);
      };

      RecordNode.prototype.silence = function(velocity) {
        return RecordNode.__super__.silence.call(this);
      };

      return RecordNode;

    })(Node);
    StateToggleNode = (function(superClass) {
      extend(StateToggleNode, superClass);

      function StateToggleNode(key1, state1) {
        this.key = key1;
        this.state = state1;
        StateToggleNode.__super__.constructor.call(this, this.key);
      }

      StateToggleNode.prototype.activate = function(velocity) {
        if (!this.active) {
          StateService.toggleState(this.state);
        }
        return StateToggleNode.__super__.activate.call(this, velocity);
      };

      StateToggleNode.prototype.silence = function(velocity) {
        return StateToggleNode.__super__.silence.call(this);
      };

      return StateToggleNode;

    })(Node);
    SampleNode = (function(superClass) {
      extend(SampleNode, superClass);

      function SampleNode(key1) {
        this.key = key1;
        SampleNode.__super__.constructor.call(this, this.key);
      }

      SampleNode.prototype.activate = function(velocity) {
        if (ShiftService.isShifted() && !this.active) {
          console.log('start sample');
          RecordService.startRecording();
        } else if (!this.active) {
          console.log('playSample');
          console.log(this.stream);
          if (_.defined(this.stream)) {
            console.log(this.stream, AudioAnalyserService.getAnalyser('input'));
            this.stream.play(AudioAnalyserService.getAnalyser('input'));
          }
        }
        return SampleNode.__super__.activate.call(this, velocity);
      };

      SampleNode.prototype.silence = function(velocity) {
        var node;
        if (ShiftService.isShifted()) {
          node = this;
          RecordService.stopRecording(function(buffer) {
            node.stream = TrackService.audioStreamFromBuffer(buffer);
            return node.stream.connect(AudioAnalyserService.getAnalyser());
          });
        }
        return SampleNode.__super__.silence.call(this);
      };

      return SampleNode;

    })(Node);
    ivory_keys = "abcdefghijklmnopqrstuvwxyz1234567890";
    control_keys = ",./;`-='← → ↑ ↓";
    record_key = " ";
    nodes = {};
    return {
      initializeNodes: function() {
        var defaultState, i, j, key, len, len1, ref, ref1, state;
        ref = StateService.all();
        for (i = 0, len = ref.length; i < len; i++) {
          state = ref[i];
          nodes[state] = {};
        }
        defaultState = StateService.getDefaultState();
        ref1 = ivory_keys.toUpperCase().split('');
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          key = ref1[j];
          nodes['keys'][key] = new IvoryNode(key, OscillatorService.frequencyForKey(key));
          nodes['sampler'][key] = new SampleNode(key);
        }
        nodes['keys'][record_key] = new RecordNode(record_key);
        nodes['keys']['['] = new RootModifierNode('[', .5);
        nodes['keys'][']'] = new RootModifierNode(']', 2);
        nodes['keys']['shift'] = new ShiftNode();
        nodes['keys']['control'] = new StateToggleNode('control', 'sampler');
        return nodes;
      },
      activate: function(key) {
        return this.nodeForKey(key).activate();
      },
      silence: function(key) {
        return this.nodeForKey(key).silence();
      },
      nodeForKey: function(key) {
        var node;
        node = nodes[StateService.getState()][key];
        if (!_.defined(node)) {
          node = nodes[StateService.getDefaultState()][key];
        }
        return node;
      },
      getfirstActiveNodeKey: function() {
        var i, len, node;
        for (i = 0, len = nodes.length; i < len; i++) {
          node = nodes[i];
          if (node.active) {
            return node;
          }
        }
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("OscillatorService", function(AudioContextService, GainService, AudioAnalyserService) {
    var attack, audioContext, oscillators, release, rootFrequency;
    audioContext = AudioContextService.getContext();
    oscillators = [];
    rootFrequency = 432;
    release = .1;
    attack = 0;
    return {
      getRootFrequency: function() {
        return rootFrequency;
      },
      setRootFrequency: function(newFrequency) {
        return rootFrequency = newFrequency;
      },
      initializeOscillators: function() {
        var addOscillator;
        addOscillator = function(type) {
          var osc;
          osc = audioContext.createOscillator();
          osc.name = 'osc ' + oscillators.length;
          osc.type = type;
          osc.frequency.value = 0;
          osc.vol = GainService.createGain(type);
          osc.start();
          return oscillators.push(osc);
        };
        addOscillator('sine');
        addOscillator('sine');
        addOscillator('sine');
        addOscillator('sine');
        addOscillator('sine');
        addOscillator('sine');
        return oscillators;
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
        osc.frequency.value = node.frequency * rootFrequency;
        return osc.vol.gain.value = 1;
      },
      nodeOff: function(node) {
        var osc;
        osc = this.fetchOscillator(node);
        osc.vol.gain.value = 0;
        return delete osc.originNode;
      },
      frequencyForKey: function(key) {
        var ratioDictionary;
        ratioDictionary = {
          Z: 1,
          X: 9 / 8,
          C: 5 / 4,
          V: 10 / 9,
          B: 9 / 8,
          N: 32 / 27,
          M: 6 / 5,
          A: 4 / 3,
          S: 3 / 2,
          D: 5 / 3,
          F: 27 / 20,
          G: 3 / 2,
          H: 5 / 3,
          J: 7 / 4,
          K: 16 / 9,
          L: 9 / 5,
          Q: 16 / 9,
          W: 2,
          E: 10 / 4,
          R: 9 / 5,
          T: 15 / 8,
          Y: 243 / 128,
          U: 2,
          I: 20 / 9,
          O: 42 / 7,
          P: 42 / 7,
          1: 1 / 7,
          2: 2 / 7,
          3: 3 / 7,
          4: 4 / 7,
          5: 42 / 7,
          6: 42 / 7,
          7: 42 / 7,
          8: 42 / 7,
          9: 42 / 7,
          0: 42 / 7
        };
        return ratioDictionary[key];
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("RecordService", function($window, $rootScope, AudioContextService, AudioAnalyserService, GainService, TrackService) {
    var context, inputAnalyser, inputGain, outputAnalyser, recorder, recording, service, source, sourceStream;
    context = AudioContextService.getContext();
    source = 'output';
    outputAnalyser = AudioAnalyserService.getAnalyser('output');
    inputAnalyser = AudioAnalyserService.getAnalyser('input');
    sourceStream = GainService.getGain('output');
    inputGain = GainService.getGain('input');
    recorder = new Recorder(sourceStream);
    recording = false;
    service = this;
    return {
      updateState: function(state) {
        console.log(this);
        if (state === 'sampler') {
          return this.setSource('input');
        } else {
          return this.setSource('output');
        }
      },
      setSource: function(src) {
        console.log(this, src);
        source = src;
        if (src === 'input') {
          return GainService.setVolume(1, 'user-media');
        } else {
          return GainService.setVolume(0, 'user-media');
        }
      },
      getMediaStream: function() {
        return $window.userMediaStream;
      },
      getSource: function() {
        return source;
      },
      getRecorder: function() {
        return recorder;
      },
      isRecording: function() {
        return recording;
      },
      startRecording: function() {
        recording = true;
        return recorder.record();
      },
      stopRecording: function(callback) {
        recording = false;
        recorder.stop();
        return recorder.getBuffer(function(buffer) {
          return recorder.exportWAV(function(blob) {
            var dl, url;
            url = URL.createObjectURL(blob);
            dl = document.createElement('a');
            dl.href = url;
            dl.innerHTML = (new Date).toISOString() + '.wav';
            callback(buffer);
            return recorder.clear();
          });
        });
      },
      toggleRecording: function(callback) {
        if (this.isRecording()) {
          return this.stopRecording(callback);
        } else {
          return this.startRecording();
        }
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("ReverbService", function(AudioContextService) {
    var context, reverb;
    context = AudioContextService.getContext();
    reverb = context.createConvolver();
    return {
      getReverb: function() {
        return reverb;
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("ShiftService", function(StateService, GainService, RecordService) {
    var shifted;
    shifted = false;
    return {
      isShifted: function() {
        return shifted;
      },
      shift: function() {
        GainService.mute();
        return shifted = true;
      },
      unShift: function() {
        GainService.unMute();
        return shifted = false;
      },
      toggleShift: function(o) {
        if (shifted) {
          return unShift();
        } else {
          return shift();
        }
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("StateService", function($rootScope, RecordService) {
    var defaultState, state, stateHistory, states;
    defaultState = 'keys';
    state = defaultState;
    states = ['keys', 'sampler', 'sequencer', 'editor'];
    stateHistory = [];
    return {
      toggleState: function(requestedState) {
        if (state === requestedState) {
          return this.setState(stateHistory.pop());
        } else {
          stateHistory.push(state);
          return this.setState(requestedState);
        }
      },
      getState: function() {
        return state;
      },
      getDefaultState: function() {
        return defaultState;
      },
      all: function() {
        return states;
      },
      setState: function(newState) {
        RecordService.updateState(newState);
        return state = newState;
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("StreamChainService", function(AudioContextService) {
    var context, graph;
    context = AudioContextService.getContext();
    graph = [];
    return {
      appendConnection: function(inputNode, outputNode) {
        return graph.push([inputNode, outputNode]);
      },
      insertNode: function(node, index) {
        var i, len, nodes_to_push, p_node;
        nodes_to_push = [];
        while (chain.length > index) {
          nodes_to_push.push(chain.pop());
        }
        chain.push(node);
        for (i = 0, len = nodes_to_push.length; i < len; i++) {
          p_node = nodes_to_push[i];
          chain.push(p_node);
        }
        return reconnect();
      },
      getGraph: function() {
        return graph;
      },
      reconnect: function() {
        var i, j, k, len, len1, len2, node, node_pair, results;
        for (i = 0, len = graph.length; i < len; i++) {
          node_pair = graph[i];
          for (j = 0, len1 = node_pair.length; j < len1; j++) {
            node = node_pair[j];
            node.disconnect();
          }
        }
        results = [];
        for (k = 0, len2 = graph.length; k < len2; k++) {
          node_pair = graph[k];
          results.push(node_pair[0].connect(node_pair[1]));
        }
        return results;
      },
      setDetune: function(tune) {
        return filter.detune.value = tune;
      },
      getDetune: function() {
        return filter.detune.value;
      },
      setQ: function(quality) {
        return filter.Q.value = quality;
      },
      getQ: function() {
        return filter.Q.value;
      },
      setGain: function(gain) {
        return filter.gain.value = gain;
      },
      getType: function() {
        return filter.type;
      },
      setType: function(type) {
        return filter.type = type;
      },
      supports: function(parameter) {
        var supportedParamsForType;
        supportedParamsForType = this.getModeParameters(this.getType());
        return supportedParamsForType.indexOf(parameter);
      },
      getFilterModes: function(gain) {
        return Object.keys(supportedParams);
      },
      getModeParameters: function(mode) {
        return supportedParams[mode];
      }
    };
  });

}).call(this);

(function() {
  angular.module("synthesizer").controller("SynthCtrl", function($scope, $stateParams, AudioContextService, AudioAnalyserService, SynthService, BiquadService, RecordService, StateService, TrackService, NodeService, OscillatorService, GainService, LoopService) {
    var findNodeKey;
    SynthService.initialize();
    $scope.context = AudioContextService.getContext();
    $scope.recording = RecordService.isRecording;
    $scope.nodes = SynthService.nodes;
    $scope.tracks = TrackService.getTracks();
    $scope.getState = StateService.getState;
    $scope.rootFrequency = OscillatorService.getRootFrequency();
    $scope.setRootFrequency = OscillatorService.setRootFrequency;
    $scope.getRootFrequency = OscillatorService.getRootFrequency;
    $scope.filter = BiquadService;
    $scope.filterType = BiquadService.getType();
    $scope.setFilterType = function(type) {
      return $scope.filter.setType(type);
    };
    $scope.activateNode = function(key) {
      return NodeService.activate(key);
    };
    $scope.silenceNode = function(key) {
      return NodeService.silence(key);
    };
    $scope.updateGain = function(vol, destination) {
      return GainService.setVolume(vol, destination);
    };
    findNodeKey = function(e) {
      var charCode;
      e = e || window.event;
      charCode = typeof e.which === 'number' ? e.which : e.keyCode;
      switch (false) {
        case charCode !== 91:
          return 'command';
        case charCode !== 16:
          return 'shift';
        case charCode !== 17:
          return 'control';
        case charCode !== 18:
          return 'option';
        case charCode !== 37:
          return '←';
        case charCode !== 38:
          return '↑';
        case charCode !== 39:
          return '→';
        case charCode !== 40:
          return '↓';
        case charCode !== 219:
          return '[';
        case charCode !== 221:
          return ']';
        default:
          return String.fromCharCode(charCode).toUpperCase();
      }
    };
    $scope.toggleSamplerMode = function() {
      return StateService.toggleState('sampler');
    };
    $scope.toggleSamplerMode = function() {
      return StateService.toggleState('sampler');
    };
    $scope.toggleInstantLoop = function() {
      return LoopService.toggleInstantLoop();
    };
    $scope.instantLoopEnabled = function() {
      return LoopService.instantLoopEnabled();
    };
    $scope.toggleRecording = function() {
      $scope.recording = !$scope.recording;
      if ($scope.recording) {
        return RecordService.startRecording();
      } else {
        return RecordService.stopRecording(function(buffer) {
          TrackService.addTrack(buffer, LoopService.instantLoopEnabled);
          return HudService.paint();
        });
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
  angular.module("synthesizer").factory("SynthService", function(NodeService, OscillatorService, RecordService, BiquadService, AudioAnalyserService, GainService, AudioContextService, UserMediaService, ReverbService) {
    var context, filter, inputAnalyser, inputGain, nodes, oscillators, outputAnalyser, outputGain, reverb, userMediaGain;
    nodes = NodeService.initializeNodes();
    context = AudioContextService.getContext();
    oscillators = OscillatorService.initializeOscillators();
    inputAnalyser = AudioAnalyserService.getAnalyser('input');
    outputAnalyser = AudioAnalyserService.getAnalyser('output');
    filter = BiquadService.getFilter();
    reverb = ReverbService.getReverb();
    outputGain = GainService.getGain('output');
    inputGain = GainService.getGain('input');
    userMediaGain = GainService.getGain('user-media');
    return {
      initialize: function() {
        var i, len, osc;
        UserMediaService.initialize();
        for (i = 0, len = oscillators.length; i < len; i++) {
          osc = oscillators[i];
          osc.connect(osc.vol);
          osc.vol.connect(inputGain);
        }
        userMediaGain.connect(inputGain);
        inputGain.connect(inputAnalyser);
        inputAnalyser.connect(filter);
        filter.connect(outputGain);
        outputGain.connect(outputAnalyser);
        return outputAnalyser.connect(context.destination);
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
  angular.module("synthesizer").factory("TrackService", function($rootScope, AudioContextService, AudioAnalyserService) {
    var context, tracks;
    tracks = [];
    context = AudioContextService.getContext();
    return {
      audioStreamFromBuffer: function(buffers) {
        var newBuffer, newSource;
        newSource = context.createBufferSource();
        newBuffer = context.createBuffer(2, buffers[0].length, context.sampleRate);
        newBuffer.getChannelData(0).set(buffers[0]);
        newBuffer.getChannelData(1).set(buffers[1]);
        newSource.buffer = newBuffer;
        return newSource;
      },
      addTrack: function(buffers, instantLoop) {
        var newSource, test;
        newSource = this.audioStreamFromBuffer(buffers);
        newSource.connect(AudioAnalyserService.getAnalyser());
        test = newSource.start(0);
        newSource.loop = instantLoop;
        newSource.loopStart = 0;
        return tracks.push(newSource);
      },
      getTracks: function() {
        return tracks;
      },
      get: function(index) {
        if (typeof tracks[index] !== 'undefined') {
          return new Track(nodeKey);
        } else {
          return console.log('no track');
        }
      },
      all: function() {
        return tracks;
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("UserMediaService", function($window, $rootScope, AudioContextService, AudioAnalyserService, GainService, TrackService) {
    var context, inputAnalyser, inputGain, userMediaGain;
    context = AudioContextService.getContext();
    inputAnalyser = AudioAnalyserService.getAnalyser('input');
    inputGain = GainService.getGain('input');
    userMediaGain = GainService.createGain('user-media');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return {
      getUserStream: function() {
        return $window.userMediaStream;
      },
      initialize: function(cb) {
        if (navigator.getUserMedia) {
          return navigator.getUserMedia({
            audio: true
          }, (function(stream) {
            window.userMediaStream = context.createMediaStreamSource(stream);
            console.log(userMediaGain, window.userMediaStream);
            window.userMediaStream.connect(userMediaGain);
            if (cb) {
              return cb(window.userMediaStream, null);
            }
          }), function(err) {
            console.log('error', err);
            if (cb) {
              return cb(null, err);
            }
          });
        }
      }
    };
  });

}).call(this);


/*
A simple example service that returns some data.
 */

(function() {
  angular.module("synthesizer").factory("AudioVisualizerService", function($window, AudioContextService) {
    var HEIGHT, VisualizerNode, WIDTH, canvas, context, initialized, painter, visualizer;
    VisualizerNode = (function() {
      function VisualizerNode(key) {
        var canvas;
        this.key = key;
        canvas = document.getElementById(this.key);
        this.active = false;
      }

      VisualizerNode.prototype.silence = function(velocity) {
        return this.active = false;
      };

      VisualizerNode.prototype.sustain = function(velocity) {
        return this.velocity += 1;
      };

      return VisualizerNode;

    })();
    context = AudioContextService.getContext();
    visualizer = '';
    canvas = document.getElementById('visualizer');
    WIDTH = canvas.clientWidth;
    HEIGHT = canvas.clientHeight;
    painter = canvas.getContext("2d");
    initialized = false;
    $window.drawOscilliscope = function() {
      var bufferLength, i, sliceWidth, timeBuffer, x, y;
      visualizer = requestAnimationFrame(drawOscilliscope);
      bufferLength = analyser.frequencyBinCount;
      timeBuffer = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(timeBuffer);
      painter.fillStyle = 'rgb(255, 255, 255)';
      painter.fillRect(0, 0, WIDTH, HEIGHT);
      painter.lineWidth = 1;
      painter.strokeStyle = 'rgb(100, 100, 255)';
      painter.beginPath();
      sliceWidth = WIDTH * 1.0 / bufferLength;
      x = 0;
      i = 0;
      painter.moveTo(0, painter.height / 2);
      while (i < bufferLength) {
        y = timeBuffer[i] / 2;
        if (i === 0) {
          painter.moveTo(x, y);
        } else {
          painter.lineTo(x, y);
        }
        x += sliceWidth;
        i++;
      }
      painter.lineTo(painter.width, painter.height);
      return painter.stroke();
    };
    return {
      getAnalyser: function() {
        if (!this.initialized) {
          this.initialize();
        }
        return analyser;
      },
      initialize: function() {
        this.initialized = true;
        return $window.drawOscilliscope();
      }
    };
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
  AudioBufferSourceNode.prototype.play = function(destination) {
    this.destination = destination;
    console.log(this.played);
    if (this.played !== true) {
      this.start(0);
      return this.played = true;
    } else {
      return this.replay();
    }
  };

  AudioBufferSourceNode.prototype.replay = function() {
    var context, newSource;
    console.log('replay');
    context = this.context;
    newSource = context.createBufferSource();
    newSource.buffer = this.buffer;
    newSource.connect(this.destination);
    return newSource.start(0);
  };

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
  (function(window) {
    var Recorder, WORKER_PATH;
    WORKER_PATH = 'components/Recorderjs/recorderWorker.js';
    Recorder = function(source, cfg) {
      var bufferLen, config, currCallback, numChannels, recording, worker;
      console.log(source);
      config = cfg || {};
      bufferLen = config.bufferLen || 4096;
      numChannels = config.numChannels || 2;
      this.context = source.context;
      this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode).call(this.context, bufferLen, numChannels, numChannels);
      worker = new Worker(config.workerPath || WORKER_PATH);
      worker.postMessage({
        command: 'init',
        config: {
          sampleRate: this.context.sampleRate,
          numChannels: numChannels
        }
      });
      recording = false;
      currCallback = void 0;
      this.node.onaudioprocess = function(e) {
        var buffer, channel;
        if (!recording) {
          return;
        }
        buffer = [];
        channel = 0;
        while (channel < numChannels) {
          buffer.push(e.inputBuffer.getChannelData(channel));
          channel++;
        }
        worker.postMessage({
          command: 'record',
          buffer: buffer
        });
      };
      this.configure = function(cfg) {
        var prop;
        for (prop in cfg) {
          if (cfg.hasOwnProperty(prop)) {
            config[prop] = cfg[prop];
          }
        }
      };
      this.record = function() {
        recording = true;
      };
      this.stop = function() {
        recording = false;
      };
      this.clear = function() {
        worker.postMessage({
          command: 'clear'
        });
      };
      this.getBuffer = function(cb) {
        currCallback = cb || config.callback;
        worker.postMessage({
          command: 'getBuffer'
        });
      };
      this.exportWAV = function(cb, type) {
        currCallback = cb || config.callback;
        type = type || config.type || 'audio/wav';
        if (!currCallback) {
          throw new Error('Callback not set');
        }
        worker.postMessage({
          command: 'exportWAV',
          type: type
        });
      };
      this.destroy = function() {
        worker.terminate();
        console.log(worker);
        return delete this;
      };
      worker.onmessage = function(e) {
        var blob;
        blob = e.data;
        currCallback(blob);
      };
      source.connect(this.node);
      this.node.connect(this.context.destination);
    };
    Recorder.forceDownload = function(blob, filename) {
      var click, link, url;
      url = (window.URL || window.webkitURL).createObjectURL(blob);
      link = window.document.createElement('a');
      link.href = url;
      link.download = filename || 'output.wav';
      click = document.createEvent('Event');
      click.initEvent('click', true, true);
      link.dispatchEvent(click);
    };
    window.Recorder = Recorder;
  })(window);

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
    }).state("app.info", {
      url: "/info",
      views: {
        "main-content": {
          templateUrl: "templates/info.html"
        }
      }
    });
    return $urlRouterProvider.otherwise("/app/info");
  });

}).call(this);

//# sourceMappingURL=app.js.map