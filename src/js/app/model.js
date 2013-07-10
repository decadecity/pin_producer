/*global console, window */
window.PP = (function (module) {
  "use strict";

  module.MODEL = (function (module, submodule) {

    // Common pin numbers taken from: http://www.datagenetics.com/blog/september32012/
    var common_pins = [
      1234,
      1111,
      0, // Integer value of a pin of '0000';
      1212,
      7777,
      1004,
      2000,
      4444,
      2222,
      6969,
      9999,
      3333,
      5555,
      6666,
      1122,
      1313,
      8888,
      4321,
      2001,
      1010
    ];

    // List of pins to use.
    var pin_list = [];

    /**
     * How many pins are still available?
     */
    submodule.pinsAvailable = function () {
      if (pin_list) {
        return pin_list.length;
      } else {
        return 0;
      }
    };

    // Local Storage key for pin list.
    var pin_storage_key = 'PP::MODEL::pin_list';

    /**
     * Stores the pin list in local storage.
     */
    var storePinList = function() {
      return window.localStorage.setItem(pin_storage_key, JSON.stringify(pin_list));
    };

    /**
     * Gets the pin list from local storage.
     */
    var getPinList = function() {
      var data = window.localStorage.getItem(pin_storage_key);
      return JSON.parse(data);
    };

    // Taken from http://stackoverflow.com/a/12646864/11651
    /**
     * Randomize array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     */
    var shuffleArray = function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    /**
     * Generates a list of pin numbers excluding the common pins.
     */
    var generatePins = function () {
      var new_pin_list = [];
      for (var i = 0; i <= 9999; i += 1) {
        if (common_pins.indexOf(i) === -1) {
          new_pin_list.push(i);
        }
      }
      pin_list = shuffleArray(new_pin_list);
      storePinList();
    };


    /**
     * Resets the pin list.
     */
    submodule.resetPins = function () {
      generatePins();
    };


    // Current active pin.
    var current_pin;

    /**
     * Gets a new pin from the list.
     */
    submodule.newPin = function () {
      current_pin = pin_list.pop();
      storePinList();
    };

    /**
     * Makes the current pin visible.
     */
    submodule.getCurrentPin = function () {
      if (typeof current_pin === 'undefined') {
        submodule.newPin();
      }
      return current_pin;
    };

    /**
     * Initialise the model.
     */
    submodule.init = function() {
      pin_list = getPinList();
      if (!pin_list) {
        generatePins();
      }
    };

    return submodule;
  }(module, module.MODEL || {}));

  return module;
}(window.PP || {}));

