'use strict';

const userForm = new UserForm();

// Авторизация
userForm.loginFormCallback = function(data) {
  ApiConnector.login(data, response => {
      if (response.success) {
          location.reload();
      } else { 
        userForm.setLoginErrorMessage(response.data);
      }
  });
}

// Регистрация
userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else { 
          userForm.setRegisterErrorMessage(response.data);
        }
    });
  }