chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
      url: 'https://solguerrilla.com/',
      selected: false,
    })
    chrome.tabs.create({
      url: chrome.extension.getURL('index.html'),
      selected: true,
    })

  })
