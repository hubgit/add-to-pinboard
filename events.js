/* when the toolbar button is clicked, insert a script to extract data from the current tab */
chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.executeScript(null, { file: "extract.js" }, function(result) {
		window.open("https://pinboard.in/add?" + build_params(result[0]), "Pinboard", "width=700,height=350");
	});
});

/* helper script to encode URL parameters */
var build_params = function(params) {
	var items = [];

	for (var param in params) {
		if (params.hasOwnProperty(param) ) {
			items.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]));
		}
	}

	return items.join("&");
}
