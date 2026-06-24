import {state,setState} from './state.js';
let _onFail=()=>{};
export function initGeo(fn){_onFail=fn;}
export let locationRequestInFlight=false;
export function requestLocation(){
  if(locationRequestInFlight||state.location)return;
  if(!navigator.geolocation){_onFail();return}
  locationRequestInFlight=true;
  navigator.geolocation.getCurrentPosition(
    pos=>{locationRequestInFlight=false;setState({location:{lat:pos.coords.latitude,lon:pos.coords.longitude},near:true,mode:'near'},{url:true})},
    ()=>{locationRequestInFlight=false;_onFail()},
    {enableHighAccuracy:false,timeout:8000,maximumAge:0}
  )
}
