//
// Forces the user to pick among a predefined list of options
//
const { BotkitConversation } = require( 'botkit' );

module.exports = function (controller) {

    const convo = new BotkitConversation( 'tekawarna', controller );

    convo.ask( 'Boleh awak teka warna kegemaran saya?', [
        {
            pattern: '^biru|hijua|unggu|merah|putih$',
            handler: async ( response, convo ) => {
                await convo.gotoThread( 'betul' );
            }
        },
        {
            default: true,
            handler: async ( response, convo ) => {
                await convo.gotoThread( 'salah' )
            }
        }
    ], 'guessedColor');

    convo.addMessage( {
        text: 'Wow!  Awak teka dengan betul, sememangnya {{ vars.guessedColor }} adalah warna kegemaran saya! ',
        action: 'complete'
    }, 'betul' );

    convo.addMessage( {
        text: 'Salah...Cuba lagi..',
        action: 'default'
    }, 'salah' );

    controller.addDialog( convo );

    controller.hears( 'Teka', 'message,direct_message', async (bot, message) => {

        await bot.beginDialog( 'tekawarna' );
    });


    controller.commandHelp.push( { command: 'Teka', text: 'Bolehkah anda teka warna kegemaran IVA?' } );
};
