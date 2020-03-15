var socket = io();
var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has('escritorio'));

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('el escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

var label = $('small');
$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click',function(){
    socket.emit('atenderTicket',{escritorio:escritorio},function(resp){
        if(resp === 'No hay tickets por atender'){
            label.text(`${resp}`);
        }else{
            label.text(`Ticket #${resp.numero}`);
        }
    })
});