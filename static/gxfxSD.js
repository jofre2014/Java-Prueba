gx.fx={delayedSuggest:function(){for(var a=gx.suggestControls.length,b=0;b<a;b++)this.installSuggest(gx.suggestControls[b],!0)},installSuggest:function(a,b){if(!b&&document.readyState&&"complete"!=document.readyState)gx.suggestControls.push(a);else try{var c=gx.O.getValidStructFld(a.id);if(c&&!gx.lang.emptyObject(c.gxsgprm)){var d=0<c.grid?gx.fn.currentGridRowImpl(c.grid):"main",e=c.gxsgprm;e.installed||(e.installed={});e.installed[d]||(gx.ajax.suggest(e[1],a.id,e[0],e[3],e[2]),e.installed[d]=!0)}}catch(f){gx.dbg.logEx(f,
"gxfx.js","installSuggest")}},updateSuggestParms:function(a){if(a)for(var b=a.length,c=0;c<b;c++){var d=gx.fn.validStruct(a[c]);d&&"function"==typeof d.c2v&&d.c2v()}},firesuggest:function(a,b,c,d){this.updateSuggestParms(d);a.textbox.value&&b.requestSuggestions(a,c);delete gx.fx.suggestProcessing;gx.fx.obs.notify("gx.validation")},autoSuggestControl:function(a,b,c,d,e,f){this.cur=-1;this.layer=this.IFrameControl=null;this.provider=b;this.textbox=a;"undefined"==typeof this.textbox.GXonblur&&(this.textbox.GXonblur=
a.onblur);this.ControlRefresh=c;this.typeahead=d;this.suggestParms=e||[];this.sdtParms=f||[];this.requestSuggestions=function(a,b,c){gx.fx.suggestProcessing=true;var d=this.suggestParms;this.timer&&window.clearTimeout(this.timer);this.timer=window.setTimeout(function(){gx.fx.firesuggest(a,b,c,d)},400)};this.hideSuggestions=function(){if(this.IFrameControl)this.IFrameControl.style.visibility="hidden";this.layer.style.visibility="hidden"};this.highlightSuggestion=function(a){for(var b=this.layer.childNodes.length,
c=0;c<b;c++){var d=this.layer.childNodes[c];if(d==a)d.className="current";else if(d.className=="current")d.className=""}};this.init=function(){var a=function(a){if(!a)a=window.event;this.handleKeyUp(a)};gx.evt.attach(this.textbox,"keyup",a.closure(this));gx.evt.attach(this.textbox,"keydown",function(a){if(!a)a=window.event;this.handleKeyDown(a)}.closure(this));gx.evt.attach(this.textbox,"blur",function(){this.hideSuggestions();this.textbox.GXonblur()}.closure(this));gx.util.browser.isFirefox()&&gx.evt.attach(this.textbox,
"input",a.closure(this));this.createDropDown()};this.nextSuggestion=function(){var a=this.layer.childNodes;if(a.length>0){this.cur=this.cur<a.length-1?this.cur+1:0;a=a[this.cur];this.highlightSuggestion(a);this.pickvalue(a.firstChild.nodeValue)}};this.previousSuggestion=function(){var a=this.layer.childNodes;if(a.length>0){this.cur=this.cur>0?this.cur-1:a.length-1;a=a[this.cur];this.highlightSuggestion(a);this.pickvalue(a.firstChild.nodeValue)}};this.selectRange=function(a,b){if(this.textbox.createTextRange){var c=
this.textbox.createTextRange();c.moveStart("character",a);c.moveEnd("character",b-this.textbox.value.length);c.select()}else this.textbox.setSelectionRange&&this.textbox.setSelectionRange(a,b);gx.csv.stopOnError&&this.textbox.focus()};this.showSuggestions=function(a){this.cur=-1;var b=null;this.setupLayer();gx.dom.shouldPurge()&&gx.dom.purge(this.layer,true);this.layer.innerHTML="";if(!this.IFrameControl){b=false;this.IFrameControl=gx.dom.byId("gxAutosuggestIFrame");if(!this.IFrameControl){b=true;
this.IFrameControl=document.createElement("IFRAME");this.IFrameControl.src="about:blank";this.IFrameControl.id="gxAutosuggestIFrame"}this.IFrameControl.style.zIndex=1;this.IFrameControl.style.visibility="hidden";this.IFrameControl.style.position="absolute";this.IFrameControl.frameBorder="0";b&&document.body.appendChild(this.IFrameControl)}for(var c=a.length,d=0;d<c;d++){b=document.createElement("div");b.appendChild(document.createTextNode(a[d].d));b.style.width=this.textbox.offsetWidth;this.layer.appendChild(b)}this.layer.style.left=
this.getLeft()+"px";this.layer.style.top=this.getTop()+this.textbox.offsetHeight+"px";this.layer.style.visibility="visible";this.layer.style.zIndex=2;this.IFrameControl.style.top=this.layer.style.top;this.IFrameControl.style.left=this.layer.style.left;this.IFrameControl.style.height=this.layer.offsetHeight;this.IFrameControl.style.width=this.layer.offsetWidth;this.IFrameControl.style.visibility="visible"};this.typeAhead=function(a){if(this.textbox.createTextRange||this.textbox.setSelectionRange){var b=
this.textbox.value.length;this.pickvalue(a);a=a.length;b<a&&this.selectRange(b,a)}};this.pickvalue=function(a){for(var b=this.aSuggestions.length,c=0;c<b;c++)if(this.aSuggestions[c].d==a){this.textbox.value=a;gx.evt.onchange_impl(this.textbox);break}};this.autosuggest=function(a,b){this.aSuggestions=a;var c=this.aSuggestions.length;if(b&&this.aSuggestions!=null&&c==1)this.typeAhead(this.aSuggestions[0].d);else if(this.textbox==gx.csv.lastControl&&(this.aSuggestions!=null&&c>0)&&(c==1&&this.aSuggestions[0].d!=
this.textbox||c>1)){this.showSuggestions(this.aSuggestions);return}this.hideSuggestions()};this.createDropDown=function(){var a=false;this.layer=gx.dom.byId("gxAutosuggestElement");if(!this.layer){a=true;this.layer=document.createElement("div");this.layer.className="suggestions";this.layer.id="gxAutosuggestElement"}this.setupLayer();a&&document.body.appendChild(this.layer)};this.setupLayer=function(){this.layer.style.visibility="hidden";this.layer.style.width=this.textbox.offsetWidth;this.layer.onmousedown=
this.layer.onmouseup=this.layer.onmouseover=function(a){var a=a||window.event,b=gx.evt.source(a);if(a.type=="mousedown"){gx.evt.cancel(a,true);this.pickvalue(b.firstChild.nodeValue);this.hideSuggestions();window.setTimeout(function(){gx.fn.setFocus(this.textbox)},100)}else a.type=="mouseover"?this.highlightSuggestion(b):this.textbox.focus()}.closure(this)};this.getLeft=function(){for(var a=this.textbox,b=0;a.tagName!="BODY";){b=b+a.offsetLeft;a=a.offsetParent}for(a=this.textbox;a.tagName!="BODY";){b=
b-a.scrollLeft;a=a.parentNode}return b};this.getTop=function(){for(var a=this.textbox,b=0;a.tagName!="BODY";){b=b+a.offsetTop;a=a.offsetParent}for(a=this.textbox;a.tagName!="BODY";){b=b-a.scrollTop;a=a.parentNode}return b};this.handleKeyDown=function(a){switch(a.keyCode){case 38:this.previousSuggestion();break;case 40:this.nextSuggestion();break;case 13:this.hideSuggestions()}};this.handleKeyUp=function(a){a=a.keyCode;a==9?this.hideSuggestions():a==8||a==46?this.requestSuggestions(this,this.provider,
false):a<32||(a>=33&&a<46||a>=112&&a<=123)||this.requestSuggestions(this,this.provider,this.typeahead)};this.init()},suggestProvider:function(a,b,c){this.ControlId=a;this.ControlRefresh=b;this.CtrlSvc=c;this.requestSuggestions=function(a,b){var c,g="gx.fx.returnSuggestValues('"+this.VarRefresh+"',",h=gx.ajax.objectUrl()+"?",i="gxajaxSuggest_"+this.CtrlSvc,j=this.ControlId.length;for(c=0;c<j;c++)i+=","+encodeURIComponent(eval(this.ControlId[c]));i+=","+encodeURIComponent(gx.fn.getControlValue_impl(this.ControlRefresh));
j=a.sdtParms.length;for(c=0;c<j;c++)i+=","+encodeURIComponent(eval(a.sdtParms[c]));h+=gx.ajax.encryptParms(gx.O,i);(this.values=gx.http.callBackend(g,h,")",!1,gx.http.modes.retval,!0))?a.autosuggest(this.values,b):a.hideSuggestions()}},returnSuggestValues:function(a,b){return b},addElement:function(a,b,c){if(!this.elementExists(a,b,c)){var d=b.id;!0===c&&(d+=b.types.sort().join(""));a.splice(0,0,b);a[d]=b}},elementExists:function(a,b,c){var d=b.id;!0===c&&(d+=b.types.sort().join(""));return a[d]?
!0:!1},deleteElement:function(a,b,c){var d=b;c&&(d+=c.sort().join(""));a[d]&&delete a[d];for(var d=a.length,e=0;e<d;e++){var f=a[e];if(f.id==b)if(c){if(this.matchingTypes(c,f.types)){a.removeAt(e);break}}else{a.removeAt(e);break}}return a},matchingTypes:function(a,b){for(var c=b.length,d=0;d<c;d++){for(var e=!1,f=a.length,g=0;g<f;g++)b[d].toLowerCase()==a[g].toLowerCase()&&(e=!0);if(!e)return!1}return!0},findControl:function(a,b,c){b=gx.dom.el(c);if(null!=b)return b;b=gx.dom.el("gxHTMLWrp"+c);if(null!=
b)return b;c=RegExp("^"+c+"_(?:(?:[0-9]){4})+$");return null!=a&&c.test(a.id)?a:null},isUnderMouse:function(a){var b=gx.evt.mouse.x,c=gx.evt.mouse.y,d=gx.dom.position(a),a=gx.dom.dimensions(a);return b>=d.x&&b<=d.x+a.w&&c>=d.y&&c<=d.y+a.h?!0:!1},dom:{generics:[],dblclicks:[],getEventHandlers:function(a){return"dblclick"==a?this.dblclicks:this.generics},addEventHandler:function(a,b,c,d){c=gx.lang.emptyObject(a)?c:a.CmpContext+c;a={id:b+c,cId:c,type:b,obj:a,hdl:d};b=this.getEventHandlers(b);gx.fx.addElement(b,
a,!1)},raiseEvent:function(a,b){for(var c=gx.evt.source(b),d=this.getEventHandlers(a),e=d.length,f=0;f<e;f++){var g=d[f],h=gx.fx.findControl(c,g.obj,g.cId);null!=h&&gx.fx.isUnderMouse(h)&&g.hdl.call(g.obj)}},highlight:function(a,b,c){var d=gx.color.fromRGB(b[0],b[1],b[2]),e=gx.dom.getStyle(a,"backgroundColor"),f="transparent"==e||"rgba(0, 0, 0, 0)"==e;return{play:function(){a.style.backgroundColor=d.Html;setTimeout(this.end,c)},end:function(){var b=e;f&&(b="transparent");a.style.backgroundColor=b}}}},
obs:{observers:[],addObserver:function(){gx.thread.Mutex(this,this.addObserverSync,arguments)},addObserverSync:function(a,b,c,d){0>this.indexOf(a,b,c)&&this.observers.push({e:a,o:b,f:c,cfg:d})},deleteObserver:function(a,b,c){gx.thread.Mutex(this,this.deleteObserverSync,[a,b,c])},deleteObserverSync:function(a,b,c){a=this.indexOf(a,b,c);0<=a&&this.observers.removeAt(a)},removeAll:function(){this.observers=[]},indexOf:function(a,b,c){for(var d=this.observers.length,e=0;e<d;e++){var f=this.observers[e];
if(f.e==a&&f.o==b&&f.f==c)return e}return-1},notify:function(a,b){b||(b=[]);var c=this.observers.length,d=[],e;for(e=0;e<c;e++){var f=this.observers[e];if(f.e==a&&!f.removed)try{f.cfg&&f.cfg.single&&(f.removed=!0,d.push(e)),f.f.apply(f.o,b)}catch(g){gx.dbg.logEx(g,"gxfx.js","gx.obs.notify")}}if(0<d.length)for(e=d.length-1;0<=e;e--)this.observers.removeAt(d[e])}},dnd:{obj:null,dragCtrl:null,clonCtrl:null,sources:[],targets:[],dropCtrl:null,noDropCtrl:null,toHdl:null,drag:function(a,b,c){c&&(gx.evt.setEventRow(a,
this.dragCtrl),this.obj=c.call(a,this.dragCtrl),this.obj.gxDragTypes=b)},drop:function(a,b,c){c&&c.call(b,a,this.dragCtrl,this.obj)},noDrop:function(){var a=this.noDropCtrl;null!=a&&a.gxDndClassName&&(a.className=a.gxDndClassName+"NoAcceptDrag")},out:function(){var a=this.dropCtrl;a&&a.gxClassName&&(a.className=a.gxClassName);this.dropCtrl=null;a=this.noDropCtrl;null!=a&&a.gxClassName&&(a.className=a.gxClassName);this.noDropCtrl=null},over:function(){var a=this.dropCtrl;null!=a&&a.gxDndClassName&&
(a.className=a.gxDndClassName+"AcceptDrag")},deleteClonControl:function(){null!=this.clonCtrl&&gx.dom.removeControlSafe(this.clonCtrl);this.clonCtrl=null},restoreControl:function(){var a=this.clonCtrl;null!=a&&((null==this.toHdl&&(a.dropLeft=parseFloat(a.style.left||"0"),a.dropTop=parseFloat(a.style.top||"0"),this.toHdl=setInterval("gx.fx.dnd.restoreControl()",2)),this.controlRestored())?(clearInterval(this.toHdl),this.toHdl=null,this.deleteClonControl()):(a=this.nextCoords(),this.moveDragControl(a.X,
a.Y)))},nextCoords:function(){var a=this.clonCtrl,b=parseFloat(a.style.left||"0"),c=parseFloat(a.style.top||"0"),d=0,e=0;b>=c?(d=b-1,e=a.dropTop-(a.dropTop-a.originalTop)*(a.dropLeft-d)/(a.dropLeft-a.originalLeft)):(e=c-1,d=a.dropLeft-(a.dropTop-e)*(a.dropLeft-a.originalLeft)/(a.dropTop-a.originalTop));d<=a.originalLeft&&(d=a.originalLeft);e<=a.originalTop&&(e=a.originalTop);return{X:d,Y:e}},moveControl:function(a){if(null==this.clonCtrl){var b=document.createElement("DIV");b.style.position="absolute";
a.gxDndClassName&&(b.className=a.gxDndClassName+"Dragging");gx.dom.shouldPurge()&&gx.dom.purge(b,!0);b.innerHTML=this.dragInfo();gx.fn.setOpacity(50,b);document.body.appendChild(b);b.originalLeft=gx.evt.mouse.x-10;b.originalTop=gx.evt.mouse.y-10;b.diffLeft=10;b.diffTop=10;this.clonCtrl=b}this.moveDragControl(gx.evt.mouse.x,gx.evt.mouse.y)},controlRestored:function(){var a=this.clonCtrl;if(null==a)return!0;var b=parseFloat(a.style.left||"0"),c=parseFloat(a.style.top||"0")-a.originalTop;return 0>=b-
a.originalLeft&&0>=c?!0:!1},moveDragControl:function(a,b){try{var c=this.clonCtrl;null!=c&&(c.style.left=a-c.diffLeft+"px",c.style.top=b-c.diffTop+"px")}catch(d){this.deleteClonControl()}},dragInfo:function(){if(null!=this.obj){var a="",b="",c;for(c in this.obj){if("gxDragTypes"!=c){var d=[a];if("function"==typeof this.obj[c])continue;b+=c+": "+this.obj[c]+"</br>";a=d[0]}if(5<=a){b+="...";break}a++}return b}return""},deleteHandlers:function(a){gx.thread.Mutex(this,this.deleteHandlersSync,[a])},deleteHandlersSync:function(a){var b=
[],c,d=this.sources.length;for(c=0;c<d;c++){var e=this.sources[c];e.obj!=a&&b.push(e)}this.sources=b;b=[];d=this.targets.length;for(c=0;c<d;c++)e=this.targets[c],e.obj!=a&&b.push(e);this.targets=b},addSource:function(a,b,c,d,e){gx.thread.Mutex(this,this.addSourceSync,[a,b,c,d,e])},addSourceSync:function(a,b,c,d,e){b=gx.lang.emptyObject(a)?b:a.CmpContext+b;gx.fx.addElement(this.sources,{id:b,cssClass:c,types:d,obj:a,hdl:e},!1)},addTarget:function(a,b,c,d,e){gx.thread.Mutex(this,this.addTargetSync,
[a,b,c,d,e])},addTargetSync:function(a,b,c,d,e){b=gx.lang.emptyObject(a)?b:a.CmpContext+b;gx.fx.addElement(this.targets,{id:b,cssClass:c,types:d,obj:a,hdl:e},!0)},deleteSource:function(a){gx.thread.Mutex(this,this.deleteSourceSync,[a])},deleteSourceSync:function(a){this.sources=gx.fx.deleteElement(this.sources,a)},getSource:function(a){for(var a=gx.evt.source(a),b=this.sources.length,c=0;c<b;c++){var d=this.sources[c],e=this.dragCtrl=gx.fx.findControl(a,d.obj,d.id);if(null!=e&&(e.gxClassName=e.className,
e.gxDndClassName=d.cssClass,gx.fx.isUnderMouse(e)))return d}return this.obj=this.dragCtrl=null},getTarget:function(a,b){for(var c=gx.evt.source(a),d=this.targets.length,e=0;e<d;e++){var f=this.targets[e],g=gx.fx.findControl(c,f.obj,f.id);if(null!=g&&(g.gxClassName=g.className,g.gxDndClassName=f.cssClass,gx.fx.isUnderMouse(g))){if(gx.fx.matchingTypes(b,f.types))return this.noDropCtrl=null,this.dropCtrl=g,f;this.out();this.noDropCtrl=g;this.noDrop();return null}}this.out();return null}},ctx:{setters:[],
trackers:[],deleteHandlers:function(a){gx.thread.Mutex(this,this.deleteHandlersSync,[a])},deleteHandlersSync:function(a){var b,c=[],d=this.setters.length;for(b=0;b<d;b++){var e=this.setters[b];e.obj!=a&&c.push(e)}this.setters=c;c=[];d=this.trackers.length;for(b=0;b<d;b++)e=this.trackers[b],e.obj!=a&&c.push(e);this.trackers=c},addSetter:function(a,b,c,d,e){gx.thread.Mutex(this,this.addSetterSync,[a,b,c,d,e])},addSetterSync:function(a,b,c,d,e){b=gx.lang.emptyObject(a)?b:a.CmpContext+b;gx.fx.addElement(this.setters,
{id:b,cssClass:c,types:d,obj:a,hdl:e},!1)},addTracker:function(a,b,c){gx.thread.Mutex(this,this.addTrackerSync,[a,b,c])},addTrackerSync:function(a,b,c){gx.fx.addElement(this.trackers,{id:a.CmpContext+a.IsMasterPage.toString(),cssClass:"",types:b,obj:a,hdl:c},!0)},deleteSetter:function(a){gx.thread.Mutex(this,this.deleteSetterSync,[a])},deleteSetterSync:function(a){this.setters=gx.fx.deleteElement(this.setters,a)},notify:function(a,b,c){gx.thread.Mutex(this,this.notifySync,[a,b,c])},notifySync:function(a,
b,c){if(a&&a.forcedFocus)a.forcedFocus=!1;else{var d,e=gx.lang.emptyObject,f=null;if(e(b)||e(c)){var g=this.setters.length;for(d=0;d<g;d++){var h=this.setters[d];if(e(a)){if(f=gx.fx.findControl(null,h.obj,h.id),null!=f&&e(f.onfocus)&&gx.fx.isUnderMouse(f)){gx.evt.setEventRow(h.obj,f);b=h.types;c=h.hdl.call(h.obj,f);break}}else if(a.id==h.id){f=a;gx.evt.setEventRow(h.obj,f);b=h.types;c=h.hdl.call(h.obj,f);break}}}if(!e(b)&&(c||""===c)){a=this.trackers.length;for(d=0;d<a;d++)e=this.trackers[d],gx.fx.matchingTypes(b,
e.types)&&e.hdl.call(e.obj,null,f,c)}}}}};
