broken for now, i will fix this shit soon (or not idk)

```javascript
awesomium.add('myhook', async (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify({ randomdatatosendokay: null }))
})
```

```javascript
function getdata(hook, args) {
	$.ajax({
		data: { hook: hook, args: args },
		success: function (data, textStatus, jQxhr) {
			_tera_client_proxy_.alert(data)
		}
	})
}
```