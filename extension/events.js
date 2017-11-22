const buildQueryString = params => Object.keys(params)
	.map(key => [key, params[key]].map(encodeURIComponent).join('='))
	.join('&')

/* insert a script to extract data from the current tab */
const saveToPinboard = () => {
	chrome.tabs.executeScript(null, { file: 'extract.js' }, ([item]) => {
		const url = 'https://pinboard.in/add?' + buildQueryString(item)

		window.open(url, 'Pinboard', 'width=700,height=350')

		/* window.close doesn't close windows created by chrome.windows.create */
		//chrome.windows.create({ url: url, type: 'detached_panel', width: 700, height: 350, focused: true })
	})
}

/* when the toolbar button is clicked */
chrome.browserAction.onClicked.addListener(saveToPinboard)

/* when the keyboard shortcut is pressed */
chrome.commands.onCommand.addListener(command => {
  if (command === 'save-to-pinboard') saveToPinboard()
})
