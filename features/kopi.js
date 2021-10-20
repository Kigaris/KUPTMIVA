//
// Illustrates a muti-threaded conversation
//
// Q: "How about some coffee (yes / no / cancel)"
// A: no
// Q: "What would you like to drink instead..?"
// A: Coke
//
const { BotkitConversation } = require( 'botkit' );

module.exports = function (controller) {

    const convo = new BotkitConversation( 'minum', controller );

    convo.ask( 'Awak mahu kopi panas? (Ya / Tidak / batal)', [
        {
            pattern: 'yes|ya|yeah|Ya|boleh|Boleh',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'boleh' );
            }
        },
        {
            pattern: 'no|tidak|Tidak|takpe|Takpe|birk',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'minuman' );
            }
        },
        {
            pattern: 'cancel|stop|exit|batal|Batal',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'batal' );
            }
        },
        {
            default: true,
            handler: async ( response, convo ) => {
                await convo.gotoThread( 'lain' );
            }
        }
    ])

    convo.addMessage( {
        text: 'Sila nikmati kopi ini. \nHmm...Terasa segar lepas minum kopi!',
        action: 'complete'
    }, 'boleh' );

    convo.addMessage( {
        text: 'Faham...Tak mengapa',
        action: 'complete'
    }, 'batal' );

    convo.addMessage( {
        text: 'Maaf, boleh awak ulang semula?\nTip: Cuba "ya", "tidak", or "batal"',
        action: 'default'
    }, 'lain' );

    // Thread: ask for a drink
    convo.addQuestion( 'Kalau tidak mahu kopi, air apa yang awak nak...?', [], 'InputMinuman', 'minuman' );
    convo.addMessage( 'Menarik!  Saya pun suka minum {{ vars.InputMinuman }}', 'minuman' );

    controller.addDialog( convo );

    controller.hears( 'Minuman', 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'minum' );
    });

    controller.commandHelp.push( { command: 'Minuman', text: 'Nikmati minuman anda bersama IVA.' } );

}
