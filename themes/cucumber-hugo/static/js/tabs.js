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

ready(function() {
  each(document, '.tabs', function(codeTabs) {
    var ul = codeTabs.querySelector('ul');
    each(codeTabs, '.tab-pane', function(tabPane) {
      var title = tabPane.getAttribute('title')
      var li = element('<li><a>' + title + '</a></li>');
      ul.appendChild(li)
    })
  })
})
