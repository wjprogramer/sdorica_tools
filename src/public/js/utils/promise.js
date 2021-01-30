// ref:
// https://stackoverflow.com/questions/31424561/wait-until-all-promises-complete-even-if-some-rejected

const reflect = p => p.then(v => ({v, status: "fulfilled" }),
                            e => ({e, status: "rejected" }));

// ref:
// https://blog.camel2243.com/2016/06/18/javascript-sleep%E5%87%BD%E6%95%B8%E5%AF%A6%E4%BD%9C/
async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}