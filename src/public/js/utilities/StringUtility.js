class StringUtility {}

StringUtility.isNothing = (str) => {
  if (str === "" || str === undefined || str === null) {
    return true;
  }
  return false;
}

StringUtility.getValuePreventNothing = (str, placeholder) => {
  if (StringUtility.isNothing(str)) {
    return placeholder || "-";
  }
  return str;
}