// background.js
// author: dchenmei

// When a new tab is open, handle it
browser.tabs.onCreated.addListener(function(tab)
{
	browser.tabs.query({}, function(tabs)
	{
        /*
 		 * From Chrome Cloud storage, retrieve:
 		 * limitTabs: boolean, whether tab limit feature is toggled on
 		 * tabLimit: int, tab limit set on UI
 		 * tabsOpen: int, number of tabs currently open
 		 */
		browser.storage.sync.get(['limitTabs', 'tabLimit', 'tabsOpen'], function(storage) 
		{
				var limitTabs = storage.limitTabs;
				var tabLimit = storage.tabLimit;
				var tabsOpen = tabs.length;
		
				// If extension is on and number of tabs exceed limit, delete new tab
				if (limitTabs && tabsOpen > tabLimit)
				{
					browser.tabs.remove(tab.id);
				}
		});
	});
});
