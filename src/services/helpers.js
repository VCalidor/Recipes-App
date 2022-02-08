export const setLocalIterable = (key, iterable) => (
  localStorage.setItem(key, JSON.stringify(iterable)));

export const getLocalIterable = (key) => (
  JSON.parse(localStorage.getItem(key))
);

export const getData = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;
  return dataAtual;
};
