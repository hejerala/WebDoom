<?php
include '../AJAXServer.php';
include '../Timer.php';

class Server extends AJAXServer {
    // ========================================================================
    //
    // Login Handler
    //
    public function handleAction( $request ) {
      //$date = new DateTime();
      $timers = array();// []
      $timers["profilerTestPhp"] = new Timer();
      //$startT = $date->getTimestamp();
      //$startDate = new DateTime();
      //$timers["profilerTestPhp"]->SetStartTime($startDate->getTimestamp());
      $timers["profilerTestPhp"]->SetStartTime(round(microtime(true) * 1000));
      // The 'action' requested is named for the folder this server lives in

      $num = $request['iterations'];

      $primeCount = $this->howManyPrimes($num);

      // for($i = 0; $i <= $num; $i++) {
      //   if($this->isPrime($i)) {
      //     $primeCount++;
      //   }
      // }

      // Authenticate with username and password
      // Here is the actual worker function, this is where you do your server sode processing and
      // then generate a json data packet to return.

      // Here is what we will send back (echo) to the person that called us.
      // fill this dictionary with attribute => value pairs, then
      // encode as a JSON string, then
      // echo back to caller
      //$endT = $date->getTimestamp();
      //$endDate = new DateTime();
      //$timers["profilerTestPhp"]->SetEndTime($endDate->getTimestamp());
      $timers["profilerTestPhp"]->SetEndTime(round(microtime(true) * 1000));

      $response = [ ];

      // Do what you need to do with the info. The following are some examples.
      // This is the real set of actual things we use
      $response["error"] = -1;
      $response["iterations"] = $num;
      $response["primeCount"] = $primeCount;
      $response["timers"] = $timers;
      //$response["json"] = json_encode( $response );
      $response["error"] = 0;

      return $response;
    }

    function howManyPrimes($num) {
      $primeCounter = 0;
      for($i = 0; $i <= $num; $i++) {
        if($this->isPrime($i)) {
          $primeCounter++;
        }
      }
      return $primeCounter;
    }

    function isPrime($num) {
      //1 is not prime. See: http://en.wikipedia.org/wiki/Prime_number#Primality_of_one
      if($num == 1)
          return false;

      //2 is prime (the only even number that is prime)
      if($num == 2)
          return true;

      /**
       * if the number is divisible by two, then it's not prime and it's no longer
       * needed to check other even numbers
       */
      if($num % 2 == 0) {
          return false;
      }

      /**
       * Checks the odd numbers. If any of them is a factor, then it returns false.
       * The sqrt can be an aproximation, hence just for the sake of
       * security, one rounds it to the next highest integer value.
       */
      $ceil = ceil(sqrt($num));
      for($i = 3; $i <= $ceil; $i = $i + 2) {
          if($num % $i == 0)
              return false;
      }

      return true;
  }


}

$myServer = new Server ();
?>
