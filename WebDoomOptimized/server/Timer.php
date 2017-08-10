<?php

class Timer {
  var $startTime;
  var $endTime;

	function SetStartTime($new_start) {
		$this->startTime = $new_start;
	}
  function GetStartTime() {
		return $this->startTime;
	}
	function SetEndTime($new_end) {
		$this->endTime = $new_end;
	}
	function GetEndTime() {
		return $this->endTime;
	}

}

?>
