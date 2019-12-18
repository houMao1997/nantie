function two(num) {
  return String(num).padStart(2, '0');
}
const formatDate = function (time,  type='date') {
  let date = new Date(time);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  return type == "date" ? y + '-' + two(m) + '-' + two(d) +' '+ two(h) + ':' + two(min):y + '-' + two(m) + '-' + two(d)
};
export default formatDate