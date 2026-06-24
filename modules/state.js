export const DEFAULT_FILTERS={day:'',dayMode:'',time:'',region:'',type:'mass',siteUid:''};
export const state={query:'',parsed:{},filters:{...DEFAULT_FILTERS},location:null,near:false,nearExpanded:false,nearScope:'',mode:'home',moreSection:'help',modal:null,saved:new Set(),lang:'en',rows:[],results:[],next:null,loadError:'',dataStale:false,dataSource:'',detailRow:null,exactTimeStatus:null};
export function getState(){return state}
let _render=()=>{};
let _stateUrl=()=>'';
export function initApp(renderFn,stateUrlFn){_render=renderFn;_stateUrl=stateUrlFn;}
export function setState(patch={},options={}){
  Object.entries(patch).forEach(([key,value])=>{
    if(key==='filters')state.filters={...state.filters,...value};
    else state[key]=value;
  });
  if(options.syncInput!==false&&Object.prototype.hasOwnProperty.call(patch,'query')){const input=document.querySelector('#searchInput'); if(input)input.value=state.query||''}
  if(options.url)history.replaceState(null,'',_stateUrl());
  if(options.render!==false)_render();
}
export function setFilters(patch={},options={}){setState({filters:patch},options)}
export function setMode(mode,patch={},options={}){setState({mode,...patch},options)}
