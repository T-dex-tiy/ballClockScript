
function ballClock(numBalls) {
  var ramp=[5,12,12];
  // This variable sets up the ramps for the clock
  var ramps = (new Array(ramp.length)).fill(null).map(n => []);

// Giving the balls "numBalls" a unique number for tracking
  var available = (new Array(numBalls).fill(null)).map((n, i) => i);
// build the ramps and adding the balls
  function addToRamp(rampIdx, ball) {
    if (ramps[rampIdx].length == ramp[rampIdx] - 1) {
      available.unshift.apply(available, ramps[rampIdx]);
      ramps[rampIdx].length = 0;
      if (rampIdx == ramp.length - 1) {
        // last ramp puts ball back in available
        available.unshift(ball);
      } else {
        addToRamp(rampIdx + 1, ball);
      }
    } else {
      ramps[rampIdx].push(ball);
    }

  }

  // discover transformation: keep adding to ramp until all balls back to available tray
  var loopCount = 0;
  do {
    addToRamp(0, available.pop());
    loopCount++;
  } while (available.length != numBalls);

  // "available" is now a transformation array
  // loops over available balls for final count
  var transformation = available.concat([]);
  var totalCount = loopCount;
  while (available.some((b, i) => i && (available[i] < available[i - 1]))) {
    available = transformation.map(b => available[b]);
    totalCount += loopCount;
  }
  // adjusting total count from minutes to days
  var finalCount=(totalCount/60)/24
  var timeSec=totalCount*60
  var timeMilSec=(timeSec)*1000
  var final= numBalls+ " balls cycle after "+finalCount+ " days. Completed in "+timeMilSec+" millseconds. ("+timeSec+" seconds)";
  return final
}

// ballState



function ballClockState(numBalls, time) {
  var ramp=[5,12,12];
  // This variable sets up the ramps for the clock
  var ramps = (new Array(ramp.length)).fill(null).map(n => []);
// Giving the balls "numBalls" a unique number for tracking
  var ballArr=(new Array(numBalls).fill(null)).map((n, i) => i+1);
  var available = ballArr.reverse();

// build the ramps and adding the balls
  function addToRamp(rampIdx, ball) {
    if (ramps[rampIdx].length == ramp[rampIdx] - 1) {
      available.unshift.apply(available, ramps[rampIdx]);
      ramps[rampIdx].length = 0;
      if (rampIdx == ramp.length - 1) {
        // last ramp puts ball back in available
        available.unshift(ball);
      } else {
        addToRamp(rampIdx + 1, ball);
      }
    } else {
      ramps[rampIdx].push(ball);
    }
  }

  // discover transformation: keep adding to ramp until all balls back to available tray
  var loopCount = 0;
  do {
    addToRamp(0, available.pop());
    loopCount++;
  } while (loopCount != time);

  var ballState={"Min":ramps[0],"FiveMin":ramps[1],"Hour":ramps[2],"Main":available};

  return ballState
}
