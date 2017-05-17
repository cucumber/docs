// Misc utilities from http://youmightnotneedjquery.com/

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function each(parent, selector, fn) {
  var elements = document.querySelectorAll(selector)
  Array.prototype.forEach.call(elements, fn)
}

function element(html) {
  var tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = html;
  return tmp.body.firstChild;
};

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

// Logic to build tabs (for Bulma)

ready(function() {
  each(document, '.tabs-container', function(tabsContainer) {
    var tabs = tabsContainer.querySelector('.tabs')
    var ul = tabs.querySelector('ul');
    each(tabs, '.tab-pane', function(tabPane) {
      var title = tabPane.getAttribute('title')
      var li = element('<li><a>' + title + '</a></li>');
      ul.appendChild(li)
      li.addEventListener('click', function() {
        activate(li, tabPane)
      })
    })

    function activate(li, tabPane) {
      each(ul, 'li', function(inactive) { removeClass(inactive, 'is-active') })
      addClass(li, 'is-active')

      each(tabs, '.tab-pane', function(hidden) { addClass(hidden, 'is-hidden') })
      removeClass(tabPane, 'is-hidden')
    }

    var firstLi = ul.querySelector('li')
    var firstTabPane = tabsContainer.querySelector('.tab-pane')
    activate(firstLi, firstTabPane)
  })
})
