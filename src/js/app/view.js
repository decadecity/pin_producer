/*global console */
window.PP = (function (module, $) {
  "use strict";

  module.VIEW = (function (module, submodule, $) {

    /**
     * View state:
     *
     * null => Not initialised.
     * 0 => No pin showing.
     * 1 => Pin showing.
     * 2 => No pins left.
     */
    var state = null;

    /**
     * Returns the template data for the button.
     */
    var getButtonSate = function () {
      var states = {
        'generate': {
          'button_text': 'Generate Pin',
          'action': 'generate'
        },
        'clear': {
          'button_text': 'Clear Pin',
          'action': 'clear'
        },
        'reset': {
          'button_text': 'Regenerate Pin List',
          'action': 'reset'
        }
      };
      if (state === 2 && !module.MODEL.pinsAvailable()) {
        return states.reset;
      } else if (state === 1) {
        return states.clear;
      } else {
        return states.generate;
      }
    };

    /**
     * Sets the button state.
     */
    var renderButton = function () {
      module.region.find('[data-control]').html(module.TEMPLATE.button_action(getButtonSate()));
    };

    /**
     * Sets the button state.
     */
    var renderStatus = function () {
      var plural = 's';
      var verb = 'are';
      if (module.MODEL.pinsAvailable() === 1) {
        plural = '';
        verb = 'is';
      }
      module.region.find('[data-status]').html(module.TEMPLATE.status({ 'remaining': module.MODEL.pinsAvailable(), 'plural': plural, 'verb': verb }));
    };

    /**
     * Gets the current pin in four digit format - i.e. zero filled.
     */
    var getCurrentPin = function () {
      var pin = '' + module.MODEL.getCurrentPin();
      while (pin.length < 4) {
        pin = '0' + pin;
      }
      return pin;
    };

    /**
     * Renders the current pin.
     */
    var renderPin = function () {
      if (state === 1) {
        module.region.find('[data-display]').html(module.TEMPLATE.pin({ 'pin': getCurrentPin() }));
      } else {
        module.region.find('[data-display]').html('');
      }
    };

    /**
     * Renders the current view state.
     */
    submodule.render = function (new_state) {
      if (typeof new_state === 'number') {
        state = new_state;
      }
      renderPin();
      renderButton();
      renderStatus();
    };

    /**
     * Initialise the view.
     */
    submodule.init = function () {
      $('div[data-initialisation="true"]').remove();
      module.region.html(module.TEMPLATE.app());
    };

    return submodule;
  }(module, module.VIEW || {}, $));

  return module;
}(window.PP || {}, window.jQuery));
