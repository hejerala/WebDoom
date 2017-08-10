/*
 * Player class for WebDoom
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

 class Bitmap {
    constructor( src, width, height ) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
    }
 }

class Player {

    constructor( x, y, direction ) {
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.weapon = new Bitmap('images/knife_hand.png', 319, 320);
		this.paces = 0;
	}


	rotate( angle ) {
        this.direction = (this.direction + angle + MATH_PI * 2) % (MATH_PI * 2);
	}


	walk( distance, map ) {
		var dx = Math.cos(this.direction) * distance;
		var dy = Math.sin(this.direction) * distance;

		if (map.wallGrid.tile( this.x + dx, this.y ) <= 0)
			this.x += dx;

		if (map.wallGrid.tile( this.x, this.y + dy ) <= 0)
			this.y += dy;

		this.paces += distance;
	}


	update( controls, map, seconds ) {
		if (controls.left)
            this.rotate(-MATH_PI * seconds);

		if (controls.right)
			this.rotate(MATH_PI * seconds);

		if (controls.forward)
			this.walk(3 * seconds, map);

		if (controls.backward)
			this.walk(-3 * seconds, map);
	}

}
