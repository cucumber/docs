////// DOM UTILS - see http://youmightnotneedjquery.com/

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

////// Show/hide content

var showHideCodeSelectors = ['code.language-java', 'code.language-javascript', 'code.language-ruby']

function showOnly(language) {
  // Activate tab for language
  each(document, '.tabs li', function(a) { removeClass(a, 'is-active') })
  var tab = document.querySelector('[data-language="' + language + '"]')
  addClass(tab, 'is-active')

  // Hide all code elements
  for(var i=0; i<showHideCodeSelectors.length; i++) {
    var selector = showHideCodeSelectors[i]
    each(document, selector, function(codeElement) {
      addClass(codeElement, 'is-hidden')
      addClass(codeElement.parentElement, 'is-hidden')
    })
  }
  each(document, "code.language-" + language, function(codeElement) {
    removeClass(codeElement, 'is-hidden')
    removeClass(codeElement.parentElement, 'is-hidden')
  })
}

ready(function() {
  each(document, '.tabs li', function(li) {
    var language = li.getAttribute('data-language')
    li.addEventListener('click', function () {
      showOnly(language)
    })
  })

  var firstLi = document.querySelector('.tabs li')
  if(firstLi) showOnly(firstLi.getAttribute('data-language'))
})
