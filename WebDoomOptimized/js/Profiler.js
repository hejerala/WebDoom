/**
 * App Singleton MAIN
 *
 * @copyright: (C) 2014-2016 Kibble Games Inc in cooperation with Vancouver Film School. All Rights Reserved.
 * @author: Hector Ramirez {@link mailto:pg08hector@vfs.com}
 * @version: 1.2.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 */
'use strict';

// Constants
var COUNT_TO = 100000;
var COUNT_BY = 1000;
var SECONDS_AS_MS = 1000;
var TARGET_FPS = 60;
var TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
var UPDATE_MIN_MS = 2000;

//var appInstance = null;

class Profiler {

    constructor() {
      if (appInstance != null)
          return appInstance;

      var appInstance = this;

      // the local object contains all the private members used in this class
      // Do some initialization of the member variables for the app
	    this.__private__ = new WeakMap();
	    let privateData = {
        self: this,
        timers: {},
        count: 0,
        done:   false,
        userId: 0
	    };
	    this.__private__.set( this, privateData );

      //this._initEventHandlers();

      return appInstance;
	}

  _initEventHandlers2() {
    let m = this.__private__.get( this );
    // Define the Event handlers for the app
  }

  _getSystemTime() {
    return new Date().getTime();
  }

  CreateTimersFromJson(data) {
    let m = this.__private__.get( this );
    //var result = JSON.parse(data);
    //var result2 = JSON.parse(result.json);
    //console.log(result.timers);
    for(var key in data.timers) {
      //var values = result.timers[key];
      m.self._CreateTimerFromObject(key, data.timers[key]);
    }
  }

  _CreateTimerFromObject(name, times) {
    //console.log(times);
    let m = this.__private__.get( this );
    m.timers[name] = new Timer();
    if(m.timers[name] != null) {
      m.timers[name].SetStartTime(times.startTime);
      m.timers[name].SetEndTime(times.endTime);
    }
  }

  GetTimer(timerName) {
    let m = this.__private__.get( this );
    return m.timers[timerName];
  }

  GetAllTimers() {
    let m = this.__private__.get( this );
    return m.timers;
  }

  CreateTimer(timerName) {
    let m = this.__private__.get( this );
    m.timers[timerName] = new Timer();
  }

  StartTimer(timerName) {
    let m = this.__private__.get( this );
    if(m.timers[timerName] != null) {
      m.timers[timerName].SetStartTime(m.self._getSystemTime());
    }
  }

  StopTimer(timerName) {
    let m = this.__private__.get( this );
    if(m.timers[timerName] != null) {
      m.timers[timerName].SetEndTime(m.self._getSystemTime());
    }
  }

	_run3() {
        // Run the app
		let m = this.__private__.get( this );
		// One way to make private things easier to read as members
    while(m.count <= COUNT_TO) {
      if (m.count%COUNT_BY == 0) {
        //console.log(m.count%COUNT_BY);
        let text = 'Counter: ' + m.count/COUNT_BY + ' * ' + COUNT_BY;
        document.querySelector('#results-area').innerHTML = text;
      }
      //console.log(m.count);
      m.count++;
    }

		// while (!_m.done) {
		// 	this._updateData();
		// 	this._refreshView();
		// }
	}

	_updateData() {
        // Update the app/simulation model
    	// is the app finished running?
    	let _m = this.__private__.get( this );
    	_m.done = true;
    }


	// Refresh the view - canvas and dom elements
    _refreshView() { }

}  // Run the unnamed function and assign the results to app for use.


// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return
// them
// $(document).ready( function() {
//
//     //let profiler = new Profiler();
//     //app.run();
//
// });
