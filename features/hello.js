//
// Respond to various 'hello' words, attach file by URL and from local file system
var fs = require('fs');

module.exports = function( controller ) {

    controller.hears( [ 'hi','hello','howdy','hey','aloha','hola','bonjour','oi' ], 'message,direct_message', async ( bot,message ) => {

        await bot.reply( message,'Selamat datang! \nIngin berkawan dengan saya?' );
        await bot.reply( message, { markdown: 'Type "bantuan" untuk melihat "command" yang boleh dibuat' } );
      });

    controller.hears( 'Kucing', 'message,direct_message', async ( bot,message ) => {

        await bot.reply( message, {
            text: 'Aww! Comelkan?',
            files: [ 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Youngkitten.JPG/220px-Youngkitten.JPG' ]
        });
    })

    

    controller.commandHelp.push( { command: 'hello', text: 'Selamat Datang!' } );
    controller.commandHelp.push( { command: 'Kucing', text: 'Gambar Kucing Comel!!' } );
    

}