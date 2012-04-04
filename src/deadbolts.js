/**
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
window.Deadbolts = (function() {
  "use strict";

  function Deadbolts(complete) {
    this.complete = complete;
    this.locked_count_bolts = {};
    this.curr_id = 0;
    this.locked_count = 0;
  }
  Deadbolts.prototype.bolt = function(onunlock) {
    var self = this,
        id = self.curr_id,
        locked_bolts = self.locked_count_bolts;

    // Each deadbolt has an id.
    self.curr_id++;

    // Keep track of the number of bolts that are locked.
    self.locked_count++;

    // The current bolt is locked.
    locked_bolts[id] = true;

    return function() {
      // If the bolt being opened is locked, open it.
      if(locked_bolts[id]) {
        // Cannot re-open an open bolt.
        delete locked_bolts[id];
        self.locked_count--;

        onunlock && onunlock.apply(null, arguments);

        // If there are no more bolts to unlock, complete
        if(!self.locked_count) {
          self.complete();
        }
      }
    }

  };


  return Deadbolts;
}());
