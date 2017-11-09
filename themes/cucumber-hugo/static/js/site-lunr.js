// https://www.josephearl.co.uk/post/static-sites-search-hugo/
function loadIndex(indexLoadedFn) {
  var x = new XMLHttpRequest
  x.overrideMimeType("application/json")
  x.open("GET", "/js/lunr-index.json", true)
  x.onreadystatechange = function() {
    if (4 == x.readyState && "200" == x.status) {
      var data = JSON.parse(x.responseText)
      var lunrIndex = lunr.Index.load(data.idx)
      indexLoadedFn(lunrIndex, data.metadata)
    }
  }
  x.send(null)
}

function registerSearchHandler(searchInputNode, makeSearchFn) {
  return function(lunrIndex, metadata) {
    var searchFn = makeSearchFn(lunrIndex, metadata)
    // Register an oninput event handler
    searchInputNode.oninput = function(event) {
      var query = event.target.value
      searchFn(query)
    }

    // https://github.com/LeaVerou/awesomplete/blob/28b7aed11974a30cc985652e64bd06fe729e685c/awesomplete.js#L70
    searchInputNode.onkeydown = function(evt) {
      var c = evt.keyCode

      if (c === 38 || c === 40) { // Down/Up arrow
        evt.preventDefault()
        console.log("EVT", c)
      }
    }
  }
}

function search(makeRenderFn) {
  return function(lunrIndex, metadata) {
    var renderFn = makeRenderFn()
    return function(query) {
      var results = lunrIndex.search(query)
      renderFn(results, metadata)
    }
  }
}

function renderSearchResultsAutocomplete($navbarItem, searchResultsNode) {
  return function() {
    return function(results, metadata) {
      if (results.length === 0) {
        removeClass($navbarItem, 'is-active')
      } else {
        var $dropdown = document.getElementById('search-hit-dropdown')
        // Remove old items created dynamically
        each($dropdown, '.js-item', function($item) {
          $item.parentNode.removeChild($item)
        })

        results.forEach(function(result) {
          var $template = document.getElementById('search-hit-item-template')
          var $item = $template.cloneNode(true)
          $item.removeAttribute('id')
          $item.removeAttribute('style') // the template is invisible
          $item.setAttribute('href', result.ref)
          $item.querySelector('.js-title').textContent = metadata[result.ref].title
          $item.querySelector('.js-description').textContent = metadata[result.ref].description
          removeClass($item, 'is-hidden')
          addClass($item, 'js-item')
          $dropdown.appendChild($item)
        })

        addClass($navbarItem, 'is-active')
      }
      console.log(results)
    }
  }
}

loadIndex(
  registerSearchHandler(
    document.getElementById('search-input'),
    search(
      renderSearchResultsAutocomplete(
        document.getElementById('search-navbar-item'),
        document.getElementById('search-results')
      )
    )
  )
)
