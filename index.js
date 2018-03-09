// Setting up ramps for clock
const ramp=[5,12,12];
const ramps = (new Array(ramp.length)).fill(null).map(n => []);

function ballClock(numBalls) {
// Giving the balls "numBalls" a unique number for tracking
  let available = (new Array(numBalls).fill(null)).map((n, i) => i);
// build the ramps and adding the balls
  const addToRamp=(rampIndex, ball)=> {
    if (ramps[rampIndex].length == ramp[rampIndex] - 1) {
      available.unshift.apply(available, ramps[rampIndex]);
      ramps[rampIndex].length = 0;
      if (rampIndex == ramp.length - 1) {
        // last ramp puts ball back in available
        available.unshift(ball);
      } else {
        addToRamp(rampIndex + 1, ball);
      }
    } else {
      ramps[rampIndex].push(ball);
    }
  }

// looping over until all balls are back in available
  let loop= 0;
  do {
    addToRamp(0, available.pop());
    loop++;
  } while (available.length != numBalls);

  // "available" is now a transformation array
  // loops over available balls for final count
  const transformation = available.concat([]);
  let totalCount = loop;
  while (available.some((b, i) => i && (available[i] < available[i - 1]))) {
    available = transformation.map(b => available[b]);
    totalCount += loop;
  }
  // adjusting total count from minutes to days
  const finalCount=(totalCount/60)/24
  const timeSec=totalCount*60
  const timeMilSec=(timeSec)*1000
  const final= numBalls+ " balls cycle after "+finalCount+ " days. Completed in "+timeMilSec+" millseconds. ("+timeSec+" seconds)";
  return final
}

// ballState
function ballClockState(numBalls, time) {
  const ballArr=(new Array(numBalls).fill(null)).map((n, i) => i+1);
  const available = ballArr.reverse();
  const addToRamp=(rampIndex, ball)=> {
    if (ramps[rampIndex].length == ramp[rampIndex] - 1) {
      available.unshift.apply(available, ramps[rampIndex]);
      ramps[rampIndex].length = 0;
      if (rampIndex == ramp.length - 1) {
        // last ramp puts ball back in available
        available.unshift(ball);
      } else {
        addToRamp(rampIndex + 1, ball);
      }
    } else {
      ramps[rampIndex].push(ball);
    }
  }
  // discover transformation: keep adding to ramp time limit is reached.
  let loop = 0;
  do {
    addToRamp(0, available.pop());
    loop++;
  } while (loop != time);
  const ballState={"Min":ramps[0],"FiveMin":ramps[1],"Hour":ramps[2],"Main":available};
  return ballState
}
