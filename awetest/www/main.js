function getdata(hook, args) {
	$.ajax({
		data: { hook: hook, args: JSON.stringify(args) },
		success: function success(data, textStatus, jQxhr) {
			$("div").text(JSON.stringify(data));
			_tera_client_proxy_.alert(JSON.stringify(data));
		}
	});
}

var vvv = { 'dickinmymounth': 69 };
jQuery(function ($) {
	getdata('awe', vvv);
});