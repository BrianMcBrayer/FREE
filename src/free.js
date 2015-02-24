/*
HEADER STUFF HERE
*/

window.FREE = (function(my) {
  'use strict';

  my.Battery = Battery;

  function Battery(name) {
    this.name = name;

    this.tests = {};
    this.currentTest = null;

    this.start = new Date();
    this.end = null;

    this.completed = false;
  }

  Battery.prototype.complete = complete;
  function complete() {
    if (this.currentTest) {
      this.endTest();
    }

    this.completed = true;
    this.end = new Date();
  }

  Battery.prototype.beginTest = beginTest;
  function beginTest(testName) {
    if (this.tests[testName] != null) {
      throw new Error('Test of name ' + testName + ' has already been used');
    }

    var test = new Test(testName);
    this.tests[testName] = test;
    this.currentTest = test;

    return test;
  }

  Battery.prototype.endTest = endTest;
  function endTest() {
    this.markCurrentTest();
    this.currentTest.complete();
    this.currentTest = null;
  }

  Battery.prototype.markCurrentTest = markCurrentTest;
  function markCurrentTest() {
    this.currentTest.addMark();
  }

  function Test(name) {
    this.name = name;

    this.start = new Date();
    this.lastMarkTime = this.start;

    this.marks = [];

    this.completed = false;
  }

  Test.prototype.addMark = addMark;
  function addMark() {
    var mark = new Mark(this.lastMarkTime);
    this.lastMarkTime = mark.time;
    this.marks.push(mark);
  }

  Test.prototype.complete = completeTest;
  function completeTest() {
    this.completed = true;
  }

  function Mark(time) {
    this.time = new Date();
    this.delta = (+(this.time)) - (+(time));
  }

  return my;
})(window.FREE || {});
