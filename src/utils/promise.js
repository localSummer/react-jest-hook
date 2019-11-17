fuction myPromise(constructor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onFullfilledArray = [];
  self.onRejectedArray = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
      self.onFullfilledArray.forEach(function (f) {
        f(self.value);
      });
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status === 'rejected';
      self.reason = reason;
      self.onRejectedArray.forEach(function (f) {
        f(self.reason)
      })
    }
  }

  // 捕获构造异常
  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  let promise2;
  switch (self.status) {
    case 'pending':
      promise2 = new myPromise(function (resolve, reject) {
        self.onFullfilledArray.push(function () {
          setTimeout(function () {
            try {
              let temple = onFullfilled(self.value)
              resolvePromise(temple)
            } catch (e) {
              reject(e)
            }
          })
        })
        self.onRejectedArray.push(function () {
          setTimeout(function () {
            try {
              let temple = onRejected(self.reason);
              resolvePromise(temple)
            } catch (e) {
              reject(e) // error catch
            }
          })
        });
      })
    case "resolved":
      promise2 = new myPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            let temple = onFullfilled(self.value);
            //将上次一then里面的方法传递进下一个Promise状态
            resolvePromise(temple);
          } catch (e) {
            reject(e); //error catch
          }
        })
      })
      break;
    case "rejected":
      promise2 = new myPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            let temple = onRejected(self.reason);
            //将then里面的方法传递到下一个Promise的状态里
            resolvePromise(temple);
          } catch (e) {
            reject(e);
          }
        })
      })
      break;
    default:
  }
  return promise2;
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    throw new TypeError("type error")
  }
  let isUsed;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        //是一个promise的情况
        then.call(x, function (y) {
          if (isUsed) return;
          isUsed = true;
          resolvePromise(promise, y, resolve, reject);
        }, function (e) {
          if (isUsed) return;
          isUsed = true;
          reject(e);
        })
      } else {
        //仅仅是一个函数或者是对象
        resolve(x)
      }
    } catch (e) {
      if (isUsed) return;
      isUsed = true;
      reject(e);
    }
  } else {
    //返回的基本类型，直接resolve
    resolve(x)
  }
}