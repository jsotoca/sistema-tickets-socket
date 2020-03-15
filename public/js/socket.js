var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect',()=>{'conectado al servidor'});
socket.on('disconnect',()=>{'desconectado al servidor'});
socket.on('estadoActual',(resp)=>{
    label.text(resp.actual);
});

$('button').on('click',function(){
    socket.emit('siguienteTicket',null,function(siguienteticket){
        label.text(siguienteticket);
    });
});