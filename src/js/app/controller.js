/*global document */
window.PP = (function (module, $) {
  "use strict";

  module.CONTROLLER = (function (module, submodule, $) {

    /**
     * Handler for the main action button.
     */
    var handleAction = function (e) {
      e.preventDefault();
      var action = $(e.target).data('action');
      if (action === 'generate') {
        module.MODEL.newPin();
        module.VIEW.render(1);
        return;
      }
      if (action === 'reset') {
        module.MODEL.resetPins();
      }
      var state = 0;
      if (module.MODEL.pinsAvailable() === 0) {
        state = 2;
      }
      module.VIEW.render(state);
    };

    /**
     * Handler for resetting the pin list.
     */
    var handleReset = function (e) {
      e.preventDefault();
      module.MODEL.resetPins();
      module.VIEW.render();
    };

    /**
     * Initialise the application.
     */
    var init = function () {
      module.region = $('[data-application]'); // DOM element used to display the application.
      module.MODEL.init();
      module.VIEW.init();
      var state = 0;
      if (module.MODEL.pinsAvailable() === 0) {
        state = 2;
      }
      module.VIEW.render(state);
      module.region.on('click', '[data-action]', handleAction);
      module.region.on('click', '[data-reset]', handleReset);
    };

    // Kick everything off when the DOM's ready.
    $(document).ready(function(){
      init();
    });

    return submodule;
  }(module, module.CONTROLLER || {}, $));

  return module;
}(window.PP || {}, window.jQuery));
