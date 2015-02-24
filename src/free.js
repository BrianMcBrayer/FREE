/*
HEADER STUFF HERE
*/

window.FREE = (function(my) {

  var _data,
      _curTestName;

  my.results = {};

  my.beginBattery = beginBattery;
  my.endBattery = endBattery;

  my.beginTest = beginTest;
  my.endTest = endTest;

  my.mark = mark;

  my.sendResults = sendResults;

  function beginBattery(batteryName, data) {
    throw new Error('beginBattery not yet implemented');
  }
  function endBattery() {
    throw new Error('endBattery not yet implemented');
  }

  function beginTest(testName) {
    if (my.results[testName] == null) {
      throw new Error('Test of name ' + testName + ' has already been used');
    }

    my.results[testName] = [];

    _curTestName = testName;
  }
  function endTest() {
    mark(_curTestName);

    
    _curTestName = null;
  }

  function mark(testName) {
    throw new Error('mark not yet implemented');
  }

  function sendResults(url) {
    throw new Error('sendResults not yet implemented');
  }

  return my;
})(window.FREE || {})
