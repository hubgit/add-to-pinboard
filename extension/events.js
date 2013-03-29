/* helper script to encode URL parameters */
var build_params = function(params) {
	var items = [];

	for (var param in params) {
		if (params.hasOwnProperty(param) ) {
			items.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]));
		}
	}

	return items.join("&");
};

/* insert a script to extract data from the current tab */
var save_to_pinboard = function() {
	chrome.tabs.executeScript(null, { file: "extract.js" }, function(result) {
		var url = "https://pinboard.in/add?" + build_params(result[0]);
		window.open("https://pinboard.in/add?" + build_params(result[0]), "Pinboard", "width=700,height=350");
		/* window.close doesn't close windows created by chrome.windows.create */
		//chrome.windows.create({ url: url, type: "detached_panel", width: 700, height: 350, focused: true });
	});
};

/* when the toolbar button is clicked */
chrome.browserAction.onClicked.addListener(save_to_pinboard);

/* when the keyboard shortcut is pressed */
chrome.commands.onCommand.addListener(function(command) {
  if (command == "save-to-pinboard") save_to_pinboard();
});
