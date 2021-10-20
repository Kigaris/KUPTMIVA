//
// Quiz: example of a muti-threaded conversation with timeout
//
//TODO: implement timeout mechanism for Botkit 4.5

const { BotkitConversation } = require( 'botkit' );

module.exports = function (controller) {

    const convo = new BotkitConversation( 'matematik', controller );

    convo.ask( 'Bersedia untuk cabaran matematik? (Ya/Tidak/batal)', [
        {
            pattern: 'Ya|ya|yeah|yes',
            handler: async ( response, convo ) => {

                convo.gotoThread( 'quiz' );
            }
        },
        {
            pattern: 'tidak|Tidak|no|batal|Batal|cancel|stop|exit',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'batal' );
            },
        },
        {
            default: true,
            handler: async ( response, convo ) => {
                await convo.gotoThread( 'bad_answer' );
            }
        }
    ]);

    // Thread: bad response
    convo.addMessage({
        text: 'Maaf, pilihan anda tiada dalam senarai...',
        action: 'default', // goes back to the thread's current state, where the question is not answered
    }, 'bad_answer' );

    // Thread: cancel
    convo.addMessage({
        text: 'OK, Terima Kasih kerana mencuba',
        action: 'stop', // this marks the converation as unsuccessful
    }, 'batal');

    // Thread: quiz

    convo.addMessage( 'Mari kita mulakan...', 'quiz' );

    let challenge = pickChallenge();

    convo.addQuestion( {
        text: async ( template, vars ) => { 
            
            return `Soalan: ${ challenge.question }` }
        },
        [
            {
                pattern: 'cancel|stop|exit|batal|Batal',
                handler: async ( response, convo ) => {

                    await convo.gotoThread( 'batal' );
                }
            },
            {
                default: true,
                handler: async (response, convo) => {

                    if ( response == challenge.answer){
                        challenge = pickChallenge();
                        await convo.gotoThread( 'berjaya' )
                    }
                    else {
                        await convo.gotoThread( 'salah' );
                    }
                }
            }
        ], {}, 'quiz');

    // Thread: quiz - success
    convo.addMessage( 'Taniah, anda berjaya menjawab soalan dengan betul!', 'berjaya');

    // Thread: quiz - missed
    // convo.addMessage( 'Time elapsed! you missed it, sorry.', 'missed' ); //TODO

    // Thread: quiz - wrong answer
    convo.addMessage({
        text: 'Maaf, jawapan anda salah. Sila cuba lagi!',
        action: 'quiz', // goes back to the thread's current state, where the question is not answered
    }, 'salah');

    controller.addDialog( convo );

    function pickChallenge() {
        var a = Math.round(Math.random() * 5) + 4;
        var b = Math.round(Math.random() * 5) + 4;
        return {
            question:  `${ a } x ${ b } =`,
            answer: `${ a*b }`
        }
    }

    controller.hears( 'Matematik', 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'matematik' );
    });

    controller.commandHelp.push( { command: 'Matematik', text: 'Cabar minda dengan soalan matematik!' } );

}