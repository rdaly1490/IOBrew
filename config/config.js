console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
	module.exports = {
		stormPath: {
			apiKeyId: process.env.STORMPATH_API_KEY_ID,
			apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
			secretKey: process.env.STORMPATH_SECRET_KEY
		},
		email: {
			service: "Mailgun",
			auth: {
				user: process.env.MAILGUN_USER,
				pass: process.env.MAILGUN_PASS
			}
		}
	};
}
else {
	var stormpath
	module.exports = {
		stormPath: require('../stormpath/stormpath.js'),
		email: require('../stormpath/email.js')
	};
}