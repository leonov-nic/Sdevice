'use strict';

(function () {
  var KEY_ESCAPE = "Escape";
  var KEY_ENTER = "Enter";
  var COUNTRY_CODE = "+7";
  var html = document.querySelector("html");
  var pageFooter = document.querySelector(".page-footer");
  var lists = document.querySelectorAll(".page-footer__js-menu");
  var popup = document.querySelector(".popup");
  var popupClose = popup.querySelector(".popup__close");
  var popupName = popup.querySelector("[name=name]");
  var popupPhone = popup.querySelector("[name=phone]");
  var popupQuestions = popup.querySelector("[name=letter]");
  var popupOpen = document.querySelector("#page-header-button");
  var form = popup.querySelector("form");
  var inputsForm = document.querySelectorAll("input[required]");
  var buttonsSubmit = document.querySelectorAll("[type=submit]");

  var storage = {
    name: "",
    phone: "",
    questions: ""
  }
  var isStorageSupport = "true";

  var setStorage = function () {
    try {
      storage.name = localStorage.getItem("name");
      storage.phone = localStorage.getItem("phone");
      storage.questions = localStorage.getItem("questions");
    }
    catch (err) {
      isStorageSupport = "false";
    }

    if (storage) {
      popupName.value = storage.name;
      popupPhone.value = storage.phone;
      popupQuestions.value = storage.questions;

      setTimeout(function() {
        document.getElementById("name-popup").focus();
      }, 0);

    } else {
      popupName.focus();
    }
  }

  var isEscPress = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  };

  var isEnterPress = function (evt) {
    if (evt.key === KEY_ENTER) {
      closePopup();
    }
  };

  if (form) {
    form.addEventListener("submit", function (evt) {
      if (popupName.value || popupPhone.value ||  popupQuestions.value) {
        if (isStorageSupport) {
          localStorage.setItem("name", popupName.value);
          localStorage.setItem("phone", popupPhone.value);
          localStorage.setItem("questions", popupQuestions.value);
        }
      }
    });
  }

  var openPopup = function (evt) {
    evt.preventDefault();
    setStorage();
    var element = document.createElement("div");
    element.className = "body-black";
    document.body.appendChild(element);
    if (popup) {
      popup.classList.add("popup-show");
    }
    html.style.overflow = "hidden";

    element.addEventListener("click", closePopup);
    popupClose.addEventListener("click", closePopup);
    popupClose.addEventListener("keydown", isEnterPress);
    document.addEventListener("keydown", isEscPress);
  };

  var closePopup = function () {
    var element = document.querySelector(".body-black");
    element.remove();
    if (popup) {
      popup.classList.remove("popup-show");
    }
    html.style.overflow = "auto";

    element.addEventListener("click", closePopup);
    popupClose.removeEventListener("keydown", isEnterPress);
    popupClose.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", isEscPress);
  };

  if (popupOpen) {
    popupOpen.removeEventListener("click", openPopup);
    popupOpen.addEventListener("click", openPopup);
  }
  pageFooter.classList.remove("page-footer--nojs");

  function onOpenCloseMenu (list) {
    if (list.classList.contains("page-footer__js-menu--closed")) {
      list.classList.remove("page-footer__js-menu--closed");
      list.classList.add("page-footer__js-menu--opened");
    } else {
      list.classList.add("page-footer__js-menu--closed");
      list.classList.remove("page-footer__js-menu--opened");
    }
  };

  var openCloseLists = function (toggle, list) {

    toggle.addEventListener("click", function () {

      if (list.classList.contains("page-footer__js-menu--opened")) {
        list.classList.add("page-footer__js-menu--closed");
        list.classList.remove("page-footer__js-menu--opened");
      } else {
        let openedLists = document.querySelectorAll(".page-footer__js-menu");
        if (openedLists) {
          for (var i = 0; i < lists.length; i++) {
            openedLists[i].classList.add("page-footer__js-menu--closed");
            openedLists[i].classList.remove("page-footer__js-menu--opened");
          }
        }
        onOpenCloseMenu(list);
      }
    });
  };

  if (lists) {
    for (var i = 0; i < lists.length; i++) {
      openCloseLists(lists[i], lists[i]);
    }
  }

  var errorFieldInput = function (fields) {

    fields.forEach(function (field) {
      var validity = field.validity;

      if (validity.patternMismatch) {
        field.classList.add("field-invalid");
      } else {
        field.classList.remove("field-invalid");
      }

      field.addEventListener("blur", function () {
        if (!field.value || field.value && !validity.patternMismatch) {
          field.classList.remove("field-invalid");
        } else {
          field.classList.add("field-invalid");
        }
      });
    });
  };

  buttonsSubmit.forEach(function (button) {
    button.addEventListener("click", function () {
      errorFieldInput(inputsForm);
    });
  });

  function maskPhone(selector, masked = COUNTRY_CODE+'(___)___-__-__') {
    var inputPhones = document.querySelectorAll(".js-mask");
    if (inputPhones) {
      inputPhones.forEach(function (phone) {
        function mask(event) {
          const keyCode = event.keyCode;
          const template = masked,
          def = template.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, "");
          // console.log(template);
          let i = 0,
          newValue = template.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
          i = newValue.indexOf("_");
          if (i !== -1) {
            newValue = newValue.slice(0, i);
          }
          let reg = template.substr(0, this.value.length).replace(/_+/g,
          function (a) {
              return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = newValue;
          }
          if (event.type === "blur" && this.value.length < 5) {
            this.value = "";
          }
        }
        phone.addEventListener("input", mask);
        phone.addEventListener("focus", mask);
        phone.addEventListener("blur", mask);
      });
    }
  }

  maskPhone();

})();
