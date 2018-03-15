const Command = require('command'),
	Awesomium = require('awesomium')

module.exports = function Awetest(dispatch) {
	const command = Command(dispatch),
		awesomium = Awesomium(dispatch)

	command.add('awe', () => {
		awesomium.open('awetest/www/index.html')
	})

	awesomium.add('awe', (...args) => {
		console.log('[AWETEST] got the hook with args:', ...args)
		return { 'xd': true }
	})

	this.destructor = () => {
		command.remove('awe')
		awesomium.remove('awe')
	}
}