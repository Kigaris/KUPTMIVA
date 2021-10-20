    const { BotkitConversation } = require( 'botkit' );

    module.exports = function( controller ) {

        const convo = new BotkitConversation( 'negeri_quiz', controller );

        convo.ask( 'Boleh awak namakan negeri terbesar di Semenanjung Malaysia?', [
            {
                pattern: '^pahang|Pahang|$',
                handler: async (response, convo, bot) => {
                    await convo.setVar( 'teka', response );
                    await convo.gotoThread( 'betul' );
                },
            },
            {
                default: true,
                handler: async (response, convo, bot) => {
                    await convo.gotoThread( 'salah' );
                },
            }
        ]);

        convo.addMessage({
            text: 'Betul! "{{ vars.teka }}" adalah negeri terbesar di Semenanjung Malaysia',
            action: 'complete'
        }, 'betul' );

        convo.addMessage({
            text: 'Jawapan awak salah \nSila cuba lagi!',
            action: 'repeat',
        }, 'salah');

        controller.addDialog( convo );

        controller.hears( 'Negeri', 'message,direct_message', async ( bot, message ) => {

            await bot.beginDialog( 'negeri_quiz' );
        });

        controller.commandHelp.push( { command: 'Negeri', text: 'Soalan tentang negeri di Malaysia' } );

    }