
//
// Fallback Command
//
module.exports = function (controller) {

    controller.on( 'message,direct_message', async ( bot, message ) => {

        let markDown = `Maaf, saya tidak memahami apa yang anda cuba sampaikan.  \nCuba: ${ controller.checkAddMention( message.roomType, 'bantuan' ) }`;
            
        await bot.reply( message, { markdown: markDown } );
    });
}