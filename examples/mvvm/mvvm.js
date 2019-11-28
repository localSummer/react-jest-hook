function Mvvm(options = {}) {
  this.$options = options;
  let data = this._data = this.$options.data;

  // 数据劫持
  observe(data);

  // 初始化computed,将this指向实例
  options.computed && initComputed.call(this);

  // this代理this._data
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    });
  }

  // 模板编译
  new Compile(options.el, this);

  // 所有事情处理好后执行mounted钩子函数
  options.mounted && options.mounted.call(this);
}

function observe(data) {
  if (!data || typeof data !== 'object') return; // 递归退出条件

  return new Observe(data);
}

function Observe(data) {
  for (let key in data) {
    let dep = new Dep();
    let val = data[key];
    observe(val); // val 是对象则深度递归
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target); // 将watcher添加到订阅事件中 [watcher]
        return val;
      },
      set(newVal) {
        if (val === newVal) return;
        val = newVal;
        observe(newVal);
        dep.notify(); // 让所有watcher的update方法执行即可
      }
    });
  }
}

function initComputed() {
  let vm = this;
  let computed = vm.$options.computed;
  // 得到的都是对象的key可以通过Object.keys转化为数组
  Object.keys(computed).forEach(key => { // key就是sum,noop
    Object.defineProperty(vm, key, {
      // 这里判断是computed里的key是对象还是函数
      // 如果是函数直接就会调get方法
      // 如果是对象的话，手动调一下get方法即可
      // 如：sum() {return this.a + this.b;},他们获取a和b的值就会调用get方法
      // 所以不需要new Watcher去监听变化了
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set() {}
    })
  });
}

function Compile(el, vm) {
  // 将el挂载在实例上方便调用
  vm.$el = document.querySelector(el);
  // 内存中进行模板内容替换
  let fragment = document.createDocumentFragment();

  let child = null;
  while (child = vm.$el.firstChild) {
    // 依次将 #app 下的第一个子节点移动到 fragment 中，直到#app 下没有子节点，此时 child 为 null，退出循环
    fragment.appendChild(child);
  }

  // 对el里面的内容进行替换
  function replace(frag) {
    // 将 NodeLists 转为数组方便操作
    Array.from(frag.childNodes).forEach(node => {
      let txt = node.textContent;
      let reg = /\{\{(.*?)\}\}/g;
      if (node.nodeType === 1) {
        // 元素节点
        let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
        Array.from(nodeAttr).forEach(attr => {
          let name = attr.name;
          let exp = attr.value;
          if (name.includes('v-')) {
            node.value = vm[exp]
          }
          // 监听变化
          new Watcher(vm, exp, (newVal) => {
            node.value = newVal;
          });

          node.addEventListener('input', e => {
            let newVal = e.target.value;
            // 相当于给exp赋了一个新值
            // 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
            vm[exp] = newVal;
          })
        });
      } else if (node.nodeType === 3 && reg.test(txt)) {
        // 文本节点
        function replaceTxt() {
          node.textContent = txt.replace(reg, (matched, placeholder) => {
            console.log('placeholder', placeholder); // 匹配到的分组 如：song, album.name, singer...
            new Watcher(vm, placeholder, replaceTxt); // 监听变化，进行匹配替换内容
            return placeholder.split('.').reduce((val, key) => {
              return val[key];
            }, vm);
          });
        };
        // 替换
        replaceTxt();
      }
      // 如果还有子节点，继续递归replace
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }

  // 替换内容
  replace(fragment);

  // 将替换后的文档碎片放入el中
  vm.$el.appendChild(fragment)
}

function Dep() {
  // 存放函数的事件池
  this.subs = [];
}

function isDistinctWatcher(watchers, sub) {
  return watchers.filter(watcher => watcher.exp === sub.exp && watcher.fn === sub.fn).length === 0;
}

Dep.prototype = {
  addSub(sub) {
    // 过滤掉重复的watcher
    if (isDistinctWatcher(this.subs, sub)) {
      this.subs.push(sub);
    }
  },
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

// 监听函数，通过Watcher这个类创建的实例，都拥有update方法
function Watcher(vm, exp, fn) {
  this.fn = fn; // 将fn放到实例上
  this.vm = vm;
  this.exp = exp;
  // 添加一个事件
  // 这里我们先定义一个属性
  Dep.target = this;
  this.exp.split('.').reduce((val, key) => val[key], vm); // 获取到this.a.b，默认就会调用get方法，get方法中将当前Watcher添加至Dep中
  Dep.target = null;
}

Watcher.prototype = {
  update() {
    // notify的时候值已经更改了
    // 再通过vm, exp来获取新的值
    let newVal = this.exp.split('.').reduce((val, key) => val[key], this.vm);
    this.fn(newVal);
  }
}