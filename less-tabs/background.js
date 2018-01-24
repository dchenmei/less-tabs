// Describes Less Tabs extension background process
// author: swolewizard
// Runs behind the scene, ensuring that number of tabs never exceed limit when limit tab is enabled
chrome.tabs.onCreated.addListener(function(tab)
{
	chrome.tabs.query({}, function(tabs)
	{
		chrome.storage.sync.get(['limitTabs', 'tabLimit', 'tabsOpen'], 
			function(chromeStorage) 
			{
				var limitTabs = chromeStorage.limitTabs;
				var tabLimit = chromeStorage.tabLimit;
				var tabsOpen = tabs.length;
		
				// Number of tabs exceeded limit
				if (limitTabs && tabsOpen > tabLimit)
				{
					chrome.tabs.remove(tab.id);
				}
		   }
		);
	});
});
