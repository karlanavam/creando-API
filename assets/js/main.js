var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
};
 

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}
            
var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
    
  // creamos la celda de acciones
  var $accionesTd = $("<td />");
  // creamos los spans
  var $spanZoom = $("<span />");
  $spanZoom.addClass("glyphicon glyphicon-zoom-in");
  var $spanPencil = $("<span />");
  $spanPencil.addClass("glyphicon glyphicon-pencil");
  var $spanRemove = $("<span />");
  $spanRemove.addClass("glyphicon glyphicon-remove-circle");
  $spanRemove.click(function() {
      $tr.css('display', 'none');
  });
  
  $accionesTd.append($spanZoom);
  $accionesTd.append($spanPencil);
  $accionesTd.append($spanRemove);
    
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append($accionesTd);
  // agregamos filas a la tabla
  $tasksList.append($tr);
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

$(document).ready(cargarPagina);