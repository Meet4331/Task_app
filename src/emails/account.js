const mailgun = require("mailgun-js");
const DOMAIN = "sandboxac93fe4d081b42938ceab0a4041b5ff3.mailgun.org";
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});


const sendWelcome = (email, name)=>{
mg.messages().send({
	from: "Mailgun Sandbox <postmaster@sandboxac93fe4d081b42938ceab0a4041b5ff3.mailgun.org>",
	to: email,
	subject: "Hello",
	text: `Testing some Mailgun awesomness! thankyou ${name}`
});
}

module.exports = {
    sendWelcome
}
