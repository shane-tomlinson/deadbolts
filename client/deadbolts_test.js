(function() {
  "use strict";

  var Deadbolts = window.Deadbolts;

  module("Deadbolts");

  asyncTest("a single bolt - completes after first bolt unlocks", function() {
    function complete() {
      ok(true, "single bolt unlocked");
      start();
    }

    var deadbolts = new Deadbolts(complete);

    // create an unlock.
    var unlock = deadbolts.bolt();

    // unlock the bolt
    unlock();
  });

  asyncTest("two deadbolts - completes after second bolt unlocks", function() {
    function complete() {
      ok(true, "two deadbolts unlocked");
      start();
    }

    var deadbolts = new Deadbolts(complete);

    var unlock1 = deadbolts.bolt();
    var unlock2 = deadbolts.bolt();

    // Can unlock in any order
    unlock2();
    unlock1();
  });

  asyncTest("two deadbolts - completes after second bolt, two calls to one bolt has not effect", function() {
    var count = 0;
    function complete() {
      count++;
      equal(count, 1, "complete only called once");
      start();
    }

    var deadbolts = new Deadbolts(complete);

    var unlock1 = deadbolts.bolt();
    var unlock2 = deadbolts.bolt();

    // unlocking a single bolt twice has no effect.
    unlock1();
    unlock1();

    // second bolt must be unlocked.
    unlock2();
    unlock2();
  });

  asyncTest("a single bolt with unlock callback - call the unlock callback before complete", function() {
    var completeCalled = false, onunlockCalled = false;

    function complete() {
      completeCalled = true;
      start();
    }

    var deadbolts = new Deadbolts(complete);

    // create a bolt
    var unlock = deadbolts.bolt(function() {
      equal(completeCalled, false, "complete not yet called");
      onunlockCalled = true;
    });

    // unlock the bolt
    unlock();
    equal(onunlockCalled, true, "bolt was called");
    equal(completeCalled, true, "complete was called");
  });


}());

