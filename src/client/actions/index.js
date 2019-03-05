import * as Types from './actionTypes';

export const activateLoginPage = () => ({
  type: Types.ACTIVATE_LOGIN_PAGE,
  isLoginActive: true
});

export const deactivateLoginPage = () => ({
  type: Types.DEACTIVATE_LOGIN_PAGE,
  isLoginActive: false
});
