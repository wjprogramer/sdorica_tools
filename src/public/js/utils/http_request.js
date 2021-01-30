// ref:
// https://stackoverflow.com/questions/247483/http-get-request-in-javascript
// https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest

async function httpGet(url) {
    return await makeRequest("GET", url);
}

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
              resolve(xhr.response);
          } else {
              reject({
                  status: this.status,
                  statusText: xhr.statusText
              });
          }
      };
      xhr.onerror = function () {
          reject({
              status: this.status,
              statusText: xhr.statusText
          });
      };
      xhr.send();
  });
}