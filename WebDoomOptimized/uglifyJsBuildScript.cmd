@echo off

 echo Running UglifyJs
 set COMMANDPATH = "C:\Users\pg08hector.VFS\AppData\Roaming\npm\uglifyjs"
 set PLAYER_PATH = "js\Player.js"
 set MAP_PATH = "js\Map.js"
 set CONTROLS_PATH = "js\Controls.js"
 set CAMERA_PATH = "js\Camera.js"
 set GAME_PATH = "js\Game.js"

 set OUTPUT_PATH = "js\webDoom.min.js"

 @REM echo uglifyjs %PLAYER_PATH% \ "%MAP_PATH%" \ %CONTROLS_PATH% \ %CAMERA_PATH% \ %GAME_PATH% -c -m -o %OUTPUT_PATH%

 @REM echo uglifyjs js/Player.js \ js/Map.js \ js/Controls.js \ js/Camera.js \ js/Game.js -c -m -o js/webDoom.min.js

 C:\Users\pg08hector.VFS\AppData\Roaming\npm\uglifyjs js\Player.js js\Map.js js\Controls.js js\Camera.js js\Game.js -o js\webDoom.min.js -c -m

 PAUSE
