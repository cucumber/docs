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

function toggleClass(el, className) {
  if(el.classList.toggle) {
    el.classList.toggle(className)
  } else if(hasClass(el, className)) {
    removeClass(el, className)
  } else {
    addClass(el, className)
  }
}

////// Show/hide polyglot content

var showHideSelectors = [
  '.language-dotnet',
  '.text-dotnet',
  '.language-java',
  '.text-java',
  '.language-javascript',
  '.text-javascript',
  '.language-kotlin',
  '.text-kotlin',
  '.language-scala',
  '.text-scala',
  '.language-ruby',
  '.text-ruby',
  '.language-golang',
  '.text-golang',
]

function showOnly(language) {
  // Remember
  localStorage.setItem('language', language)

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
        if(el.nodeName === 'CODE' && el.parentElement.nodeName === 'PRE') {
          removeClass(el.parentElement, 'is-hidden')
        }
      } else {
        addClass(el, 'is-hidden')
        if(el.nodeName === 'CODE' && el.parentElement.nodeName === 'PRE') {
          addClass(el.parentElement, 'is-hidden')
        }
      }
    })
  }
}

function updateQueryParam(url, language){
  url.searchParams.set('lang', language);
  window.history.pushState({}, '', url);
}

function showDefaultLang(){
  if(!supportedLanguages.includes(localStorage.getItem('language'))){
    showOnly(defaultLanguage)
  }else{
    showOnly(localStorage.getItem('language'))
  }
}
// Activate

ready(function() {
  const url = new URL(window.location);
  const supportedLanguages = [...document.querySelectorAll('.tabs li')].map((li) => li.getAttribute('data-language'))

  if (supportedLanguages.length >= 1) {
    const defaultLanguage = supportedLanguages[0]
    const localLanguage = localStorage.getItem('language');
    const selectedLanguage = url.searchParams.get('lang');

    if (supportedLanguages.includes(selectedLanguage)) {
      updateQueryParam(url, selectedLanguage)
      showOnly(selectedLanguage)
    } else if (supportedLanguages.includes(localLanguage)) {
      updateQueryParam(url, localLanguage)
      showOnly(localLanguage)
    } else {
      updateQueryParam(url, defaultLanguage)
      showOnly(defaultLanguage)
    }

    each(document, '.tabs li', function(li) {
      var language = li.getAttribute('data-language')
      li.addEventListener('click', function () {
        updateQueryParam(url, language)
        showOnly(language)
      })
    })
  }


  each(document, '.panel.collapsible > a', function(a) {
    var targetSelector = a.getAttribute('data-target');
    a.addEventListener('click', function() {
      var el = document.querySelector(targetSelector);
      el.classList.toggle('collapsed');
    })
  })

  // Toggle navbar menu
  var burger = document.querySelector('.navbar-burger')
  if(burger) {
    burger.addEventListener('click', function() {
      var navbarMenu = document.getElementById(burger.dataset.target)

      toggleClass(burger, 'is-active')
      toggleClass(navbarMenu, 'is-active')
    })
  }
})
