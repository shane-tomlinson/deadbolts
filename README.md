# Deadbolts
A deadbolt is kind of like a promise, useful in asynchronous programming where several actions that could be running concurrently must complete before a single action is called.

The inspiration for the name came from remembering cheesy 70s movies where there are people in apartments in NYC with 4 or 5 locks on their doors, each of them needed to be unlocked before the door can be opened.

## Purpose
Useful any time several actions must complete before another action can be called.  An example of this is when several concurrent AJAX calls, each fetching a different set of data, must complete before a set of results can be computed from the returned data.

## Example - AJAX requests.

```
  var labels, issues;
  var computeResults = function() {
    // compute result set with both issues and labels.
  };

  var deadbolts = new Deadbolts(computeResults);
  $.get("/api/issues", deadbolts.bolt(function(data) {
    issues = data;
  }));

  $.get("/api/labels", deadbolts.bolt(function(data) {
    labels = data;
  }));
```

## License:
Mozilla MPL 2.0

## Author
* Shane Tomlinson
* @shane_tomlinson
* set117@yahoo.com
* stomlinson@mozilla.com
* http://shanetomlinson.com

