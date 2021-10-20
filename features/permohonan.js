const { BotkitConversation } = require( 'botkit' );

module.exports = function( controller ) {

    const convo = new BotkitConversation( 'permohonan', controller );

    convo.ask( 'Permohonan: Pilih Satu Nombor: \n1.Permohonan Online \n2.Status Permohonan \n3.Pengesahan Penerimaan \n4.ERegistration Perlajar', [
        {
            pattern: '^1|permohonan online|Permohonan online|Permohonan Online$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'online' );
            },
        },
        {
            pattern: '^2|status permohonan|Status Permohonan|Status permohonan$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'status' );
            },
        },
        {
            pattern: '^3|pengesahan penerimaan|Pengesahan penerimaan|Pengesahan Penerimaan$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'pengesahan' );
            },
        },
        {
            pattern: '^4|ERegistration Pelajar|ERegistration pelajar$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'reg' );
            },
        },
        {
            default: true,
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'incorrect' );
            },
        }
    ]);

    convo.addMessage({
        text: 'Permohonan Online boleh dibuat di http://application.kptm.edu.my/cms/smp/index3.php?l1=Application&l2=Online',
        action: 'complete'
    }, 'online' );

    convo.addMessage({
        text: 'Status Permohonan boleh dilihat di http://application.kptm.edu.my/admission/',
        action: 'complete'
    }, 'status' );

    convo.addMessage({
        text: 'Pengesahan Penerimaan boleh dibuat di http://online.kptm.edu.my/confirmation/',
        action: 'complete'
    }, 'pengesahan' );

    convo.addMessage({
        text: 'ERegistration boleh dibuat di https://eregister.kptm.edu.my/',
        action: 'complete'
    }, 'reg' );

    convo.addMessage({
        text: 'Incorrect :/  \nTry again!',
        action: 'repeat',
    }, 'incorrect');

    controller.addDialog( convo );

    controller.hears( 'Permohonan', 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'permohonan' );
    });

    controller.commandHelp.push( { command: 'Permohonan', text: 'Segala perkara tentang permohonan ke KUPTM' } );

}