/*
 * Camera class for WebDoom
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
const MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

class Camera {

	constructor( canvas, resolution, focalLength, prerender ) {
		this.screenWidth = window.innerWidth * 0.5;
		this.screenHeight = window.innerHeight * 0.5;
		this.preRender = prerender;

		canvas.width = this.screenWidth;
		canvas.height = this.screenHeight;

		if (this.preRender) {
			this.screenCtx = canvas.getContext( '2d' );

			this.offScreenCanvas = this.createOffscreenCanvas(this.screenWidth, this.screenHeight);
			this.ctx = this.offScreenCanvas.getContext( '2d' );

		} else {
			this.ctx = canvas.getContext( '2d' );
		}

	    this.width = canvas.width;
	    this.height = canvas.height;

	    this.resolution = resolution;
	    this.spacing = this.width / resolution;

	    this.focalLength = focalLength || 0.8;
	    this.lightRange = 8;
	    this.scale = (this.width + this.height) / 1200;

	    //this.range = MOBILE ? 8 : 14;
		this.range = MOBILE ? 6 : 10;

	    this.rainEnabled = true;
	    this.lighteningEnabled = true;
	}

	createOffscreenCanvas(width,height) {
	    var canvas = document.createElement('canvas');
	    canvas.width = width;
	    canvas.height = height;
	    return canvas;
	}

	render( player, map ) {
	    this.drawSky( player.direction, map.skybox, map.light );
	    this.drawColumns( player, map );
	    this.drawWeapon( player.weapon, player.paces );
		if (this.preRender)
			this.screenCtx.drawImage(this.offScreenCanvas, 0, 0, this.screenWidth, this.screenHeight);
	}

	drawSky( direction, sky, ambient ) {
		var local = {
			width: sky.width * (this.height / sky.height) * 2,
			left: (direction / (MATH_PI * 2)) * -this.width
		}

	    this.ctx.save();

	    this.ctx.drawImage( sky.image, local.left, 0, local.width, this.height );
	    if (local.left < local.width - this.width) {

	        this.ctx.drawImage( sky.image, local.left + local.width, 0, local.width, this.height );
	    }

	    // lightning aka a fill on the rectangle
	    if (this.lighteningEnabled) {
	        if (ambient > 0) {

	            this.ctx.fillStyle = '#ffffff';
	            this.ctx.globalAlpha = ambient * 0.3;
				this.ctx.fillRect( 0, 0, local.width, this.height * 0.5 );
	        }
	    }
	    this.ctx.restore();
	}

    drawWeapon(weapon, paces) {
        var bobX = Math.cos( paces * 2 ) * this.scale * 6;
        var bobY = Math.sin( paces * 4 ) * this.scale * 6;

        var left = this.width * 0.66 + bobX;
        var top = this.height * 0.6 + bobY;

        this.ctx.drawImage( weapon.image, left, top, weapon.width * this.scale, weapon.height * this.scale );
    }

	drawColumns( player, map ) {
		var ctx = this.ctx;
	    var texture = map.wallTexture;
	    ctx.save();

		var column = 0;
		while (column < this.resolution) {
			var x = column / this.resolution - 0.5;
	        var angle = Math.atan2( x, this.focalLength );
	        var ray = map.cast( player, player.direction + angle, this.range );

			//Draw Single Column
			var firstWall = -1;
			var rainMultiplier = 1.0;
			var left = ~~( column * this.spacing );
		    var width = Math.ceil( this.spacing );
			var s = 0;
			var rayLength = ray.length;
			while (++firstWall < rayLength && ray[firstWall].height <= 0);
			if (firstWall == rayLength)
				rainMultiplier = 0.1;
			if (firstWall >= this.range/2)
				rainMultiplier = 0.2;
			while (s < rayLength) {
				var step = ray[s];
				if (s == firstWall) {
					//Draw Wall
					var textureX = ~~( texture.width * step.offset );
					var wall = this.project( step.height, angle, step.distance );

					ctx.globalAlpha = 1;
					ctx.drawImage( texture.image, textureX, 0, 1, texture.height, left, wall.top, width, wall.height );
					// Lighting darken with distance
					var mapLightFactor = 0.4;
					if (this.lighteningEnabled) {
						mapLightFactor = map.light;
					}
					ctx.fillStyle = '#000000';
					ctx.globalAlpha = Math.max( (step.distance + step.shading) / this.lightRange - mapLightFactor, 0 );
					ctx.fillRect( left, wall.top, width, wall.height );
				}
				//Draw Rain
				if (this.rainEnabled) {
					ctx.fillStyle = '#ffffff';
					ctx.globalAlpha = 0.15;
					var rainDrops = Math.pow( Math.random(), 3 ) * ((rayLength-s)*rainMultiplier);
					var rain = (rainDrops > 0) && this.project( 0.1, angle, step.distance );
					while (--rainDrops > 0) {
						ctx.fillRect( left, Math.random() * rain.top, 1, rain.height );
					}
				}
				s++;
			}


			column++;
		}

	    ctx.restore();
	}

	project( height, angle, distance ) {
	    var z = distance * Math.cos( angle );
	    var wallHeight = this.height * height / z;
	    var bottom = this.height / 2 * (1 + 1 / z);

	    return {
	        top : bottom - wallHeight,
	        height : wallHeight
	    };
	}

}
