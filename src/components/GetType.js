const GetType = type => {
  if (type === 0) {
    return "Site";
  }
  if (type === 1) {
    return "Region";
  }
  if (type === 2) {
    return "Project";
  }
  if (type === 3) {
    return "Team";
  }
  if (type === 4) {
    return "User";
  }
  if (type === 5) {
    return "Time Series";
  }
  return null;
};

export default GetType;
