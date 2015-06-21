angular.module("synthesizer")

.config ($stateProvider, $urlRouterProvider) ->

  # Ionic uses AngularUI Router which uses the concept of states
  # Learn more here: https://github.com/angular-ui/ui-router
  # Set up the various states which the app can be in.

  # the pet tab has its own child nav-view and history
  $stateProvider

  .state "app",
    url: "/app"
    abstract: true
    templateUrl: "templates/app.html"

  .state "app.patches",
    url: "/patches"
    views:
      "main-content":
        templateUrl: "templates/patch-index.html"
        controller: "PatchIndexCtrl"

  .state "app.patch-detail",
    url: "/patch/:patchId"
    views:
      "main-content":
        templateUrl: "templates/patch-detail.html"
        controller: "PatchDetailCtrl"

  .state "app.synth",
    url: "/synth"
    views:
      "main-content":
        templateUrl: "templates/synth.html"
        controller: "SynthCtrl"

  .state "app.info",
    url: "/info"
    views:
      "main-content":
        templateUrl: "templates/info.html"


  # if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise "/app/info"
