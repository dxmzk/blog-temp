/**
 * Author: Meng
 * Date: 2024-01-20
 * Modify: 2024-01-20
 * Desc: 
 */

function encodeSearchParams(obj = {}) {
  const params = []
  for (const key in obj) {
    let value = obj[key];
    if (typeof value === 'undefined') {
      value = ''
    }
    params.push([key, encodeURIComponent(value)].join('='));
  }
  // Object.keys(obj).forEach((key) => {})

  return params.join('&');
}

function useRouter() {

  /**
   * 跳转页面
   * @param {*} path 
   * @param {*} obj 
   */
  function push(path = '', obj = {}) {
    const query = encodeSearchParams(obj);
    window.location.href = query ? `/${path}/index.html?${encodeSearchParams(obj)}` : `/${path}/index.html`;
  }

  /**
   * 替换页面
   * @param {*} path 
   * @param {*} obj 
   */
  function replace(path = '', obj = {}) {
    const query = encodeSearchParams(obj);
    const url = query ? `/${path}/index.html?${encodeSearchParams(obj)}` : `/${path}/index.html`;
    window.location.replace(url);
  }

  /**
   * 返回n层
   * @param {*} num 
   */
  function go(num = 1) {
    window.history.go(num);
  }

  // 返回
  function back() {
    window.history.go(-1);
  }

  /**
   * 获取所有参数
   * @returns 
   */
  function getParams() {
    const query = window.location.search.substring(1);
    const urlSearchParams = new URLSearchParams(query)
    const result = Object.fromEntries(urlSearchParams.entries())
    return result
  }

  /**
   * 获取参数
   * @param {*} variable 
   * @returns 
   */
  function getQuery(key) {
    return getParams()[key] || null;
  }

  return { push, getQuery, getParams, go, back, replace };
}

export default useRouter;