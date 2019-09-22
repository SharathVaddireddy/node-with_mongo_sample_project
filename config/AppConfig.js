/**
 * An abstract js file,
 * where application configuration constants resides here,
 * we import the file and use the constants throughout the application on-demand
 * 
 * Author: Sharath Vaddireddy
 * 
 */


module.exports = {
    application:{
        port:4000
    },
    database: {
		url: 'mongodb://localhost:27017/nodeapp',
		username: 'samplenodeapp',
		password: ''
	},
}