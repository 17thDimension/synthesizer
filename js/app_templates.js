angular.module("synthesizer.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/app.html","\n<ion-side-menus>\n  <ion-pane ion-side-menu-content=\"\">\n    <ion-nav-bar class=\"top-nav\">\n      <ion-nav-buttons side=\"left\">\n        <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon-round\"></button>\n      </ion-nav-buttons>\n      <ion-nav-buttons side=\"right\">\n        <button menu-toggle=\"right\" class=\"button button-icon icon ion-music-note\"></button>\n      </ion-nav-buttons>\n      <ion-nav-back-button class=\"button-clear\"><i class=\"icon ion-chevron-left\"></i> Back</ion-nav-back-button>\n    </ion-nav-bar>\n    <ion-nav-view name=\"main-content\" animation=\"slide-left-right\"></ion-nav-view>\n  </ion-pane>\n  <ion-side-menu side=\"right\" enable-menu-with-back-views=\"true\">\n    <ion-header-bar center=\"center\" class=\"bar-stable\">\n      <h1 class=\"title\">Prototype 17         </h1>\n    </ion-header-bar>\n    <ion-content class=\"has-header\">\n      <div class=\"list\">\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.patches\" class=\"item\">Patches</div>\n      </div>\n    </ion-content>\n  </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("templates/info.html","\n<html>\n  <body>\n    <!--This template loads for the \'tab.about\' state (app.js)\n    -->\n    <ion-view view-title=\"About Ionic\">\n      <ion-content has-header=\"true\" has-tabs=\"true\" padding=\"true\"><img src=\"img/ionic.png\" class=\"ionic-logo\"/>\n        <p>\n          This is a sample seed project for the Ionic Framework&period; Please cut it up and make it your own&period;\n          Check out the<a href=\"http://ionicframework.com/docs/\" target=\"_blank\">docs</a>for more info&period;\n        </p>\n        <p>Questions&quest; Hit up the<a href=\"http://forum.ionicframework.com/\" target=\"_blank\">forum</a>&period;</p>\n        <p>Find a bug&quest; Create an<a href=\"https://github.com/driftyco/ionic/issues?state=open\" target=\"_blank\">issue</a>&period;</p>\n        <p>What to help improve Ionic&quest;<a href=\"http://ionicframework.com/contribute/\" target=\"_blank\">Contribute</a>&period;</p>\n        <p>Stay up-to-date with the Ionic<a href=\"http://ionicframework.com/subscribe/\" target=\"_blank\">newsletter</a>and<a href=\"https://twitter.com/Ionicframework\" target=\"_blank\">twitter</a>account&period;</p>\n        <p>MIT Licensed&period; Happy coding&period;</p>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/node.html","\n<div class=\"col icon button\">{{ngModel.active}} ssss</div>");
$templateCache.put("templates/patch-detail.html","\n<html>\n  <body>\n    <!--\n    This template loads for the \'tab.pet-detail\' state (app.js)\n    \'pet\' is a $scope variable created in the PetCtrl controller (controllers.js)\n    The PetCtrl pulls data from the Pets service (service.js)\n    The Pets service returns an array of pet data\n    -->\n    <ion-view view-title=\"{{pet.title}}\">\n      <ion-content has-header=\"true\" padding=\"true\">\n        <p>&lcub;&lcub; pet&period;description &rcub;&rcub;</p>\n        <p><a href=\"#/tab/pets\" class=\"button button-small icon ion-arrow-left-b\"> All Pets</a></p>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/patch-index.html","\n<html>\n  <body>\n    <!--\n    This template gets placed in the Pet tab\'s <nav-view> directive.\n    It was wired up in the app config (app.js)\n    The \'patch\' data comes from its $scope within Patch indexCtrl (controller.js)\n    -->\n    <ion-view view-title=\"Patch Information\">\n      <ion-content has-header=\"true\" has-tabs=\"true\">\n        <ion-list>\n          <ion-item ng-repeat=\"pet in pets\" type=\"item-text-wrap\" href=\"#/tab/pet/{{pet.id}}\">\n            <h3>&lcub;&lcub;pet&period;title&rcub;&rcub;</h3>\n            <p>&lcub;&lcub;pet&period;description&rcub;&rcub;</p>\n          </ion-item>\n        </ion-list>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/synth.html","\n<html>\n  <body>\n    <!--This template loads for the \'tab.adopt\' state (app.js)\n    -->\n    <ion-view view-title=\"Synth\">\n      <ion-content has-header=\"true\" has-tabs=\"true\">\n        <div class=\"synth\">\n          <div class=\"row\">\n            <div class=\"col\">.</div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col\">.</div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col\"></div>\n            <div class=\"col\">\n              <input type=\"range\"/>\n            </div>\n            <div class=\"col\">\n              <div class=\"ion-fireball icon button button-icon\"></div>\n            </div>\n            <div class=\"col\">\n              <input type=\"range\"/>\n            </div>\n            <div class=\"col\">\n              <div class=\"ion-leaf icon button button-icon\"></div>\n            </div>\n            <div class=\"col\">\n              <input type=\"range\"/>\n            </div>\n            <div class=\"col\">\n              <div class=\"icon button button-icon ion-waterdrop\"></div>\n            </div>\n            <div class=\"col\">\n              <input type=\"range\"/>\n            </div>\n            <div class=\"col\">\n              <div class=\"icon button button-icon ion-wand\"></div>\n            </div>\n            <div class=\"col\">\n              <input type=\"range\"/>\n            </div>\n            <div class=\"col\">\n              <div class=\"icon button button-icon ion-magnet\"></div>\n            </div>\n            <div class=\"col\">\n              <input type=\"range\"/>\n            </div>\n            <div class=\"col\">\n              <div class=\"icon button button-icon ion-earth\"></div>\n            </div>\n            <div class=\"col\">\n              <input type=\"range\"/>\n            </div>\n            <div class=\"col\">\n              <div class=\"icon button button-icon ion-planet\"></div>\n            </div>\n            <div class=\"col\"></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col\">.</div>\n          </div>\n          <div class=\"row wave-form\">\n            <canvas class=\"oscilloscope col\"></canvas>\n          </div>\n          <div class=\"row\"></div>\n          <div class=\"row\">\n            <div class=\"col icon button button-icon ion-more\"></div>\n            <div class=\"col icon button button-icon ion-levels\"></div>\n            <div class=\"col icon button button-icon ion-chevron-up\"></div>\n            <div class=\"col icon button button-icon ion-stats-bars\"></div>\n            <div class=\"col icon button button-icon ion-scissors\"></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col\"></div>\n            <div class=\"col\"></div>\n            <div class=\"col icon button button-icon ion-chevron-left\"></div>\n            <div class=\"col icon button button-icon ion-record\"></div>\n            <div class=\"col icon button button-icon ion-chevron-right\"></div>\n            <div class=\"col\"></div>\n            <div class=\"col\"></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col icon button button-icon ion-cube\"></div>\n            <div class=\"col icon button button-icon ion-knife\"></div>\n            <div class=\"col icon button button-icon ion-chevron-down\"></div>\n            <div class=\"col icon button button-icon ion-fork\"></div>\n            <div class=\"col icon button button-icon ion-grid\">         </div>\n          </div>\n        </div>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");}]);