(function () {
  'use strict';
  judeHideCom();
  
  document.onload = function() {
      initCom();
  };

  function judeHideCom() {
    //判断是否存在需要隐藏的组件
    if (window && window.PARAMSOBJ && window.PARAMSOBJ.hideComId) {
      if (window.PARAMSOBJ.hideComId.indexOf(',')) { //隐藏多个组件
        var ids = window.PARAMSOBJ.hideComId.split(',');
        for (var i = 0; i < ids.length; i++) {
          var el = getElementByComId(ids[i]);
          el.style.display = 'none';
        }
      } else {  //隐藏单个组件
        var el = getElementByComId(window.PARAMSOBJ.hideComId);
        el.style.display = 'none';
      }
    }
  }

  /**
   * 初始化获取参数逻辑
   */
  function initCom() {
    //判断是否存在锚点组件
    if (window && window.PARAMSOBJ && window.PARAMSOBJ.comId) {
      var el = getElementByComId(window.PARAMSOBJ.comId);
      //console.log(el.attributes.name.value);
      if (el) {
        var elTop = el.offsetTop;
        window.scrollTo(0, (elTop - 10));
        setTimeout(function () {
          addClass(el,'pulse');
          addClass(el,'animated');
          //addClass(el, 'v-enter');
        }, 2000);
        setTimeout(function () {
          removeClass(el,'pulse');
          removeClass(el,'animated');
          //removeClass(el, 'v-enter');
        }, 6000);
      }
    }
  }

  /**
   * 根据comID获取组件
   * @param comId
   * @returns {*}
   */
  function getElementByComId(comId) {
    var names = comId.split('%spl%'),
      name,
      doms,
      result;
    if (names.length < 2) {
      return;
    }
    name = names[0];
    setComId(name);
    doms = document.getElementsByName(name);
    for (var i = 0; i < doms.length; i++) {
      if (comId === doms[i].attributes.comId) {
        result = doms[i];
        break;
      }
    }
    return result;
  }

  /**
   * 设置组件comID属性
   * @param name
   */
  function setComId(name) {
    var coms = document.getElementsByName(name);
    if (coms.length > 0) {
      for (var i = 0; i < coms.length; i++) {
        coms[i].attributes.comId = name + '%spl%' + (i + 1);
      }
    }
  }

  function addClass(ele, cls) {
    //如果ele是nodeList,则递归执行
    if (ele.hasOwnProperty('length')) {
      for (var i = 0; i < ele.length; i++) {
        addClass(ele[i], cls);
      }
    } else {
      if (!hasClass(ele, cls)) {
        var classNames = trim(ele.className) + ' ' + cls;
        ele.className = classNames;
      }
    }
  }

  function removeClass(ele, cls) {
    //如果ele是nodeList,则递归执行
    if (ele.hasOwnProperty('length')) {
      for (var i = 0; i < ele.length; i++) {
        removeClass(ele[i], cls);
      }
    } else {
      if (typeof cls === 'undefined') {
        ele.className = '';
        return;
      }
      if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
      }
    }

  }

  function hasClass(ele, cls) {
    try {
      return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    } catch (e) {
      return false;
    }

  }

  function trim(str) {
    // 用正则表达式将前后空格
    // 用空字符串替代。
    return str.replace(/(^\s*)|(\s*$)/g, '');
  }
})();