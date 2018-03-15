'use strict'

const fs = require('fs'),
	path = require('path'),
	http = require('http'),
	url = require('url')

const HOST = '127.69.69.69',
	CONTENT_TYPE = {
		css: 'text/css',
		html: 'text/html',
		js: 'text/javascript',
		png: 'image/png',
	}

class Awesomium {
	constructor(dispatch) {
		this.dispatch = dispatch
		this.hooks = {}
		this.server = http.createServer(async (req, res) => {
			let URL = url.parse(req.url, true),
				hook = URL.query['hook']

			console.log(URL)
			if (hook) {
				let wait = this.hooks[hook]

				if (!wait) throw new Error(`Awesomium hook ${hook} dont exist`)

				let data = null

				try {
					data = wait(JSON.parse(URL.query['args']))
					console.log(data)
					res.writeHead(200, { 'Content-Type': 'application/json' })
					res.end(JSON.stringify(data))
				} catch (e) {
					console.error(e)
				}

				return
			}

			try {
				let data = fs.readFileSync(path.join(__dirname, '..', URL.pathname)),
					type = URL.pathname.split('.')

				type = CONTENT_TYPE[type.length > 1 && type[type.length - 1]]

				res.writeHead(200, {
					'Content-Type': type || 'application/octet-stream',
					'Content-Length': data.length
				})
				res.end(data)
			} catch (e) {
				console.error(e)
				res.writeHead(404)
				res.end()
			}
		}).listen(0, HOST, () => { }).on('error', () => { })
	}

	add(path, cb) {
		if (typeof path !== 'string' || path === '') throw new Error(`Awesomium add hook must be strings "awe.add('path', ..."`)

		this.hooks[path] = cb
	}

	remove(path) {
		if (typeof path !== 'string' || path === '') throw new Error(`'Awesomium remove hook must be a string "awe.remove('path')"`)

		delete this.hooks[path]
	}

	open(path) {
		if (typeof path !== 'string' || path === '') throw new Error(`Awesomium open must be path to index.html "awe.open('/path/to/index.html')"`)

		this.dispatch.toClient('S_OPEN_AWESOMIUM_WEB_URL', 1, { url: `${HOST}:${this.server.address().port}/${path}` })
	}
}

let map = new WeakMap()

module.exports = function Require(dispatch) {
	if (map.has(dispatch.base)) return map.get(dispatch.base)

	let Awe = new Awesomium(dispatch)
	map.set(dispatch.base, Awe)
	return Awe
}