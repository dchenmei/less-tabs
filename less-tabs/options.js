// Updates changes for limitTabs checkbox
function changeLimitTabs()
{
	var limitTabs = document.getElementById('limitTabs');
	chrome.storage.sync.set({'limitTabs' : limitTabs.checked});
}

document.getElementById('limitTabs').addEventListener('change', changeLimitTabs);

chrome.storage.sync.get('limitTabs',
	function(chromeStorage)
	{
		// If there is a previous stored option, sync it else use default (checked)
		document.getElementById('limitTabs').checked = chromeStorage.limitTabs === undefined ? true : chromeStorage.limitTabs;
	}
);


// Updates changes for tabLimit value
function changeTabLimit()
{
	var tabLimit = document.getElementById('tabLimit');
	chrome.storage.sync.set({'tabLimit' : tabLimit.value});
}

document.getElementById('tabLimit').addEventListener('input', changeTabLimit);

chrome.storage.sync.get('tabLimit',
	function(chromeStorage)
	{
		document.getElementById('tabLimit').value = chromeStorage.tabLimit === undefined ? 2 : chromeStorage.tabLimit;
	}
);
