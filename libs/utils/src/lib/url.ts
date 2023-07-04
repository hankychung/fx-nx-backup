
interface ParamsObj {
  [key: string]: string;
}
// 获取 url 参数
export function getSearch(): ParamsObj {
  const params: string = window.location.search;
  if (params && params.indexOf("?") > -1) {
    const _params: string = params.slice(1);
    const _paramsList: string[] = _params.split("&");
    const _listParams: string[][] = [];
    if (Array.isArray(_paramsList)) {
      for (const item of _paramsList) {
        _listParams.push(item.split("="));
      }

      const obj: ParamsObj = {};

      try {
        _listParams.forEach((p) => {
          if (p.length > 1) {
            obj[p[0]] = p[1];
          }
        });
      } catch (e) {
        console.log("obj错误", e);
      }

      console.log("obj", obj);
      return obj;
    }
    return {};
  }
  return {};
}
