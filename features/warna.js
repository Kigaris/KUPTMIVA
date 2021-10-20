//
// Simplest use of Botkit's conversation system
//
const { BotkitConversation } = require( 'botkit' );

module.exports = function( controller ) {

    const convo = new BotkitConversation( 'warna', controller );

    
    convo.ask(
        'Apa warna kegemaran awak?',
        async ( answer, convo, bot ) => {},
        'input_warna' 
    );
    convo.say( `Menarik, saya pun suka {{ vars.input_warna }} juga!` );

    controller.addDialog( convo );

    controller.hears( 'Warna', 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'warna' );
    });

    controller.commandHelp.push( { command: 'Warna', text: 'Pilih warna kegemaran anda.' } );

}
