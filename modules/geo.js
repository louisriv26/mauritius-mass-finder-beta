import {state,setState} from './state.js';
let _onFail=()=>{};
export function initGeo(fn){_onFail=fn;}
export let locationRequestInFlight=false;
export function requestLocation(){
  if(locationRequestInFlight||state.location)return;
  if(!navigator.geolocation){_onFail('unsupported');return}
  locationRequestInFlight=true;
  navigator.geolocation.getCurrentPosition(
    pos=>{locationRequestInFlight=false;setState({location:{lat:pos.coords.latitude,lon:pos.coords.longitude},near:true,mode:'near',locationStatus:''},{url:true})},
    err=>{locationRequestInFlight=false;
      // 1=PERMISSION_DENIED 2=POSITION_UNAVAILABLE 3=TIMEOUT. A denial cannot be re-prompted
      // by script - the browser remembers it - so the reason must reach the UI.
      const code=err&&err.code;
      _onFail(code===1?'denied':code===3?'timeout':'unavailable')},
    {enableHighAccuracy:false,timeout:8000,maximumAge:0}
  )
}
