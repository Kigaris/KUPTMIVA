const { BotkitConversation } = require( 'botkit' );

module.exports = function( controller ) {

    const convo = new BotkitConversation( 'tekateki', controller );

    convo.ask( 'Ibu diterbalikkan jadi ubi, kalau kopi di terbalikkan apa jadi?', [
        {
            pattern: '^tumpah|Tumpah$',
            handler: async (response, convo, bot) => {
                await bot.say( `Bagus! kopi kalau diterbalikkan dia akan ${ response }` );
            },
        },
        {
            default: true,
            handler: async (response, convo, bot) => {
                await bot.say( 'Salah :/  \nSila cuba jawapan lain!' );
                await convo.repeat();
            },
        }    
    ]);

    controller.addDialog( convo );

    controller.hears( 'Teka Teki', 'message,direct_message', async( bot, message ) => {

        await bot.beginDialog( 'tekateki' );
    });

    controller.commandHelp.push( { command: 'Teka Teki', text: 'Mari jawap teka teki menarik!' } );
}