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

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

////// Show/hide content

var showHideSelectors = [
  '.language-java',
  '.text-java',
  '.language-javascript',
  '.text-javascript',
  '.language-ruby',
  '.text-ruby',
]

function showOnly(language) {
  // Activate tab for language
  each(document, '.tabs li', function(a) { removeClass(a, 'is-active') })
  var tab = document.querySelector('[data-language="' + language + '"]')
  addClass(tab, 'is-active')

  // Hide all code elements
  for(var i=0; i<showHideSelectors.length; i++) {
    var selector = showHideSelectors[i]
    each(document, selector, function(el) {
      if(hasClass(el, 'text-'+language) || hasClass(el, 'language-'+language)) {
        removeClass(el, 'is-hidden')
        if(el.nodeName == 'CODE' && el.parentElement.nodeName == 'PRE') {
          removeClass(el.parentElement, 'is-hidden')
        }
      } else {
        addClass(el, 'is-hidden')
        if(el.nodeName == 'CODE' && el.parentElement.nodeName == 'PRE') {
          addClass(el.parentElement, 'is-hidden')
        }
      }
    })
  }
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
