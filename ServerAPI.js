import axios from 'axios'
const Cookie = require('js-cookie');

const emailCookie = Cookie.get('email')

function login(email, password) {
  return _patch("users/login/login_user/", {'email': email, 'password': password});
}

function loggedIn() {
  return _patch("");
}

function logout() {
  return _patch("users/id/logout_user/", {'email': emailCookie});
}

function setUserVerified() {
  return _patch("users/id/set_user_verified/", {'email': emailCookie});
}

function isUserValidForSale() {
  return _patch("users/id/user_valid_for_sale/", {'email': emailCookie});
}

function createUser(name, email, password, confirmPassword) {
  return _post("users/basic/", {'name': name, 'email': email, 
    'password': password, 'confirm_password': confirmPassword});
}

function deleteUser() {
  return _delete("users/id", {'email': emailCookie});
}

function resetUserPassword(email, newPassword) {
  return _patch("users/password/reset_password/", {'email': email, 'new_password': newPassword});
}

function changeUserPassword(oldPassword, newPassword) {
  return _patch("users/password/change_password/", {'email': emailCookie, 'old_password': 
    oldPassword, 'new_password': newPassword});
}

function getUserDevices() {
  return _patch("users/id/get_devices", {'email': emailCookie});
}

function getDeviceStore(deviceID) {
  return _patch("devices/id/store_data", {'email': emailCookie, 'device_id': deviceID});
}

function getDeviceInfo(deviceID) {
  return _patch("devices/id/info", {'email': emailCookie, 'device_id': deviceID});
}

function getDeviceData(deviceID) {
  return _patch("devices/id/data", {'email': emailCookie, 'device_id': deviceID});
}

function getDeviceProjects(deviceID) {
  return _patch("devices/id/projects", {'email': emailCookie, 'device_id': deviceID});
}

function startProject(url, deviceID) {
  return _patch("users/relational/start_project", {'email': emailCookie, 'device_id': deviceID, 'url': url});
}

function quitProject(url, deviceID) {
  return _patch("users/relational/quit_project", {'email': emailCookie, 'device_id': deviceID, 'url': url});
}

function suspendProject(url, deviceID) {
  return _patch("users/relational/suspend_project", {'email': emailCookie, 'device_id': deviceID, 'url': url});
}

function changeUsageTimes(deviceID, days, startTime, endTime) {
  return _patch("devices/usage/config_hours", {'email': emailCookie, 'device_id': deviceID,
    'days': days, 'start_time': startTime, 'end_time': endTime});
}

function changeCPUPercent(deviceID, percent) {
  return _patch("devices/usage/cpu_percent", {'email': emailCookie, 'device_id': deviceID,
    'percent': percent});
}

function changeCPUCores(deviceID, numCores) {
  return _patch("devices/usage/max_cpus", {'email': emailCookie, 'device_id': deviceID,
    'max_cpus': numCores});
}

function changeCPUOther(deviceID, otherPercent) {
  return _patch("devices/usage/cpu_other", {'email': emailCookie, 'device_id': deviceID,
    'other_percent': otherPercent});
}

function changeDiskPercent(deviceID, percent) {
  return _patch("devices/usage/disk_percent", {'email': emailCookie, 'device_id': deviceID,
    'percent': percent});
}

function changeRAMIdlePercent(deviceID, percent) {
  return _patch("devices/usage/ram_idle", {'email': emailCookie, 'device_id': deviceID,
    'percent': percent});
}

function changeRAMBusyPercent(deviceID, percent) {
  return _patch("devices/usage/ram_busy", {'email': emailCookie, 'device_id': deviceID,
    'percent': percent});
}

function changeNetworkDown(deviceID, kbps) {
  return _patch("devices/usage/network_down", {'email': emailCookie, 'device_id': deviceID,
    'kbps': kbps});
}

function changeNetworkUp(deviceID, kbps) {
  return _patch("devices/usage/network_up", {'email': emailCookie, 'device_id': deviceID,
    'kbps': kbps});
}

function runOnBatteries(deviceID, value) {
  return _patch("devices/preferences/run_on_batteries", {'email': emailCookie, 'device_id': deviceID,
    'value': value});
}

function runIfActive(deviceID, value) {
  return _patch("devices/preferences/run_if_active", {'email': emailCookie, 'device_id': deviceID,
    'value': value});
}

function useMemoryOnly(deviceID, value) {
  return _patch("devices/preferences/use_memory_only", {'email': emailCookie, 'device_id': deviceID,
    'value': value});
}

function quitTask(deviceID, taskName) {
  return _patch("devices/tasks/quit", {'email': emailCookie, 'device_id': deviceID,
    'task_name': taskName});
}

function toggleSuspendTask(deviceID, taskName) {
  return _patch("devices/tasks/suspend", {'email': emailCookie, 'device_id': deviceID,
    'task_name': taskName});
}


function _ajax(method, url, data, contentType, responseType) {
  if (contentType == null) {
    contentType = 'application/json';
  }

  return axios({
    url: url,
    method: method,
    headers: {'Content-Type': contentType},
    baseURL: 'http://127.0.0.1:8000/api/',
    data: data,
    timeout: 2000,
    auth: {
      username: 'apimaster@gmail.com',
      password: 'Api1@useR'
    },
  })
}

const _delete = _ajax.bind(null, 'DELETE');
const _get = _ajax.bind(null, 'GET');
const _patch = _ajax.bind(null, 'PATCH');
const _put = _ajax.bind(null, 'PUT');
const _post = _ajax.bind(null, 'POST');

export default {
  login: login,
  logout: logout,
  setUserVerified: setUserVerified,
  isUserValidForSale: isUserValidForSale,
  createUser: createUser, 
  deleteUser: deleteUser,
  resetUserPassword: resetUserPassword,
  changeUserPassword: changeUserPassword,
  getUserDevices: getUserDevices,
  getDeviceStore: getDeviceStore,
  getDeviceInfo: getDeviceInfo,
  getDeviceData: getDeviceData,
  getDeviceProjects: getDeviceProjects,
  startProject: startProject,
  quitProject: quitProject,
  changeUsageTimes: changeUsageTimes,
  changeCPUPercent: changeCPUPercent,
  changeCPUCores: changeCPUCores,
  changeCPUOther: changeCPUOther,
  changeDiskPercent: changeDiskPercent,
  changeRAMIdlePercent: changeRAMIdlePercent, 
  changeRAMBusyPercent: changeRAMBusyPercent,
  changeNetworkDown: changeNetworkDown,
  changeNetworkUp: changeNetworkUp,
  runOnBatteries: runOnBatteries,
  runIfActive: runIfActive,
  useMemoryOnly: useMemoryOnly,
  quitTask: quitTask, 
  toggleSuspendTask: toggleSuspendTask,
};