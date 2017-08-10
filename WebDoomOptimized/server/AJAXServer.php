<?php
/** ===============================================================================================
 * AJAX Action handler class
 * @copyright: (C) 2014-2016 Kibble Games Inc in cooperation with Vancouver Film School. All Rights Reserved.
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com}
 * @version: 1.1.0
 *
 * 			DO NOT MODIFY THIS CLASS
 *
 * Subclass this AJAXServer and override the one method, handleAction to extend the server
 * capabilities.
 *
 * Each command lives in its own folder. Each folder should contain a single index.php.
 * Each index.php should contain a Server class that extends AJAXServer (this file/class).
 * Each Server class created in this way should implement one method (an override) handleAction().
 * Finally, each server needs to be created the net effect of which is to call the handleAction method.
 *
 * The folder path acts as the command, i.e:
 *
 * 		If a client JS app wants to post a login command it would $.post('server/login', data ) ...
 *
 * 		The index.php under server/login would be interpreted.  A server defined and then created
 * 		before data can be processed and sent back (if any).
 *
 */
class AJAXServer {

    private $debug_mode          = TRUE;

    public function __construct() {

        $response["error"] = -1; // unknown
        $request = $this->valid_request();
        if ($request != NULL) { //Checks if action value exists

            $response = $this->handleAction( $request );
        }
        echo json_encode( $response );
        return 0;
    }


    public function handleAction( $request ) {
        /**
         * @return response, a dictionary of attribute:values to pass back to the client
         *
         * @param request is a php dictionary of parameters passed from the client
         *
         * @desc PURE VIRTUAL method,
         *        this is the only method that needs to be overriden in a subclass to handle
         *       action requests from a client.
         */
        $response = $request;
        $response['error'] = 0; // All OK

        // must return a JSON string as a response
        return $response;
    }


    private function is_ajax() {
        /**
         * @return boolean indicating if this request was a standard http request
         *          or an ill concieved GET request from an errant form or user.
         */
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

    private function valid_request() {
        /**
         * @return request dictionary, all of the parameters of the request are converted to this
         */
        $request = NULL;

        // this is geared to JQuery style urlencodes paramaters
        if ($this->is_ajax() || ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST))) {
        	$request = $_POST;

       	} elseif ($_SERVER['REQUEST_METHOD']=="GET" && !empty($_GET)) {
        	$request = $_GET;

        } elseif (empty($_POST)) {
        	// this is geared to Angular and data posted via JSON rather than urlencoded
        	// paramaters JQuery style

        	$request = (array)json_decode(file_get_contents('php://input'), true);
        	$_POST = $request;
        };

        return $request;
    }


    private function is_error( $error_msg ) {
        /**
         * @return dictionary containing an error message given a specif error code
         */

        // Create a response array (attrib => value) with the origingal post params to start
        $response = $_POST;

        // Add our error message
        $response["error"] = $error_msg;

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
};
?>