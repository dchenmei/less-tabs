var limitTabs = true;
// Called when user enables / disables "limit tabs" option

// Listener on storage
chrome.storage.onChanged.addListener(
	function(changes, namespace)
	{
		if (changes[limitTabs])
		{
			limitTabs = changes['limitTabs'].newValue;
		}
	}
);

// Sync
chrome.storage.sync.get('limitTabs',
	function(chromeStorage)
	{
		limitTabs = chromeStorage.limitTabs;
	}
);


