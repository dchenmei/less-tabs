// Only if limit tabs is on and exceeded limit does the tab get closed
chrome.tabs.onCreated.addListener(function(tab)
{
	chrome.tabs.query({}, function(foundTabs)
	{
		chrome.storage.sync.get(['limitTabs', 'tabLimit', 'tabsOpen'], 
			function(chromeStorage) 
			{
				var limitTabs = chromeStorage.limitTabs;
				var tabLimit = chromeStorage.tabLimit;
				var tabsOpen = foundTabs.length;
		
				//alert(limitTabs + " " + tabLimit + " " + tabsOpen);
				if (limitTabs && tabsOpen > tabLimit)
				{
					alert(tabLimit + " " + tabsOpen);
				}
		   }
		);
	});
});
