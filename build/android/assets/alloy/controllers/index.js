var Alloy=require('/alloy'),Backbone=Alloy.Backbone,_=Alloy._;function __processArg(obj,key){var arg=null;return obj&&(arg=obj[key]||null),arg}function Controller(){if(require('/alloy/controllers/BaseController').apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath='index',this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],'__parentSymbol'),$model=__processArg(arguments[0],'$model'),__itemTemplate=__processArg(arguments[0],'__itemTemplate');var $=this,exports={},__defers={};exports.destroy=function(){},_.extend($,$.__views),Ti.App.Properties.hasProperty('loginCorrecto')||Ti.App.Properties.setBool('loginCorrecto',!0),Ti.App.Properties.getBool('loginCorrecto')?Alloy.createController('login').getView().open():Alloy.createController('camara').getView().open(),_.extend($,exports)}module.exports=Controller;