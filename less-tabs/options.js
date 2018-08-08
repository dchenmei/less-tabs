// Describes Less Tabs popup under the cover functionalities
// Author: dchenmei 

// Methods
/*
 * Called after toggle on / off tab limiting on UI
 */
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
	
	// Update limitTabs field in cloud storage
	chrome.storage.sync.set({'limitTabs' : limitTabs.checked});
}

/*
 * Called after new tab limit is set on UI
 */
function changeTabLimit()
{
	var tabLimit = document.getElementById('tabLimit');
	chrome.storage.sync.set({'tabLimit' : tabLimit.value});
}

/****************************************************
 *
 * Initialization
 *
 ***************************************************/

// Load previous checkbox status, else not checked (prevent accidents)
const default_checked = false;
chrome.storage.sync.get('limitTabs', function(chromeStorage)
{
	document.getElementById('limitTabs').checked = 
		chromeStorage.limitTabs === undefined ? default_checked : chromeStorage.limitTabs;
});

// Load previous limit number, else default (default_limit)
const default_limit = 5;
chrome.storage.sync.get('tabLimit', function(chromeStorage)
{
	document.getElementById('tabLimit').value = 
		chromeStorage.tabLimit === undefined ? default_limit : chromeStorage.tabLimit;
});

// TODO: need some work below
// Set tabs open to the number of tabs from all windows
chrome.tabs.query({}, function(foundTabs) 
{
	var tabsCount = foundTabs.length;
	document.getElementById('tabsOpen').value = tabsCount;
	chrome.storage.sync.set({'tabsOpen' : tabsCount});
	
});

// If user made changes to checkbox, call above function
document.getElementById('limitTabs').addEventListener('change', changeLimitTabs);
document.getElementById('tabLimit').addEventListener('input', changeTabLimit);

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
