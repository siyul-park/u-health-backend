function repeat(time, proc) {
  for (let i = 0; i < time; ++i) proc(i);
}

module.exports = repeat;
