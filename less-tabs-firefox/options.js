// Describes Less Tabs popup under the cover functionalities
// Author: dchenmei 

/****************************************************
 *
 * Methods
 *
 ***************************************************/

// When called, toggles limit tabs function on / off
function changeLimitTabs()
{
	var limitTabs = document.getElementById('limitTabs');
	var tabLimit = document.getElementById('tabLimit').value;

	// When user enables limit tabs
	if (limitTabs.checked)
	{
		// Send warning message. If yes, iterate and remove extra tabs from the end

		//if (confirm("Tabs might be closed, please save important information"))
		//{
			browser.tabs.query({}, function(tabs)
			{
				for (var i = tabs.length - 1; i >= tabLimit; i--)
				{
					browser.tabs.remove(tabs[i].id);
				}
			});
		//}
		/*
		else
		{
			limitTabs.checked = false;
		}
		*/
	}
	
	// Update limitTabs field in cloud storage
	browser.storage.sync.set({'limitTabs' : limitTabs.checked});
}

// When called, update max number of tabs to the user input on popup
function changeTabLimit()
{
	var tabLimit = document.getElementById('tabLimit');
	browser.storage.sync.set({'tabLimit' : tabLimit.value});
}

/****************************************************
 *
 * Initialization
 *
 ***************************************************/

// Load previous checkbox status, else not checked (prevent accidents)
const default_checked = false;
browser.storage.sync.get('limitTabs', function(storage)
{
	document.getElementById('limitTabs').checked = 
		storage.limitTabs === undefined ? default_checked : storage.limitTabs;
});

// Load previous limit number, else default (default_limit)
const default_limit = 5;
browser.storage.sync.get('tabLimit', function(storage)
{
	document.getElementById('tabLimit').value = 
		storage.tabLimit === undefined ? default_limit : storage.tabLimit;
});

// Set tabs open to the number of tabs from all windows
browser.tabs.query({}, function(foundTabs) 
{
	var tabsCount = foundTabs.length;
	document.getElementById('tabsOpen').value = tabsCount;
	browser.storage.sync.set({'tabsOpen' : tabsCount});
	
});

// If user make changes in popup, update
document.getElementById('limitTabs').addEventListener('change', changeLimitTabs);
document.getElementById('tabLimit').addEventListener('input', changeTabLimit);

// Sets tab count for current window, a possible future functionality
/*
function setTabsCountCurrWindow()
{
	browser.tabs.query({'currentWindow' : true}, function(foundTabs) {
        	var tabsCount = foundTabs.length;
			document.getElementById('tabsOpen').value = tabsCount;
	});
}
*/
