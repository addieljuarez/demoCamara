var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
    delete obj[key];
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'camara';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.camara = Ti.UI.createWindow(
  { id: "camara" });

  $.__views.camara && $.addTopLevelView($.__views.camara);
  $.__views.buttonFoto = Ti.UI.createButton(
  { bottom: "60", id: "buttonFoto", title: "Captura de Foto" });

  $.__views.camara.add($.__views.buttonFoto);
  capturaFoto ? $.addListener($.__views.buttonFoto, 'click', capturaFoto) : __defers['$.__views.buttonFoto!click!capturaFoto'] = true;$.__views.buttonVideo = Ti.UI.createButton(
  { bottom: "10", id: "buttonVideo", title: "Captura de Video" });

  $.__views.camara.add($.__views.buttonVideo);
  capturaVideo ? $.addListener($.__views.buttonVideo, 'click', capturaVideo) : __defers['$.__views.buttonVideo!click!capturaVideo'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = $.args;
  var Cloud = require('ti.cloud');
  var image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'imagen.jpg');
  var imageViewImagen = Ti.UI.createImageView({
    image: image.read(),
    width: "200",
    height: "200",
    backgroundColor: "blue",
    top: "10" });


  $.camara.add(imageViewImagen);

  var movie = Titanium.Media.createVideoPlayer({
    movieControlStyle: Titanium.Media.VIDEO_CONTROL_EMBEDDED,
    width: "200",
    height: "200",
    top: "180",
    backgroundColor: "#000",
    autoplay: false });

  $.camara.add(movie);

  function camaraFoto() {
    Titanium.Media.showCamera({

      saveToPhotoGallery: true,
      allowEditing: false,
      autohide: false,

      success: function (event) {
        imageViewImagen.image = event.media;

        var imageSave = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'imagen.jpg');
        imageSave.write(imageViewImagen.image);

        Cloud.Photos.create({
          photo: imageSave },
        function (e) {
          if (e.success) {
            var photo = e.photos[0];
            alert('Success:\n' + 'id: ' + photo.id + '\n' + 'filename: ' + photo.filename + '\n' + 'size: ' + photo.size, 'updated_at: ' + photo.updated_at);
          } else {
            alert('Error:\n' + (e.error && e.message || JSON.stringify(e)));
          }
        });
      } });


  }

  function camaraVideo() {
    Ti.Media.showCamera({
      autohide: false,
      animated: false,
      allowEditing: false,
      saveToPhotoGallery: true,
      success: function (event) {

        movie.url = event.media.nativePath;
      },
      cancel: function (event) {
        console.log("error");
      },
      error: function (error) {
        alert('error');
      },
      mediaTypes: [Titanium.Media.MEDIA_TYPE_VIDEO],
      videoMaximumDuration: 5000,
      videoQuality: Titanium.Media.QUALITY_HIGH });

  }

  function capturaFoto(e) {

    if (!Ti.Media.hasCameraPermissions()) {


      Ti.Media.requestCameraPermissions(function (e) {


        if (e.success) {
          camaraFoto();

        } else {
          Ti.API.error('No se pueden obtener permisos de la camara.');
        }
      });
    } else {


      camaraFoto();
    }
  }

  function capturaVideo(e) {

    if (!Ti.Media.hasCameraPermissions()) {


      Ti.Media.requestCameraPermissions(function (e) {


        if (e.success) {
          camaraVideo();
        } else {
          Ti.API.error('No se pueden obtener permisos de la camara.');
        }
      });
    } else {
      camaraVideo();
    }
  }
  $.camara.addEventListener('android:back', function () {});
  buscarImagen();
  function buscarImagen() {

    if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {

      alert('No tienes conexion a internet');
    } else {
      alert('tienes conexion a internet.');
    }
  }







  __defers['$.__views.buttonFoto!click!capturaFoto'] && $.addListener($.__views.buttonFoto, 'click', capturaFoto);__defers['$.__views.buttonVideo!click!capturaVideo'] && $.addListener($.__views.buttonVideo, 'click', capturaVideo);



  _.extend($, exports);
}

module.exports = Controller;