const onSaveTime = (time) => {
  const start = new Date(time);
  const end = new Date();
  const diff = (end - start) / 1000;
  const times = [
    { name: "years", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "weeks", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "days", milliSeconds: 60 * 60 * 24 },
    { name: "times", milliSeconds: 60 * 60 },
    { name: "mins", milliSeconds: 60 },
  ];
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);
    if (betweenTime > 0) {
      return `${betweenTime} ${value.name} ago`;
    }
  }
  return "now";
};

export default onSaveTime;
