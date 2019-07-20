// onload
function window_onload(e) {
  update_time_ui();
  rightcircle.classList.add('ani_r_' + e + 's');
  leftcircle.classList.add('ani_l_' + e + 's');
}
//-----------------------------------------

// timer
function update_time_ui() {
  let min = s / 60;
  let sec = s % 60;
  if (min < 10) {
    min = '0' + Math.floor(min).toString();
  } else {
    min = Math.floor(min).toString();
  }
  if (sec < 10) {
    sec = '0' + sec.toString();
  } else {
    sec = sec.toString();
  }
  if (s <= start_s / 2 || s == start_s) {
    play_btn.classList.remove('mask');
  } else {
    play_btn.classList.add('mask');
  }
  if (s >= 60 && click_status == 'stop') {
    rest_time.innerHTML = min + ':' + '00';
  } else if (s >= 60 && click_status == '') {
    rest_time.innerHTML = min + ':' + '00';
  } else if (s < 60 && click_status == 'stop') {
    rest_time.innerHTML = min + ':' + sec;
  } else if (s < 60 && click_status == '') {
    rest_time.innerHTML = min + ':' + sec;
  } else {
    rest_time.innerHTML = min + ':' + sec;
  }
}
function time_count() {
  s -= 1;
  update_time_ui();
  t = setTimeout(function() {
    time_count();
  }, 1000);
}
function start_count() {
  if (!timer_is_on) {
    timer_is_on = 1;
    time_count();
  }
}
function pause_count() {
  clearTimeout(t);
  timer_is_on = 0;
}
function stop_count() {
  pause_count();
  s = start_s;
  update_time_ui();
}
function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
//-----------------------------------------

// processbar
function check_status(e_status) {
  if (e_status == 'pause') {
    play_icon.classList.add('d-block');
    play_icon.classList.remove('d-none');
    pause_icon.classList.add('d-none');
    pause_icon.classList.remove('d-block');
    play_btn.classList.add('play_color');
    play_btn.classList.remove('pause_color');
    stop_btn.classList.add('stop_btn_play_color');
    stop_btn.classList.remove('stop_btn_pause_color');
    leftcircle.setAttribute('style', 'animation-play-state: paused;');
    rightcircle.setAttribute('style', 'animation-play-state: paused;');
  } else if (e_status == 'play') {
    play_icon.classList.add('d-none');
    play_icon.classList.remove('d-block');
    pause_icon.classList.add('d-block');
    pause_icon.classList.remove('d-none');
    play_btn.classList.remove('play_color');
    play_btn.classList.add('pause_color');
    stop_btn.classList.remove('stop_btn_play_color');
    stop_btn.classList.add('stop_btn_pause_color');
    leftcircle.setAttribute('style', 'animation-play-state: running;');
    rightcircle.setAttribute('style', 'animation-play-state: running;');
    circle_process.classList.add('d-block');
    circle_process.classList.remove('d-none');
  } else if (e_status == 'stop') {
    play_icon.classList.add('d-block');
    play_icon.classList.remove('d-none');
    pause_icon.classList.add('d-none');
    pause_icon.classList.remove('d-block');
    play_btn.classList.add('play_color');
    play_btn.classList.remove('pause_color');
    stop_btn.classList.add('stop_btn_play_color');
    stop_btn.classList.remove('stop_btn_pause_color');
    circle_process.classList.remove('d-block');
    circle_process.classList.add('d-none');
  }
}
function play_processbar() {
  click_status = 'play'; //play, pause, stop
  check_status(click_status);
  start_count();
}
function pause_processbar() {
  click_status = 'pause'; //play, pause, stop
  check_status(click_status);
  pause_count();
}
function stop_processbar() {
  click_status = 'stop'; //play, pause, stop
  check_status(click_status);
  event.stopPropagation();
  stop_count();
}
//-----------------------------------------

const start_test = 10;
const start_work = 1500;
const start_break = 300;

let start_s = start_work;
let s = start_s;
let t;
let timer_is_on = 0;
let click_status = ''; //play, pause, stop

let list_data = ['吃飯', '睡覺', '打東東'];
let timer_data = [];
for (let i = 0; i < list_data.length; i++) {
  timer_data.push('work');
  if (i != list_data.length - 1) {
    timer_data.push('break');
  }
}

console.log(timer_data);
console.log('hello');

// DOM
let stop_btn = document.getElementById('stop_btn');
let play_btn = document.getElementById('play_btn');
let play_icon = document.getElementById('play_icon');
let pause_icon = document.getElementById('pause_icon');
let circle_process = document.getElementById('circle_process');
let rightcircle = document.getElementById('rightcircle');
let leftcircle = document.getElementById('leftcircle');
let rest_time = document.getElementById('rest_time');
//-----------------------------------------

// addEventListener
play_icon.addEventListener('click', play_processbar, false);
pause_icon.addEventListener('click', pause_processbar, false);
stop_btn.addEventListener('click', stop_processbar, false);
rightcircle.addEventListener('animationend', stop_processbar, false);
window.addEventListener('load', window_onload(start_s), false);

//-----------------------------------------
