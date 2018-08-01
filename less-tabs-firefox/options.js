// Describes Less Tabs popup under the cover functionalities
// Author: dchenmei 

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
			browser.tabs.query({}, function(tabs)
			{
				var tabLimit = document.getElementById('tabLimit').value;
				for (var i = tabs.length - 1; i >= tabLimit; i--)
				{
					browser.tabs.remove(tabs[i].id);
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
	browser.storage.sync.set({'limitTabs' : limitTabs.checked});
}

/*
 * Called after new tab limit is set on UI
 */
function changeTabLimit()
{
	var tabLimit = document.getElementById('tabLimit');
	browser.storage.sync.set({'tabLimit' : tabLimit.value});
}

// If user made changes to checkbox, call above function
document.getElementById('limitTabs').addEventListener('change', changeLimitTabs);

// Updated checkbox status with previously stored option, else checked by default
browser.storage.sync.get('limitTabs',
	function(browserStorage)
	{
		document.getElementById('limitTabs').checked = browserStorage.limitTabs === undefined ? true : browserStorage.limitTabs;
	}
);

// Max Tabs Number Field

// If user changes the number, call above function
document.getElementById('tabLimit').addEventListener('input', changeTabLimit);

// Update number field with previously stored optoin, else 2 by default
browser.storage.sync.get('tabLimit',
	function(browserStorage)
	{
		document.getElementById('tabLimit').value = browserStorage.tabLimit === undefined ? 2 : browserStorage.tabLimit;
	}
);

// Tabs Open Field

// Set tabs open to the number of tabs from all windows
browser.tabs.query({}, function(foundTabs) 
{
	var tabsCount = foundTabs.length;
	document.getElementById('tabsOpen').value = tabsCount;
	browser.storage.sync.set({'tabsOpen' : tabsCount});
	
});

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
