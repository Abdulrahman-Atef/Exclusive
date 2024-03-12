import React, { useState } from 'react'
import style from './flash.module.css'

export default function DownCount() {

  const [days, setdays] = useState(0)
  const [hours, sethours] = useState(0)
  const [minutes, setminutes] = useState(0)
  const [seconds, setseconds] = useState(0)
  const [Expired, setExpired] = useState(false)

  let countDownDate = new Date("Jan 1, 2025 9:37:25").getTime();

// Update the count down every 1 second
  let x = setInterval(countDownTimer, 1000)

  function countDownTimer() {

  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  

  if (distance < 0) {
  clearInterval(x);
  setExpired(true);
  }
  else{
    setdays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    sethours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setminutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setseconds(Math.floor((distance % (1000 * 60)) / 1000));
  }
};


  return<>
    {Expired?<div>
      " There were offers but they ended "
    </div>:
      <div className={`${style.time} d-flex gap-3 fw-bold fs-3 align-items-center`}>
        <div>
          <span className='fs-12 fw-medium'>Days</span>
          <span className='d-block'>{days}</span>
        </div>
        <span className='text-danger pt-3'>:</span>
        <div>
          <span className='fs-12 fw-medium'>Hours</span>
          <span className='d-block'>{hours}</span>
        </div>
        <span className='text-danger pt-3'>:</span>
        <div>
          <span className='fs-12 fw-medium'>Minutes</span>
          <span className='d-block'>{minutes}</span>
        </div>
        <span className='text-danger pt-3'>:</span>
        <div>
          <span className='fs-12 fw-medium'>Seconds</span>
          <span className='d-block'>{seconds}</span>
        </div>
      </div>
    }
  </>
}
