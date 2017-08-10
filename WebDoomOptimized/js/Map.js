/*
 * Map class for WebDoom
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
 *
 */

class WallGrid {

    constructor( maxSize ) {
        this.size = maxSize;
        this.grid = new Uint8Array( maxSize * maxSize );
    }

    randomize() {
		var i = 0;
		var fullSize = this.size * this.size;
		while(i < fullSize) {
			this.grid[i] = Math.random() < 0.3 ? 1 : 0;
			i++;
		}
    }

    tile( x, y ) {
		let flooredX = Math.floor( x );
		let flooredY = Math.floor( y );
		if (flooredX < 0 || flooredX > this.size - 1 || flooredY < 0 || flooredY > this.size - 1)
            return -1;
		return this.grid[ flooredY * this.size + flooredX ];
    }
}


var mapInstance = null;

class Map {

    constructor( size ) {
	    if (mapInstance != null)
	        return mapInstance;

		this.wallGrid = new WallGrid( size );
		this.skybox = new Bitmap( 'images/deathvalley_panorama.jpg', 2000, 750 );
		this.wallTexture = new Bitmap( 'images/wall_texture.jpg', 1024, 1024 );
		this.light = 0;

	  mapInstance = this;
	  return mapInstance;
	}

	randomize() {
	    this.wallGrid.randomize();
	}


	cast( point, castAngle, castRange ) {
	    let noWall = { length2 : Infinity };
        let castRay = {
            x:        point.x,
            y:        point.y,
            height:   0,
            distance: 0,
            angle:    castAngle,
            range:    castRange
        };

        return this._ray( castRay );
	}


	_ray( aRay ) {
        let theRay = aRay;

		let angleSin = Math.sin( theRay.angle );
		let angleCos = Math.cos( theRay.angle );

		let stepX = Map.step( angleSin, angleCos, theRay.x, theRay.y );
        let stepY = Map.step( angleCos, angleSin, theRay.y, theRay.x, true );

        let nextStepRay = null;
        if (stepX.distance < stepY.distance) {
			nextStepRay = this._inspect( stepX, 1, 0, theRay.distance, stepX.y, angleSin, angleCos );
        } else {
			nextStepRay = this._inspect( stepY, 0, 1, theRay.distance, stepY.x, angleSin, angleCos );
        };
        nextStepRay.angle = theRay.angle;
        nextStepRay.range = theRay.range;

		if (nextStepRay.distance > theRay.range || theRay.height === 1)
			return [theRay];

	    // process the rayList
        return [theRay].concat( this._ray( nextStepRay ) );
    }


    static step( rise, run, x, y, inverted ) {
        if (run === 0)
            return noWall;

        var dx = 0;
        if (run > 0) {
			dx = ~~( x + 1 ) - x;
        } else {
            dx = Math.ceil( x - 1 ) - x;
        }
        var dy = dx * (rise / run);

        if (inverted) {
            var theX = y + dy;
            var theY = x + dx;
        } else {
            var theX = x + dx;
            var theY = y + dy;
        }

        return {
            x : theX,
            y : theY,
            distance : dx * dx + dy * dy
        };
    }


    _inspect( deltaStep, shiftX, shiftY, distance, offset, castAngleSin, castAngleCos ) {
		let dx = (castAngleCos < 0 ? shiftX : 0);
        let dy = (castAngleSin < 0 ? shiftY : 0);

        deltaStep.height = this.wallGrid.tile( deltaStep.x - dx, deltaStep.y - dy );
        deltaStep.distance = distance + Math.sqrt( deltaStep.distance );
        if (shiftX) {
			deltaStep.shading = castAngleCos < 0 ? 2 : 0;
        } else {
			deltaStep.shading = castAngleSin < 0 ? 2 : 1;
        }
		var mFloor = Math.floor( offset );
		var sFloor = ~~( offset );
		deltaStep.offset = offset - (~~( offset ));
        return deltaStep;
    }



	update( seconds ) {
		var rand = Math.random();
		var superrand = rand * 8;
	    if (this.light > 0) {
	        this.light = Math.max( this.light - 10 * seconds, 0 );
	    } else if (superrand < seconds) {
	        this.light = 4;
	    }
	}

}
