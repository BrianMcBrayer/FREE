/*
HEADER STUFF HERE
*/

window.FREE = (function(my, ajax) {
  'use strict';

  if (ajax == null) {
    throw new Error('promisejs is undefined or null');
  }

  var settings = {
    url: null,
    data: null
  };

  var _currentBattery = null,
      _currentTest = null;

  my.beginBattery = beginBattery;
  my.endBattery = endBattery;
  my.beginTest = beginTest;
  my.endTest = endTest;
  my.markCurrentTest = markCurrentTest;
  my.sendResults = sendResults;

  function beginBattery(batteryName, url, data) {
    _currentBattery = new Battery(batteryName);

    settings.url = url;
    settings.data = data;
  }
  function endBattery() {
    _currentBattery.complete();

    sendResults(settings.url);
  }

  function beginTest(testName) {
    if (my.results[testName] != null) {
      throw new Error('Test of name ' + testName + ' has already been used');
    }

    _currentTest = batteryResults.results[testName] = new Test(testName);
  }
  function endTest() {
    markCurrentTest();
    _currentTest.complete();
    _currentTest = null;
  }

  function markCurrentTest() {
    _currentTest.addMark();
  }

  function sendResults(url) {
    throw new Error('sendResults not yet implemented');
  }

  function Battery(name) {
    this.name = name;
    this.tests = [];
    this.start = new Date();
    this.end = null;

    this.completed: false;
  }

  Battery.prototype.complete = complete;
  function complete() {
    this.completed = true;
    this.end = new Date();
  }

  function Test(name) {
    this.name = name;
    this.marks = [];

    this.completed = false;
  }

  Test.prototype.addMark = addMark;
  function addMark() {
    this.marks.push(new Mark());
  }

  Test.prototype.complete = completeTest;
  function completeTest() {
    this.completed = true;
  }

  function Mark() {
    this.time = new Date();
  }

  return my;
})(window.FREE || {}, promise)
