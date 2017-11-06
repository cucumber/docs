// https://www.josephearl.co.uk/post/static-sites-search-hugo/
function loadIndex(indexLoadedFn) {
  var x = new XMLHttpRequest
  x.overrideMimeType("application/json")
  x.open("GET", "/js/lunr-index.json", true)
  x.onreadystatechange = function() {
    if (4 == x.readyState && "200" == x.status) {
      var data = JSON.parse(x.responseText)
      console.log(data)
      var lunrIndex = lunr.Index.load(data)
      indexLoadedFn(lunrIndex)
    }
  }
  x.send(null)
}

function registerSearchHandler(searchInputNode, makeSearchFn) {
  return function(lunrIndex) {
    var searchFn = makeSearchFn(lunrIndex)
    // Register an oninput event handler
    searchInputNode.oninput = function(event) {
      var query = event.target.value
      searchFn(query)
    }
  }
}

function search(makeRenderFn) {
  return function(lunrIndex) {
    var renderFn = makeRenderFn()
    return function(query) {
      var results = lunrIndex.search(query)
      console.log('RES', results)
      renderFn(results)
    }
  }
}

function renderSearchResults(searchResultsNode) {
  return function() {
    return function(results) {
      if (results.length === 0) {
        // If there were no results, display all menus and menu items
        each(document, '.menu', function(li) {
          removeClass(li, 'is-hidden')
        })
        each(document, '.menu li', function(li) {
          removeClass(li, 'is-hidden')
        })
        return
      }

      // Hide all menu items that don't match the result

      var paths = results.map(function (result) {
        return result.ref
      })
      each(document, '.menu li a', function(a) {
        var match = paths.indexOf(a.getAttribute('href')) !== -1
        if(!match) {
          addClass(a.parentElement, 'is-hidden')
        }
      })

      // Hide all menus that no longer have visible menu items
      each(document, '.menu', function(menu) {
        var visibleItems = menu.querySelectorAll('ul > li:not(.is-hidden)')
        if(visibleItems.length === 0) {
          addClass(menu, 'is-hidden')
        }
      })

    }
  }
}

loadIndex(
  registerSearchHandler(
    document.getElementById('search-input'),
    search(
      renderSearchResults(
        document.getElementById('search-results')
      )
    )
  )
)
