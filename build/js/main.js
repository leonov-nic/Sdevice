'use strict';

(function () {
  var pageFooter = document.querySelector('.page-footer');
  var footerToggles = document.querySelectorAll('.page-footer__toggles');
  var lists = document.querySelectorAll('.page-footer__js-menu');

  console.log(footerToggles);
  console.log(lists);

  pageFooter.classList.remove('page-footer--nojs');


  function onOpenCloseMenu (list) {
    if (list.classList.contains('page-footer__js-menu--closed')) {
      list.classList.remove('page-footer__js-menu--closed');
      list.classList.add('page-footer__js-menu--opened');
    } else {
      list.classList.add('page-footer__js-menu--closed');
      list.classList.remove('page-footer__js-menu--opened');
    }
  };

  var openCloseLists = function (toggle, list) {
    toggle.addEventListener("click", function () {
      onOpenCloseMenu (list);
    });
  };

  for (var i = 0; i < footerToggles.length; i++) {
    openCloseLists(footerToggles[i], lists[i]);
  }

})();
