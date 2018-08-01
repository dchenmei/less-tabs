// Describes Less Tabs extension background process
// author: dchenmei

// When a new tab is open, process it 
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
		browser.storage.sync.get(['limitTabs', 'tabLimit', 'tabsOpen'], 
			function(browserStorage) 
			{
				var limitTabs = browserStorage.limitTabs;
				var tabLimit = browserStorage.tabLimit;
				var tabsOpen = tabs.length;
		
				// If number tab limit is on and current tabs exceed limit, delete new tab
				if (limitTabs && tabsOpen > tabLimit)
				{
					browser.tabs.remove(tab.id);
				}
		   }
		);
	});
});
