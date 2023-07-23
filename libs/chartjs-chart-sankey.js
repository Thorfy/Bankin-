/*!
 * chartjs-chart-sankey v0.12.0
 * https://github.com/kurkle/chartjs-chart-sankey#readme
 * (c) 2022 Jukka Kurkela
 * Released under the MIT license
 */
!function(t,o){"object"==typeof exports&&"undefined"!=typeof module?o(require("chart.js"),require("chart.js/helpers")):"function"==typeof define&&define.amd?define(["chart.js","chart.js/helpers"],o):o((t="undefined"!=typeof globalThis?globalThis:t||self).Chart,t.Chart.helpers)}(this,(function(t,o){"use strict";function e(t){return t&&-1!==["min","max"].indexOf(t)?t:"max"}const r=t=>void 0!==t;function n(t,o){const e=t.filter((t=>!o.has(t)));return e.length?e:t.slice(0,1)}const a=(t,o)=>t.x!==o.x?t.x-o.x:t.y-o.y;let i=-1;function s(t,o,e=function(){return i=i<100?i+1:0,i}()){let r=0;for(const n of t)n.node._visited!==e&&(n.node._visited=e,r+=n.node[o].length+s(n.node[o],o,e));return r}const l=t=>(o,e)=>s(o.node[t],t)-s(e.node[t],t)||o.node[t].length-e.node[t].length;function c(t,o){t.from.sort(l("from"));for(const e of t.from){const t=e.node;r(t.y)||(t.y=o,c(t,o)),o=Math.max(t.y+t.out,o)}return o}function h(t,o){t.to.sort(l("to"));for(const e of t.to){const t=e.node;r(t.y)||(t.y=o,h(t,o)),o=Math.max(t.y+t.in,o)}return o}function f(t,o){return r(t.y)?t.y:(t.y=o,o)}function d(t,o){t.sort(((t,o)=>Math.max(o.in,o.out)-Math.max(t.in,t.out)));const e=t[0];e.y=0;const n=c(e,0),a=h(e,0),i=function(t,o){const e=t.filter((t=>0===t.x)),n=t.filter((t=>t.x===o)),a=e.filter((t=>!r(t.y))),i=n.filter((t=>!r(t.y))),s=t.filter((t=>t.x>0&&t.x<o&&!r(t.y)));let l=e.reduce(((t,o)=>Math.max(t,o.y+o.out||0)),0),d=n.reduce(((t,o)=>Math.max(t,o.y+o.in||0)),0),u=0;return l>=d?(a.forEach((t=>{l=f(t,l),l=Math.max(l+t.out,h(t,l))})),i.forEach((t=>{d=f(t,d),d=Math.max(d+t.in,h(t,d))}))):(i.forEach((t=>{d=f(t,d),d=Math.max(d+t.in,h(t,d))})),a.forEach((t=>{l=f(t,l),l=Math.max(l+t.out,h(t,l))}))),s.forEach((o=>{let e=t.filter((t=>t.x===o.x&&r(t.y))).reduce(((t,o)=>Math.max(t,o.y+Math.max(o.in,o.out))),0);e=f(o,e),e=Math.max(e+o.in,c(o,e)),e=Math.max(e+o.out,h(o,e)),u=Math.max(u,e)})),Math.max(l,d,u)}(t,o);return Math.max(n,a,i)}function u(t,o,e,i){const s=[...t.values()],l=function(t,o){const e=new Set(o.map((t=>t.to))),a=new Set(o.map((t=>t.from))),i=new Set([...t.keys()]);let s=0;for(;i.size;){const a=n([...i],e);for(const o of a){const e=t.get(o);r(e.x)||(e.x=s),i.delete(o)}i.size&&(e.clear(),o.filter((t=>i.has(t.from))).forEach((t=>e.add(t.to))),s++)}return[...t.keys()].filter((t=>!a.has(t))).forEach((o=>{const e=t.get(o);e.column||(e.x=s)})),s}(t,o),c=e?function(t,o){let e=0,r=0;for(let n=0;n<=o;n++){let o=r;const a=t.filter((t=>t.x===n)).sort(((t,o)=>t.priority-o.priority));r=a[0].to.filter((t=>t.node.x>n+1)).reduce(((t,o)=>t+o.flow),0)||0;for(const t of a)t.y=o,o+=Math.max(t.out,t.in);e=Math.max(o,e)}return e}(s,l):d(s,l),h=function(t,o){let e=1,r=0,n=0,i=0;const s=[];t.sort(a);for(const a of t){if(a.y){if(0===a.x)s.push(a.y);else{for(r!==a.x&&(r=a.x,n=0),e=n+1;e<s.length&&!(s[e]>a.y);e++);n=e}a.y+=e*o,e++}i=Math.max(i,a.y+Math.max(a.in,a.out))}return i}(s,.03*c);return function(t,o){t.forEach((t=>{const e=Math[o](t.in||t.out,t.out||t.in),r=e<t.in,n=e<t.out;let a=0,i=t.from.length;t.from.sort(((t,o)=>t.node.y+t.node.out/2-(o.node.y+o.node.out/2))).forEach(((t,o)=>{r?t.addY=o*(e-t.flow)/(i-1):(t.addY=a,a+=t.flow)})),a=0,i=t.to.length,t.to.sort(((t,o)=>t.node.y+t.node.in/2-(o.node.y+o.node.in/2))).forEach(((t,o)=>{n?t.addY=o*(e-t.flow)/(i-1):(t.addY=a,a+=t.flow)}))}))}(s,i),{maxX:l,maxY:h}}function x(t,o,e){for(const r of t)if(r.key===o&&r.index===e)return r.addY;return 0}class y extends t.DatasetController{parseObjectData(t,o,r,n){const{from:a="from",to:i="to",flow:s="flow"}=this.options.parsing,l=o.map((({[a]:t,[i]:o,[s]:e})=>({from:t,to:o,flow:e}))),{xScale:c,yScale:h}=t,f=[],d=this._nodes=function(t){const o=new Map;for(let e=0;e<t.length;e++){const{from:r,to:n,flow:a}=t[e];if(o.has(r)){const t=o.get(r);t.out+=a,t.to.push({key:n,flow:a,index:e})}else o.set(r,{key:r,in:0,out:a,from:[],to:[{key:n,flow:a,index:e}]});if(o.has(n)){const t=o.get(n);t.in+=a,t.from.push({key:r,flow:a,index:e})}else o.set(n,{key:n,in:a,out:0,from:[{key:r,flow:a,index:e}],to:[]})}const e=(t,o)=>o.flow-t.flow;return[...o.values()].forEach((t=>{t.from=t.from.sort(e),t.from.forEach((t=>{t.node=o.get(t.key)})),t.to=t.to.sort(e),t.to.forEach((t=>{t.node=o.get(t.key)}))})),o}(l),{column:y,priority:p,size:m}=this.getDataset();if(p)for(const t of d.values())t.key in p&&(t.priority=p[t.key]);if(y)for(const t of d.values())t.key in y&&(t.column=!0,t.x=y[t.key]);const{maxX:g,maxY:M}=u(d,l,!!p,e(m));this._maxX=g,this._maxY=M;for(let t=0,o=l.length;t<o;++t){const o=l[t],e=d.get(o.from),r=d.get(o.to),n=e.y+x(e.to,o.to,t),a=r.y+x(r.from,o.from,t);f.push({x:c.parse(e.x,t),y:h.parse(n,t),_custom:{from:e,to:r,x:c.parse(r.x,t),y:h.parse(a,t),height:h.parse(o.flow,t)}})}return f.slice(r,r+n)}getMinMax(t){return{min:0,max:t===this._cachedMeta.xScale?this._maxX:this._maxY}}update(t){const{data:o}=this._cachedMeta;this.updateElements(o,0,o.length,t)}updateElements(t,e,r,n){const{xScale:a,yScale:i}=this._cachedMeta,s=this.resolveDataElementOptions(e,n),l=this.getSharedOptions(n,t[e],s),c=this.getDataset(),h=o.valueOrDefault(c.borderWidth,1)/2+.5,f=o.valueOrDefault(c.nodeWidth,10);for(let o=e;o<e+r;o++){const e=this.getParsed(o),r=e._custom,s=i.getPixelForValue(e.y);this.updateElement(t[o],o,{x:a.getPixelForValue(e.x)+f+h,y:s,x2:a.getPixelForValue(r.x)-h,y2:i.getPixelForValue(r.y),from:r.from,to:r.to,progress:"reset"===n?0:1,height:Math.abs(i.getPixelForValue(e.y+r.height)-s),options:this.resolveDataElementOptions(o,n)},n)}this.updateSharedOptions(l,n)}_drawLabels(){const t=this._ctx,r=this._nodes||new Map,n=this.getDataset(),a=e(n.size),i=o.valueOrDefault(n.borderWidth,1),s=o.valueOrDefault(n.nodeWidth,10),l=n.labels,{xScale:c,yScale:h}=this._cachedMeta;t.save();const f=this.chart.chartArea;for(const o of r.values()){const e=c.getPixelForValue(o.x),r=h.getPixelForValue(o.y),d=Math[a](o.in||o.out,o.out||o.in),u=Math.abs(h.getPixelForValue(o.y+d)-r),x=l&&l[o.key]||o.key;let y=e;t.fillStyle=n.color||"black",t.textBaseline="middle",e<f.width/2?(t.textAlign="left",y+=s+i+4):(t.textAlign="right",y-=i+4),this._drawLabel(x,r,u,t,y)}t.restore()}_drawLabel(t,e,r,n,a){const i=o.toFont(this.options.font,this.chart.options.font),s=o.isNullOrUndef(t)?[]:function(t){const e=[],r=o.isArray(t)?t:o.isNullOrUndef(t)?[]:[t];for(;r.length;){const t=r.pop();"string"==typeof t?e.unshift.apply(e,t.split("\n")):Array.isArray(t)?r.push.apply(r,t):o.isNullOrUndef(r)||e.unshift(""+t)}return e}(t),l=s.length,c=e+r/2,h=i.lineHeight,f=o.valueOrDefault(this.options.padding,h/2);if(n.font=i.string,l>1){const t=c-h*l/2+f;for(let o=0;o<l;o++)n.fillText(s[o],a,t+o*h)}else n.fillText(t,a,c)}_drawNodes(){const t=this._ctx,r=this._nodes||new Map,n=this.getDataset(),a=e(n.size),{xScale:i,yScale:s}=this._cachedMeta,l=o.valueOrDefault(n.borderWidth,1),c=o.valueOrDefault(n.nodeWidth,10);t.save(),t.strokeStyle=n.borderColor||"black",t.lineWidth=l;for(const o of r.values()){t.fillStyle=o.color;const e=i.getPixelForValue(o.x),r=s.getPixelForValue(o.y),n=Math[a](o.in||o.out,o.out||o.in),h=Math.abs(s.getPixelForValue(o.y+n)-r);l&&t.strokeRect(e,r,c,h),t.fillRect(e,r,c,h)}t.restore()}draw(){const t=this._ctx,o=this.getMeta().data||[],e=[];for(let t=0,r=o.length;t<r;++t){const r=o[t];r.from.color=r.options.colorFrom,r.to.color=r.options.colorTo,r.active&&e.push(r)}for(const t of e)t.from.color=t.options.colorFrom,t.to.color=t.options.colorTo;this._drawNodes();for(let e=0,r=o.length;e<r;++e)o[e].draw(t);this._drawLabels()}}y.id="sankey",y.defaults={dataElementType:"flow",animations:{numbers:{type:"number",properties:["x","y","x2","y2","height"]},progress:{easing:"linear",duration:t=>"data"===t.type?200*(t.parsed._custom.x-t.parsed.x):void 0,delay:t=>"data"===t.type?500*t.parsed.x+20*t.dataIndex:void 0},colors:{type:"color",properties:["colorFrom","colorTo"]}},transitions:{hide:{animations:{colors:{type:"color",properties:["colorFrom","colorTo"],to:"transparent"}}},show:{animations:{colors:{type:"color",properties:["colorFrom","colorTo"],from:"transparent"}}}}},y.overrides={interaction:{mode:"nearest",intersect:!0},datasets:{clip:!1,parsing:!0},plugins:{tooltip:{callbacks:{title:()=>"",label(t){const o=t.dataset.data[t.dataIndex];return o.from+" -> "+o.to+": "+o.flow}}},legend:{display:!1}},scales:{x:{type:"linear",bounds:"data",display:!1,min:0,offset:!1},y:{type:"linear",bounds:"data",display:!1,min:0,reverse:!0,offset:!1}},layout:{padding:{top:3,left:3,right:13,bottom:3}}};const p=(t,o,e,r)=>t<e?{cp1:{x:t+(e-t)/3*2,y:o},cp2:{x:t+(e-t)/3,y:r}}:{cp1:{x:t-(t-e)/3,y:0},cp2:{x:e+(t-e)/3,y:0}},m=(t,o,e)=>({x:t.x+e*(o.x-t.x),y:t.y+e*(o.y-t.y)});class g extends t.Element{constructor(t){super(),this.options=void 0,this.x=void 0,this.y=void 0,this.x2=void 0,this.y2=void 0,this.height=void 0,t&&Object.assign(this,t)}draw(t){const{x:e,x2:r,y:n,y2:a,height:i,progress:s}=this,{cp1:l,cp2:c}=p(e,n,r,a);0!==s&&(t.save(),s<1&&(t.beginPath(),t.rect(e,Math.min(n,a),(r-e)*s+1,Math.abs(a-n)+i+1),t.clip()),function(t,{x:e,x2:r,options:n}){let a;"from"===n.colorMode?a=o.color(n.colorFrom).alpha(.5).rgbString():"to"===n.colorMode?a=o.color(n.colorTo).alpha(.5).rgbString():(a=t.createLinearGradient(e,0,r,0),a.addColorStop(0,o.color(n.colorFrom).alpha(.5).rgbString()),a.addColorStop(1,o.color(n.colorTo).alpha(.5).rgbString())),t.fillStyle=a,t.strokeStyle=a,t.lineWidth=.5}(t,this),t.beginPath(),t.moveTo(e,n),t.bezierCurveTo(l.x,l.y,c.x,c.y,r,a),t.lineTo(r,a+i),t.bezierCurveTo(c.x,c.y+i,l.x,l.y+i,e,n+i),t.lineTo(e,n),t.stroke(),t.closePath(),t.fill(),t.restore())}inRange(t,o,e){const{x:r,y:n,x2:a,y2:i,height:s}=this.getProps(["x","y","x2","y2","height"],e);if(t<r||t>a)return!1;const{cp1:l,cp2:c}=p(r,n,a,i),h=(t-r)/(a-r),f={x:a,y:i},d=m({x:r,y:n},l,h),u=m(l,c,h),x=m(c,f,h),y=m(d,u,h),g=m(u,x,h),M=m(y,g,h).y;return o>=M&&o<=M+s}inXRange(t,o){const{x:e,x2:r}=this.getProps(["x","x2"],o);return t>=e&&t<=r}inYRange(t,o){const{y:e,y2:r,height:n}=this.getProps(["y","y2","height"],o),a=Math.min(e,r),i=Math.max(e,r)+n;return t>=a&&t<=i}getCenterPoint(t){const{x:o,y:e,x2:r,y2:n,height:a}=this.getProps(["x","y","x2","y2","height"],t);return{x:(o+r)/2,y:(e+n+a)/2}}tooltipPosition(t){return this.getCenterPoint(t)}getRange(t){return"x"===t?this.width/2:this.height/2}}g.id="flow",g.defaults={colorFrom:"red",colorTo:"green",colorMode:"gradient",hoverColorFrom:(t,e)=>o.getHoverColor(e.colorFrom),hoverColorTo:(t,e)=>o.getHoverColor(e.colorTo)},t.Chart.register(y,g)}));