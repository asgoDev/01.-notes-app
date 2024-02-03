export const getActualDate = () => {
  const date = new Date();
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es-VE", options);
};