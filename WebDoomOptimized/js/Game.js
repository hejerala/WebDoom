/*
 * Game Singleton for WebDoom
 *
 * @copyright: (C) 2017 Hector Ramirez in cooperation with Vancouver Film School.
 * All Rights Reserved.
 *
 * Based on an original work by XXXXXXXXXXXX.  All due credits to him for the
 * original concept and algorithms
 *
 * @author: Hector Ramirez
 * @link mailto:pg08hector@vfs.com
 * @version: 1.0.0
 * @summary: Framework Singleton Class to contain a web app
 *
 */

// Constants
//const MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
//const COUNTER       = 1;
const SECONDS_AS_MS = 1000;
const TARGET_FPS    = 70;
const TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
const MATH_PI    = 3.141592653589793;

var gameInstance = null;

class Game {

    constructor() {
        if (gameInstance != null)
            return gameInstance;

        gameInstance = this;

    	let privateData = {
            //secondsCounter: 0,
            //fpsCounter: 0,
	        // Start with tick 0
	    	tick: 0,
	    	lastTime: 0,

	    	theMap: null,
            theCharacter: null,
            theControls: null,
            theCamera: null
    	};
    	__private__.set( this, privateData );
    	let m = privateData;


    	var interval = setInterval( () => {

    	    let m = __private__.get( this );

    	    m.tick++;
    	    if (m.tick > 240)
    	        m.tick = 0;

	    }, TARGET_MS_PER_TICK );


	    //let res = MOBILE ? 512 : 768;
		let res = MOBILE ? 256 : 512;
	    m.theMap = new Map(100);
        m.theCharacter = new Player( 15.3, -1.2, MATH_PI * 0.3 );
	    m.theControls = new Controls();
	    //m.theCamera = new Camera( $('#display').get(0), res, 0.9, false);
        m.theCamera = new Camera( $('#display').get(0), res, 0.9, true);

	    $('#start-button').on('click', ( event ) =>{
            $('#start-button').fadeOut( 1 * SECONDS_AS_MS );
	        $('#splash-screen').fadeOut( 3 * SECONDS_AS_MS );
            $('#game-area').fadeIn( 1 * SECONDS_AS_MS );
            $('#hud-overlay').fadeIn( 2 * SECONDS_AS_MS );
	    });

        $('#the-button').on('click', () => {

            $.post('server.php', "cmd=update")
            	.then( ( resultString ) => {
            		// Do something with the obj
    		    });
         });

        return gameInstance;
    }

    run() {
        let m = __private__.get( this );

        $('#splash-screen').hide();
        $('#splash-screen').show();

		m.theMap.randomize();
        this._start( this._renderFrame );
	}

	// render start
	_start( callback ) {
	    let m = __private__.get( this );
        window.requestAnimationFrame( ( TARGET_MS_PER_TICK ) => { this._frame( TARGET_MS_PER_TICK ); } );
    }

    // render
	_frame( time ) {
        let m = __private__.get( this );
        // m.secondsCounter += (time - m.lastTime);
        // if (m.secondsCounter >= SECONDS_AS_MS) {
        //     console.log(m.fpsCounter);
        //     m.fpsCounter = 0;
        //     m.secondsCounter = 0;
        // } else {
        //     m.fpsCounter++;
        // }

        let seconds = (time - m.lastTime) / SECONDS_AS_MS;
        m.lastTime = time;

        this._update( seconds );
        this._render( seconds );

        window.requestAnimationFrame( ( seconds ) => { this._frame( seconds ); } );
    }

	_update( seconds ) {
        let m = __private__.get( this );

        m.tick++;
        if (m.tick > 240)
            m.tick = 0;

        m.theMap.update( seconds );
    	m.theCharacter.update( m.theControls.states, m.theMap, seconds );
	}

	_render( seconds ) {
	    let m = __private__.get( this );

		m.theCamera.render( m.theCharacter, m.theMap );
	}

}

$(document).ready( () => {
    let game = new Game();
    game.run();
});
