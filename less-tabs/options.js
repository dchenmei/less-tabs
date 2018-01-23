// Updates changes for limitTabs checkbox
function changeLimitTabs()
{
	var limitTabs = document.getElementById('limitTabs');

	// Give warning and close tabs until number is reached
	// TODO: this is probably not the most elegant way to do this
	if (limitTabs.checked)
	{
		if (confirm("Tabs might be closed, please save important information"))
		{
		}
		else
		{
			document.getElementById('limitTabs').checked = false;
		}
	}
	
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

// Updates changes for tabsOpen

// set current window tabs count
/*
function setTabsCountCurrWindow()
{
	chrome.tabs.query({'currentWindow' : true}, function(foundTabs) {
        	var tabsCount = foundTabs.length;
			document.getElementById('tabsOpen').value = tabsCount;
	});
}
*/

// set all windows tab count
function setTabsCount()
{
	chrome.tabs.query({}, function(foundTabs) 
	{
		var tabsCount = foundTabs.length;
		document.getElementById('tabsOpen').value = tabsCount;
		chrome.storage.sync.set({'tabsOpen' : tabsCount});
		
	});
};

setTabsCount();
