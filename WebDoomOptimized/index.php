<!DOCTYPE html>
<html>
    <head>
        <title>Game Demo</title>

        <link rel="stylesheet" href="css/style.css">

        <!-- This is the key CDN to pull jQuery from -->
        <!-- To operate offline we may want these to load from a local source -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.js"></script>

        <script>
        const __private__ = new WeakMap();
        </script>
        <script src="js/webDoom.min.js"></script>
        <!--<script src="js/Player.js"></script>
        <script src="js/Map.js"></script>
        <script src="js/Controls.js"></script>
        <script src="js/Camera.js"></script>
        <script src='js/Game.js'></script>-->

        <style>
            body { background: #000; margin: 0; padding: 0; width: 100%; height: 100%; }
        </style>
   </head>
   <body>
        <div id="wrapper">
            <nav class='panel'></nav>

            <div id="app-area" class='show'>

                <div id='game-area' class='screen'>
                    <canvas id='display' width='1' height='1' style='width: 100%; height: 100%;' />
                </div>

                <div id='start-button' class='button'>Start!</div>

                <div id='hud-overlay' class='screen'>
                    <div id='hud-UL' class='hud-elem'></div>
                    <div id='hud-UR' class='hud-elem'></div>
                    <div id='hud-LL' class='hud-elem'></div>
                    <div id='hud-LR' class='hud-elem'></div>
                </div>

                <div id='splash-screen' class='screen'></div>

                <aside id='debug-menu'>
                    <div id='debug-area'></div>
                </aside>

            </div>
            <div id="the-button" class='button'>Send to Server</div>

        </div>
        <div id="debug-info" style="background-color: white; color:black; border: 2px solid blue;" class='debug'></div>

    </body>
</html>
