exports.getCurrentDate = () => {
  const today = new Date();

  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};

exports.repeatEveryMidnight = (callback) => {
  const now = new Date();
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const msToMidnight = night.getTime() - now.getTime();

  setTimeout(function () {
    callback();
    repeatEveryMidnight();
  }, msToMidnight);
};
