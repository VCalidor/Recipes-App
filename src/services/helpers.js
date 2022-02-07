export const setLocalIterable = (key, iterable) => (
  localStorage.setItem(key, JSON.stringify(iterable)));

export const getLocalIterable = (key) => (
  JSON.parse(localStorage.getItem(key))
);
