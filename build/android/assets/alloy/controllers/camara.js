var Alloy=require('/alloy'),Backbone=Alloy.Backbone,_=Alloy._;function __processArg(obj,key){var arg=null;return obj&&(arg=obj[key]||null,delete obj[key]),arg}function Controller(){function camaraFoto(){Titanium.Media.showCamera({saveToPhotoGallery:!0,allowEditing:!1,autohide:!1,success:function(event){imageViewImagen.image=event.media;var imageSave=Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'imagen.jpg');imageSave.write(imageViewImagen.image),Cloud.Photos.create({photo:imageSave},function(e){if(e.success){var photo=e.photos[0];alert('Success:\nid: '+photo.id+'\nfilename: '+photo.filename+'\nsize: '+photo.size,'updated_at: '+photo.updated_at)}else alert('Error:\n'+(e.error&&e.message||JSON.stringify(e)));buscarImagen()})}})}function camaraVideo(){Ti.Media.showCamera({autohide:!1,animated:!1,allowEditing:!1,saveToPhotoGallery:!0,success:function(event){movie.url=event.media.nativePath},cancel:function(event){console.log('error')},error:function(error){alert('error')},mediaTypes:[Titanium.Media.MEDIA_TYPE_VIDEO],videoMaximumDuration:5e3,videoQuality:Titanium.Media.QUALITY_HIGH})}function capturaFoto(e){Ti.Media.hasCameraPermissions()?camaraFoto():Ti.Media.requestCameraPermissions(function(e){e.success?camaraFoto():Ti.API.error('No se pueden obtener permisos de la camara.')})}function capturaVideo(e){Ti.Media.hasCameraPermissions()?camaraVideo():Ti.Media.requestCameraPermissions(function(e){e.success?camaraVideo():Ti.API.error('No se pueden obtener permisos de la camara.')})}function buscarImagen(){Titanium.Network.online?Cloud.Photos.show({photo_id:'5b2e8bf625c1b02190e355e'},function(e){if(e.success){var photo=e.photos[0];alert('Success:\nid: '+photo.id+'\nfilename: '+photo.filename+'\nupdated_at: '+photo.updated_at)}else alert('Error:\n'+(e.error&&e.message||JSON.stringify(e)))}):(imageViewImagen.image=image.read(),alert('No tienes conexion a internet'))}if(require('/alloy/controllers/BaseController').apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath='camara',this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],'__parentSymbol'),$model=__processArg(arguments[0],'$model'),__itemTemplate=__processArg(arguments[0],'__itemTemplate');var $=this,exports={},__defers={};$.__views.camara=Ti.UI.createWindow({id:'camara'}),$.__views.camara&&$.addTopLevelView($.__views.camara),$.__views.buttonFoto=Ti.UI.createButton({bottom:'60',id:'buttonFoto',title:'Captura de Foto'}),$.__views.camara.add($.__views.buttonFoto),capturaFoto?$.addListener($.__views.buttonFoto,'click',capturaFoto):__defers['$.__views.buttonFoto!click!capturaFoto']=!0,$.__views.buttonVideo=Ti.UI.createButton({bottom:'10',id:'buttonVideo',title:'Captura de Video'}),$.__views.camara.add($.__views.buttonVideo),capturaVideo?$.addListener($.__views.buttonVideo,'click',capturaVideo):__defers['$.__views.buttonVideo!click!capturaVideo']=!0,exports.destroy=function(){},_.extend($,$.__views);var args=$.args,Cloud=require('ti.cloud'),image=Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'imagen.jpg'),imageViewImagen=Ti.UI.createImageView({image:buscarImagen(),width:'200',height:'200',backgroundColor:'blue',top:'10'});$.camara.add(imageViewImagen);var movie=Titanium.Media.createVideoPlayer({movieControlStyle:Titanium.Media.VIDEO_CONTROL_EMBEDDED,width:'200',height:'200',top:'180',backgroundColor:'#000',autoplay:!1});$.camara.add(movie),$.camara.addEventListener('android:back',function(){}),__defers['$.__views.buttonFoto!click!capturaFoto']&&$.addListener($.__views.buttonFoto,'click',capturaFoto),__defers['$.__views.buttonVideo!click!capturaVideo']&&$.addListener($.__views.buttonVideo,'click',capturaVideo),_.extend($,exports)}module.exports=Controller;