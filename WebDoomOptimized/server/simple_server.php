<?php

/* ===============================================================================================
 * AJAX Action handler class
 *
 */
class Server {

    private $debug_mode = TRUE;

    public function __construct() {

        $response = $this->is_error( 101, "Not an AJAX request." );
        if ($this->is_ajax()) {

            $response = $this->is_error( 102, "No action specified." );
            //Checks if action value exists
            if (isset($_POST["action"]) && !empty($_POST["action"])) {

                // Get the action requested
                $action = $_POST["action"];

                //Switch case for value of action, make these up as needed
                switch( $action ) {
                    case "logon":
                        $response = $this->user_logon( $_POST );
                        $response["error_code"] = 0;
                        break;

                    case "validate":
                        $response = $this->check_restaurant();
                        $response["error_code"] = 0;
                        break;

                    default:
                        $response = $this->is_error( 103, "Invalid action." );
                        break;
                }
            }
        }

        // Respond to the client with a JSON string containing attrib => value pairs encoded
        echo json_encode( $response );
        return 0;
    }


    private function is_ajax() {

        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }


    /*
     * When we encounter an error the handler should call is error with a message and hand that back
     * as a response to the client
     */
    private function is_error( $error_code, $error_msg ) {

        // Create a response array (attrib => value) with the origingal post params to start
        $response = $_POST;

        // Add our error message
        $response["error_code"] = $error_code;
        $response["error"] = "Error " . $error_code . " - " . $error_msg;

        // convert the whole response to a JSON string, then add that string
        // as another element to the return message
        //
        // This lets us see the data coming back as a string in the debugger
        if ($this->debug_mode) {

            $response["json"] = json_encode( $response );
        }

        // Respond to the client with a JSON string containing attrib => value pairs encoded
        return $response;
    }

    private function user_logon( $request ) {
        // The 'action' requested is named for the folder this server lives in

        $username = $request ['name'];
        $passwd = $request ['passwd'];

        // Authenticate with username and password
        // Here is the actual worker function, this is where you do your server sode processing and
        // then generate a json data packet to return.

        // Here is what we will send back (echo) to the person that called us.
        // fill this dictionary with attribute => value pairs, then
        // encode as a JSON string, then
        // echo back to caller
        $response = [ ];

        // Do what you need to do with the info. The following are some examples.
        // This is the real set of actual things we use
        $response ["error"] = - 1;
        if ($_POST ["nick-name"] == "") {
            $response ["nick-name"] = "John Doe";
        }
        $response ["nick-name"] = $_POST ["nick-name"];
        $response ["id"] = password_hash ( $passwd, PASSWORD_DEFAULT );
        $response ["msg"] = "You are logged in " . $response ["nick-name"];
        $response ["error"] = 0;

        return $response;
    }


    private function check_restaurant() {

        $response = [];

        $response["favorite_restaurant"] = $_POST["favorite_restaurant"];
        if ($response["favorite_restaurant"] = "") {

            $response["favorite_restaurant"] = "Joeys";
        }

        // Do what you need to do with the info. The following are some examples.
        $response["favorite_beverage"] = $_POST["favorite_beverage"];
        if ($response["favorite_beverage"] == ""){
             $response["favorite_beverage"] = "Pepsi";
        }

        return $response;
    }


    // Here is the actual worker function, this is where you do your server sode processing and
    // then generate a json data packet to return.
    //
    private function update_restaurant() {

        $response = [];

        $response["favorite_beverage"] = $_POST["favorite_beverage"];

        // Do what you need to do with the info. The following are some examples.
        if ($response["favorite_beverage"] == ""){
             $response["favorite_beverage"] = "Coke";
        }

        $response["favorite_restaurant"] = "McDonald's";
        return $response;
    }
}


// ========================================================================
//
// MAIN Handler to process POST requests
//
$ajax_post_handler = new Server;
?>