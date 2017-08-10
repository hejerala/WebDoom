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

class Timer {

    constructor() {
      var appInstance = this;

      // the local object contains all the private members used in this class
      // Do some initialization of the member variables for the app
	    this.__private__ = new WeakMap();
	    let privateData = {
        self: this,
        startTime: 0,
        endTime: 0
	    };
	    this.__private__.set( this, privateData );

      //this._initEventHandlers();

      return appInstance;
	}

  SetStartTime(sTime) {
    let m = this.__private__.get( this );
    m.startTime = sTime;
  }

  SetEndTime(eTime) {
    let m = this.__private__.get( this );
    m.endTime = eTime;
  }

  GetStartTime() {
    let m = this.__private__.get( this );
    return m.startTime;
  }

  GetEndTime() {
    let m = this.__private__.get( this );
    return m.endTime;
  }

  _initEventHandlers() {
    let m = this.__private__.get( this );
    // Define the Event handlers for the app
  }

  _getSystemTime() {
    return new Date().getTime();
  }

  // CreateTimer(timerName) {
  //   let m = this.__private__.get( this );
  //   m.timers[timerName] =
  // }

}  // Run the unnamed function and assign the results to app for use.
