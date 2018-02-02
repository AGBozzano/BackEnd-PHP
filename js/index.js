/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}



playVideoOnScroll();

$(document).ready(()=>{
    inicializarSlider();

    //Inicializa los select
    $('select').material_select();
});


$('#submitButton').submit(()=>{

    let ciudad = $('#selectCiudad option:selected').val();
    let tipo = $('#selectTipo option:selected').val();
    let precio = $('#rangoPrecio').val();

    event.preventDefault();

    console.log(ciudad + ' + ' + tipo + ' + ' + precio);

    //Llamado ajax a buscador.php
    $.ajax{
        { 
          url:'./buscador.php',
          type:'POST',
          data: {ciudad:ciudad, tipo:tipo, precio:precio}
        }
    }.done((response)=>{
        let data = JSON.parse(response);
        var r = data.data;
        showResult(r);
    });
    /*
    $.get('buscador.php', {ciudad:ciudad, tipo:tipo, precio:precio}, function(response){
        let data = JSON.parse(response);
        var r = data.data;
        showResult(r);
    });*/
});

function showResult(array){
    $('.resultados').empty();
    for(let i=0; i<array.length; i++){
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/${array[i].Ciudad}.png">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>+</a>
                </div>
            </div>
        </div>`);
    }
}


