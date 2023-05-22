//đối tượng Validator
function Validator(options) {
    function getParent(element, selector) {
      while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
          return element.parentElement;
        }
        element = element.parentElement;
      }
    }
  
    var selectorRules = {};
    function validate(inputElements, rule) {
      var errorElement = getParent(inputElements, options.formGroupSelector).querySelector(options.errorSelector);
       console.log(inputElements.value)
      // console.log(rule)
      var errorMessage;
      // Lấy ra các rules của selector
      var rules = selectorRules[rule.selector];
      // Lặp qua từng rule & kiểm tra
      // Nếu có lỗi thì dừng việc kiểm
      for (var i = 0; i < rules.length; ++i) {
        switch (inputElements.type) {
            case 'radio':
            case 'checkbox':
                errorMessage = rules[i](
                    formElement.querySelector(rule.selector + ':checked')
                );
                break;
            default:
                errorMessage = rules[i](inputElements.value);
        }
        if (errorMessage) break;
    }
      // console.log(errorMessage)
      if (errorMessage) {
        console.log(errorMessage)
        errorElement.innerText = errorMessage;
        getParent(inputElements, options.formGroupSelector).classList.add(
          "invalid"
        );
      } else {
        errorElement.innerText = "";
        getParent(inputElements, options.formGroupSelector).classList.remove(
          "invalid"
        );
      }
      return !errorMessage;
      // console.log(inputElement.parentElement.querySelector('.form-message'))
    }
  
    var formElement = document.querySelector(options.form);
    // console.log(formElement)
    if (formElement) {
      //khi submit form
      formElement.onsubmit = function (e) {
        e.preventDefault();
  
        var isFormValid = true;
        //lặp qua từng rules và validate
        options.rules.forEach(function (rule) {
          var inputElements = formElement.querySelector(rule.selector);
          var isValid = validate(inputElements, rule);
          if (!isValid) {
            isFormValid = false;
          }
        });
  
        if (isFormValid) {
          //trường hợp submit với javascrip
          if (typeof options.onSubmit === "function") {
            var enableInputs = formElement.querySelectorAll(
              "[name]:not([disable])"
            );
            console.log(enableInputs)
            var formValues = Array.from(enableInputs).reduce(function (
              value,
              input
            ) {
              switch(input.type){
                case 'radio':
                  value[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                  break;
                case 'checkbox':
                  if (!input.matches(':checked')) {
                    value[input.name] = '';
                    return value;
                  }
                  if (!Array.isArray(value[input.name])) {
                    value[input.name] = [];
                }
                value[input.name].push(input.value);
                  // value[input.name]=formElement.querySelector('input[name="'+input.name+'"]:checked').value
                  break;
                case 'file':
                  value[input.name] = input.files;
                  break;  
                default:
                  
                    value[input.name] = input.value;
                  
                  
              }
              return value;
            },
            {});
            options.onSubmit(formValues);
          }
          else {
            formElement.onsubmit();
          }
        }
      };
      options.rules.forEach(function (rule) {
        //lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test);
        } else {
          selectorRules[rule.selector] = [rule.test];
        }
  
        // console.log(rule.selector)
        var inputElements = formElement.querySelectorAll(rule.selector);
        Array.from(inputElements).forEach(function (inputElements) {
          inputElements.onblur = function () {
            validate(inputElements, rule);
          };
          //xử lí trường hợp blur khỏi blur
          inputElements.oninput = function () {
            var errorElement = getParent(
              inputElements,
              options.formGroupSelector
            ).querySelector(options.errorSelector);
            errorElement.innerText = "";
            inputElements.parentElement.classList.remove("invalid");
          };
        })
        // console.log(inputElement)
  
      });
      console.log(selectorRules);
    }
  }
  //định nghĩa các điều luật
  //bên trong đặt ra các nguyên tắt
  //1 khi có lổi thì trả ra thông báo lổi
  //2 khi không có lổi thì không trả gì cả
  Validator.isRequired = function (selector, message) {
  
    return {
      selector: selector,
      test: function (value) {
        return value ? undefined : message || "vui lòng nhập trường này";
      },
    };
  };
  Validator.isEmail = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : message || "vui lòng nhập email";
      },
    };
  };
  Validator.isMathietbi = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        var regex = /^tb\d+/;
        return regex.test(value) ? undefined : message || "vui lòng nhập mã thiết bị";
      },
    };
  };
  Validator.minLength = function (selector, min, message) {
    return {
      selector: selector,
      test: function (value) {
        return value.length >= min
          ? undefined
          : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
      },
    };
  };
  Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
      selector: selector,
      test: function (value) {
        return value === getConfirmValue()
          ? undefined
          : message || "giá trị nhập vào không chính xác";
      },
    };
  };
  