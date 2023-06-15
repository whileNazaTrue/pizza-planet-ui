const showNotification = (alertSelector) => {
  let alert = $(alertSelector);
  alert.toggle();
  setTimeout(() => alert.toggle(), 5000);
};


export { showNotification };
