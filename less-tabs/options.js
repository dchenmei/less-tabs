// Describes Less Tabs popup under the cover functionalities
// Author: swolewizard

// Limit Tabs Checkbox 

// When called, warn user that tabs might be closed then update change in chrome storage
function changeLimitTabs()
{
	var limitTabs = document.getElementById('limitTabs');

	// When user enables limit tabs
	if (limitTabs.checked)
	{
		// Send warning message. If yes, iterate and remove extra tabs from the end
		if (confirm("Tabs might be closed, please save important information"))
		{
			chrome.tabs.query({}, function(tabs)
			{
				var tabLimit = document.getElementById('tabLimit').value;
				for (var i = tabs.length - 1; i >= tabLimit; i--)
				{
					chrome.tabs.remove(tabs[i].id);
				}
			});
		}
		// If no, uncheck limit tabs
		else
		{
			document.getElementById('limitTabs').checked = false;
		}
	}
	
	chrome.storage.sync.set({'limitTabs' : limitTabs.checked});
}

// If user made changes to checkbox, call above function
document.getElementById('limitTabs').addEventListener('change', changeLimitTabs);

// Updated checkbox status with previously stored option, else checked by default
chrome.storage.sync.get('limitTabs',
	function(chromeStorage)
	{
		document.getElementById('limitTabs').checked = chromeStorage.limitTabs === undefined ? true : chromeStorage.limitTabs;
	}
);

// Max Tabs Number Field

// When called, update new number in chrome storage
function changeTabLimit()
{
	var tabLimit = document.getElementById('tabLimit');
	chrome.storage.sync.set({'tabLimit' : tabLimit.value});
}

// If user changes the number, call above function
document.getElementById('tabLimit').addEventListener('input', changeTabLimit);

// Update number field with previously stored optoin, else 2 by default
chrome.storage.sync.get('tabLimit',
	function(chromeStorage)
	{
		document.getElementById('tabLimit').value = chromeStorage.tabLimit === undefined ? 2 : chromeStorage.tabLimit;
	}
);

// Tabs Open Field

// Set tabs open to the number of tabs from all windows
chrome.tabs.query({}, function(foundTabs) 
{
	var tabsCount = foundTabs.length;
	document.getElementById('tabsOpen').value = tabsCount;
	chrome.storage.sync.set({'tabsOpen' : tabsCount});
	
});

// Sets tab count for current window, a possible future functionality
/*
function setTabsCountCurrWindow()
{
	chrome.tabs.query({'currentWindow' : true}, function(foundTabs) {
        	var tabsCount = foundTabs.length;
			document.getElementById('tabsOpen').value = tabsCount;
	});
}
*/
