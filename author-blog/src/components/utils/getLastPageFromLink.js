export const getLastPageFromLink = (link) => {
  const result = link.match(/_page=(\d{1,4})&_limit=\d{1,4}>; rel="last"/);
  return result ? result[1] : 1;
};
