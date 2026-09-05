import {state,setState} from './state.js';
let _onFail=()=>{};
export function initGeo(fn){_onFail=fn;}
export let locationRequestInFlight=false;
let _watchdog=null;
let _requestId=0;
function clearWatchdog(){if(_watchdog){clearTimeout(_watchdog);_watchdog=null}}
export function requestLocation(){
  if(locationRequestInFlight||state.location)return;
  if(!navigator.geolocation){_onFail('unsupported');return}
  locationRequestInFlight=true;
  const myId=++_requestId;
  // Some iOS home-screen installs never invoke either geolocation callback for a
  // blocked permission - not an error, not the native timeout, just silence. Without
  // an independent watchdog that leaves locationRequestInFlight stuck true forever,
  // and every later tap of Retry becomes a true no-op: no re-render, no new message.
  _watchdog=setTimeout(()=>{
    if(myId!==_requestId)return;               // a newer request already took over
    _watchdog=null;locationRequestInFlight=false;_onFail('timeout');
  },9000);
  navigator.geolocation.getCurrentPosition(
    pos=>{
      if(myId!==_requestId)return;             // the watchdog already gave up and moved on
      clearWatchdog();locationRequestInFlight=false;
      setState({location:{lat:pos.coords.latitude,lon:pos.coords.longitude},near:true,mode:'near',locationStatus:''},{url:true});
    },
    err=>{
      if(myId!==_requestId)return;
      clearWatchdog();locationRequestInFlight=false;
      // 1=PERMISSION_DENIED 2=POSITION_UNAVAILABLE 3=TIMEOUT. A denial cannot be re-prompted
      // by script - the browser remembers it - so the reason must reach the UI.
      const code=err&&err.code;
      _onFail(code===1?'denied':code===3?'timeout':'unavailable');
    },
    {enableHighAccuracy:false,timeout:8000,maximumAge:0}
  )
}
