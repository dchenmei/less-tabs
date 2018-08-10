// background.js
// author: dchenmei

// When a new tab is open, handle it
chrome.tabs.onCreated.addListener(function(tab)
{
	chrome.tabs.query({}, function(tabs)
	{
        /*
 		 * From Chrome Cloud storage, retrieve:
 		 * limitTabs: boolean, whether tab limit feature is toggled on
 		 * tabLimit: int, tab limit set on UI
 		 * tabsOpen: int, number of tabs currently open
 		 */
		chrome.storage.sync.get(['limitTabs', 'tabLimit', 'tabsOpen'], function(chromeStorage) 
		{
				var limitTabs = chromeStorage.limitTabs;
				var tabLimit = chromeStorage.tabLimit;
				var tabsOpen = tabs.length;
		
				// If extension is on and number of tabs exceed limit, delete new tab
				if (limitTabs && tabsOpen > tabLimit)
				{
					chrome.tabs.remove(tab.id);
				}
		});
	});
});
