/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /**
   * Basic unit tests for the pin number storage.
   */

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('Model', {
    setup: function () {
      window.localStorage.clear();
      PP.MODEL.init();
    }
  });

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

  test('generate', function () {
    window.localStorage.clear();
    PP.MODEL.init();
    equal(PP.MODEL.pinsAvailable(), 9980, '9980 pins generated (20 excluded).');
    var found = 0; // How many excluded pins have we found?
    while (PP.MODEL.pinsAvailable() > 0) {
      PP.MODEL.newPin();
      if (common_pins.indexOf(PP.MODEL.getCurrentPin()) !== -1) {
        found += 1;
      }
    }
    equal(found, 0, 'No excluded pins generated.');
  });

  test('newPin', function () {
    var start_count = PP.MODEL.pinsAvailable();
    PP.MODEL.newPin();
    notEqual(start, PP.MODEL.pinsAvailable(), 'New pin reduces available pin pool.')
    var start_pin = PP.MODEL.getCurrentPin();
    PP.MODEL.newPin();
    notEqual(start_pin, PP.MODEL.getCurrentPin(), 'New pin is not the same as the old pin.');
  });

  test('reset', function() {
    var start_count = PP.MODEL.pinsAvailable();
    PP.MODEL.newPin();
    PP.MODEL.resetPins();
    equal(start_count, PP.MODEL.pinsAvailable(), 'Reset sets pin list back to the start.');
  });

}(window.jQuery));
