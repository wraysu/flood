/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","./maybe","./nextTick","./PerformanceSampler","./PooledArray","./promiseUtils"],(function(e,t,r,n,a,o){"use strict";let s=function(e){this.phases=e,this.paused=!1,this.ticks=-1,this.removed=!1},i=function(){function e(e){this.callback=e,this.isActive=!0}return e.prototype.remove=function(){this.isActive=!1},e}(),c=-1,u=0;const l={time:0,deltaTime:0,elapsedFrameTime:0,frameDuration:0},m=["prepare","preRender","render","postRender","update"],f=[],p=new a;let d=function(){function e(e){this._task=e}var t=e.prototype;return t.remove=function(){this._task.removed=!0},t.pause=function(){this._task.paused=!0},t.resume=function(){this._task.paused=!1},e}();const h={frameTasks:p,rafId:null,requestNextFrame:null,willDispatch:!1,clearFrameTasks:function(e=!1){p.forAll((e=>{e.removed=!0})),e&&F()},dispatch:T,executeFrameTasks:function(e=performance.now()){c<0&&(c=e);const t=e-c,r=u>0?u:1e3/60,n=Math.max(0,t-r);c=e;const a=performance.now();for(let a=0;a<m.length;a++){const o=performance.now(),s=m[a];p.forAll((o=>{var i;if(o.paused||o.removed)return;0===a&&o.ticks++;o.phases[s]&&(l.time=e,l.deltaTime=0===o.ticks?0:t,l.elapsedFrameTime=performance.now()-e,l.frameDuration=r-n,null==(i=o.phases[s])||i.call(o,l))})),A[a].record(performance.now()-o)}F(),b.record(performance.now()-a)}};function w(e=performance.now()){h.rafId=null,p.length>0&&(h.rafId=k()),h.executeFrameTasks(e)}function k(){return h.requestNextFrame?h.requestNextFrame(x):x()}const v=new a;function F(){p.forAll((e=>{e.removed&&v.push(e)})),p.removeUnorderedMany(v.data,v.length),v.clear()}function T(){for(;f.length;){const e=t.assumeNonNull(f.shift());e.isActive&&e.callback()}h.willDispatch=!1}function x(){return requestAnimationFrame(w)}const A=m.map((e=>new n(e))),b=new n("total");e.FrameTaskHandle=d,e.addFrameTask=function(e){const t=new s(e);return p.push(t),h.rafId||(c=-1,h.rafId=k()),new d(t)},e.debug=h,e.performanceInfo=A,e.performanceTotal=b,e.requestNextFrame=k,e.schedule=function(e){const t=new i(e);return f.push(t),h.willDispatch||(h.willDispatch=!0,r(T)),t},e.setFrameDuration=function(e){u=Math.max(0,e)},e.waitTicks=function(e=1,t){const n=o.createResolver(),a=()=>{o.isAborted(t)?n.reject(o.createAbortError()):0===e?n():(--e,r((()=>a())))};return a(),n.promise},Object.defineProperty(e,"__esModule",{value:!0})}));
