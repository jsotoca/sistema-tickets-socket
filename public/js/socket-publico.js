var socket = io();

var lbTicket1 = $('#lblTicket1');
var lbTicket2 = $('#lblTicket2');
var lbTicket3 = $('#lblTicket3');
var lbTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lbTicket1,lbTicket2,lbTicket3,lbTicket4];
var lblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];


socket.on('estadoActual',(data)=>{
    console.log(data.ultimos4);
    actualizarHtml(data.ultimos4);
});

socket.on('ultimos4',(data)=>{
    audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    actualizarHtml(data.ultimos4);
});

function actualizarHtml(ultimos4){
    for (let i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket #'+ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio #'+ultimos4[i].escritorio);
    }
}