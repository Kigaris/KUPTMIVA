const { BotkitConversation } = require( 'botkit' );

module.exports = function( controller ) {

    const convo = new BotkitConversation( 'portal_pelajar', controller );

    convo.ask( 'Portal Pelajar: \n1.CMS \n2.LMS \n3.E-pay \n4.Jadual', [
        {
            pattern: '^1|CMS|cms$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'cms' );
            },
        },

        {
            pattern: '^2|LMS|lms$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'lms' );
            },
        },

        {
            pattern: '^3|E-pay|EPay|E-Pay|e-pay|e-Pay|ePay|epay$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'pay' );
            },
        },

        {
            pattern: '^4|Jadual|jadual$',
            handler: async (response, convo, bot) => {
                await convo.setVar( 'guess', response );
                await convo.gotoThread( 'jadual' );
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
        text: 'CMS boleh dilayari di http://cmskl.kptm.edu.my:8000/cms/smp/index2.php \nGunakan ID Pelajar sebagai username & Nombor IC sebagai kata laluan ',
        action: 'complete'
    }, 'cms' );

    convo.addMessage({
        text: 'LMS boleh dilayari di https://lms.kuptm.edu.my/home/ ',
        action: 'complete'
    }, 'lms' );

    convo.addMessage({
        text: 'Pembayaran yuran boleh dibuat di https://epay.kptm.edu.my/ \nSila gunakan e-mail pelajar ketika log masuk ',
        action: 'complete'
    }, 'pay' );

    convo.addMessage({
    
        text: 'Jadual Pelajar boleh dilihat di https://kuptmkl.edupage.org/timetable/ ',
        file:['http://www.kuptm.edu.my/images/2021/CAES/ACAD_CALENDAR/KUPTM_ACADEMIC_CALENDAR_2021-2022_V2.jpg'],
        action: 'complete'
    }, 'jadual' );

    convo.addMessage({
        text: 'Piliha anda tidak ditemui:  \nSila cuba sekali lagi!',
        action: 'repeat',
    }, 'incorrect');

    controller.addDialog( convo );

    controller.hears( 'Pelajar', 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'portal_pelajar' );
    });

    controller.commandHelp.push( { command: 'Pelajar', text: 'Paparan mengenai portal pelajar' } );

}