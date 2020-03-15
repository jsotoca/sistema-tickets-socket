const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.emit('estadoActual',{
        actual:ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimos4Ticket()
    });

    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                message:'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4',{ultimos4:ticketControl.getUltimos4Ticket()});
    })

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);

    });

    client.on('siguienteTicket',(data,callback)=>{
        let siguiente = ticketControl.siguienteTicket();

        console.log(`cual es el siguiente ticket ${siguiente}`);
        callback(siguiente);
    });

});