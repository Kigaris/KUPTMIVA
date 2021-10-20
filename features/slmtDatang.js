//
// Welcome message 
// sent as the bot is added to a Room
//
module.exports = function (controller) {

    controller.on( 'memberships.created', async ( bot, message ) => {

        // If the person being added to a space isn't the bot, exit
        if ( message.data.personId != controller.adapter.identity.id )  return;

        let markDown = `Hi, Saya ${ controller.adapter.identity.displayName } bot!  \nSaya Gembira berjumpa dengan awak`
        markDown += 'Sila type "bantuan" untuk mengetahui kebolehan saya.';

        if ( message.data.roomType == 'group' ) {

            markDown += `\n_Perhatian, kita sekarang berada di ruang "Kumpulan" \n  Saya hanya akan menjawap jika dipanggil!  \n`
            markDown += `Untuk bantuan, Enter: ${ controller.checkAddMention( message.data.roomType, 'bantuan' ) }_`
        }

        await bot.reply( message, { markdown : markDown} );
    });
}