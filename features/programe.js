const { BotkitConversation } = require( 'botkit' );

module.exports = function( controller ) {

    const convo = new BotkitConversation( 'program_select', controller );

    convo.ask( 'Program: Sila Pilih Salah Satu. \nDiploma \nIjazah \nProfesional \nPascasiswazah', [
        {
            pattern: '^Diploma|diploma$',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'diploma' );
            },
        },
        {
            pattern: '^Ijazah|ijazah$',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'ijazah' );
            },
        },
        {
            pattern: '^Profesional|profesional$',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'pro' );
            },
        },
        {
            pattern: '^Pascasiswazah|pascasiswazah$',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'pasca' );
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
        text: 'Diploma: \n1.Diploma Akauntansi \n2.Diploma in TESL \n3.Diploma Koperasi Korporat \n4.Diploma Sains Komputer',
        action: 'complete'
    }, 'diploma' );

    convo.addMessage({
        text: 'Ijazah: \n1.Ijazah Teknologi Maklumat(Keselamatan Siber) \n2.Ijazah Teknologi Maklumat(Pengkomputeran Perniagaan) \n3.Ijazah Kesenian Animasi 3D dan Media Digital \n4.Ijazah Pengurusan Perniagaan Pengurusan Sumber Manusia \n5.Ijazah Akauntansi \n6.Ijazah Kesenian Pembelajaran Bahasa Ingerris \n7.Ijazah Pergurusan Korporat \n8.Ijazah Komunikasi Korporat \n9.Ijazah Pendidikan Awal Kanak-Kanak \n10.Ijazah Pendidikan TESL \n11.Ijazah Teknologi Maklumat Pembangunan Aplikasi Komputer \n12.Ijazah Pengurusan Perniagaan',
        action: 'complete'
    }, 'ijazah' );

    convo.addMessage({
        text: 'Profesional: \n1.ACCA \n2.AFIA',
        action: 'complete'
    }, 'pro' );
    convo.addMessage({
        text: 'Master & PHD: \n 1.Master in Information System \n2.Master of Business Administration \n3.MBA (Corporate Administration and Governance) \n4.PHD Pentadbiran Perniagaan',
        action: 'complete'
    }, 'pasca' );

    convo.addMessage({
        text: 'Pilihan Tidak Ditemui. :/  \nCuba Sekali Lagi!',
        action: 'repeat',
    }, 'incorrect');

    controller.addDialog( convo );

    controller.hears( 'Program', 'message,direct_message', async( bot, message ) => {

        await bot.beginDialog( 'program_select' );
    });

    controller.commandHelp.push( { command: 'Program', text: 'Paparan program di KUPTM' } );
}