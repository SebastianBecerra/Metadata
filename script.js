$(document).ready(function(){
	$(".animated").hide();
	$("#file-input").change(function(e){
		EXIF.getData(e.target.files[0],function(){
			//obtengo los datos de la foto
			var lat=EXIF.getTag(this,"GPSLatitude");
			var latRef=EXIF.getTag(this,"GPSLatitudeRef");
			var lon=EXIF.getTag(this,"GPSLongitude");
			var lonRef=EXIF.getTag(this,"GPSLongitudeRef");
			var time=EXIF.getTag(this,"DateTimeOriginal");
			var timeDig=EXIF.getTag(this,"DateTimeDigitized");
			var make=EXIF.getTag(this,"Make");
			var model=EXIF.getTag(this,"Model");
			var soft=EXIF.getTag(this,"Software");
			//convertir coordenadas desde GMS a grados decimales si existen
			//latitud
			if(lat!=null){
			var str= lat.toString();
			var res=str.split(",");
			var grados= parseInt(res[0]);
			var minutos= parseInt(res[1]);
			var segundos= parseInt(res[2]);
			var dd= grados + (minutos/60) + (segundos/3600);
			//agregar el signo negativo para coordenadas del sur
			if(latRef=='S'){
				dd=dd*-1;
				}
			}
			//longitud
			if(lon!=null){
			var str2= lon.toString();
			var res2=str2.split(",");
			var grados2= parseInt(res2[0]);
			var minutos2= parseInt(res2[1]);
			var segundos2= parseInt(res2[2]);
			var dd2= grados2 + (minutos2/60) + (segundos2/3600);
			//agregar el signo negativo para coordenadas del oeste
			if(lonRef=='W'){
				dd2=dd2*-1;
				}
			}
			//mostrar los datos obtenidos
			$("#lat").val(latRef + " " +lat);
			$("#lon").val(lonRef+ " " +lon);
			$("#time").val(time);
			$("#timeDig").val(timeDig);
			$("#make").val(make);
			$("#model").val(model);
			$("#soft").val(soft);
			//generacion del mapa
			$(function() {
    		new Maplace({
    			show_markers: true,
    			locations: [{
        			lat: dd,
        			lon: dd2,
        			zoom: 8
    			}]
    		}).Load();
    		});

		});
		//esconder drag and drop
		$(".fileImg").hide();
		//remuevo clase para mostrar datos
		$(".animated").show();
		//subir otra foto
		$("#volver").click(function(){
			$(".animated").fadeOut();
			$(".fileImg").fadeIn();
		});
	});
});
