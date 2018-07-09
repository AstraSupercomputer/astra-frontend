import ActionConstants from 'constants/ActionConstants'
import Dispatcher from 'dispatcher/Dispatcher'

function action(action, args = {}) { 
  if (!action) {
    Dispatcher.dispatch({type: action.value, args: args});
    return;
  }
  action.method(Object.keys(args).map(key => args[key]))
  .then((response) => {
    Dispatcher.dispatch({
      type: action.value,
      response: response, // Response is a promise
      args: args,
    });
  });
}

function register(name, email) {
  action(ActionConstants.REGISTER, {name: name, email: email});
}

function loggedIn() {
  action(ActionConstants.LOGGED_IN);
}

function addUserData(name, newEmail, etherAddr) {
  action(ActionConstants.ADD_USER_DATA, {name: name, newEmail: newEmail,
    etherAddr: etherAddr});
}

function uploadPhoto(name, photo) {
  action(ActionConstants.UPLOAD_PHOTO, {photo: photo})
}

function logout() {
  action(ActionConstants.LOGOUT);
}

function deleteUser() {
  action(ActionConstants.DELETE_USER);
}

function sendResetPasswordEmail(email) {
  action(ActionConstants.RESET_PASSWORD_EMAIL, {email: email});
}

function resetPassword(email, newPassword, confirmNewPassword) {
  action(ActionConstants.RESET_PASSWORD, {email: email, newPassword: newPassword,
    confirmNewPassword: confirmNewPassword});
}

function changePassword(password, newPassword, confirmNewPassword) {
  action(ActionConstants.CHANGE_PASSWORD, {password: password, newPassword: newPassword,
    confirmNewPassword: confirmNewPassword});
}

function redirectDevices(deviceID) {
  action(ActionConstant.DEVICES, {deviceID: deviceID});
}

export default {
  register: register,
  loggedIn: loggedIn,
  addUserData: addUserData,
  uploadPhoto: uploadPhoto,
  deleteUser: deleteUser,
  sendResetPasswordEmail: sendResetPasswordEmail,
  resetPassword: resetPassword,
  changePassword: changePassword,
  logout: logout,
  redirectDevices: redirectDevices,
}
