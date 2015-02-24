(function(FREE, win) {

  var testLength = 10000,
      requestStop = false;

  var battery = new FREE.Battery('testBattery');

  battery.beginTest('sampleTest');

  win.setTimeout(stopTest, 10000);

  doTest();

  function doTest() {
    if (!requestStop) {
      battery.markCurrentTest();

      win.setTimeout(doTest, getRandomInt(100, 500));
    }
  }

  function stopTest() {
    requestStop = true;
    battery.endTest();
    battery.complete();

    console.log(battery);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

})(window.FREE, window);
