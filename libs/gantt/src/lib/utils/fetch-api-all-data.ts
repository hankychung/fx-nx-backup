import { cloneDeep } from 'lodash'

/**
 * 获取列表接口返回的所有数据
 */
const fetchApiAllData = async (
  fetchClass: any, // 因为我们很多http请求都是包着个 class 的，所以需要把class传入。
  fetchFnName: any, // 上面class对应的请求
  params: {
    pageRecord?: number // 每次请求的数据量
    queryParams?: any // 列表接口的query参数
    responseHandler: (res: any) => void // 列表接口返回处理。在里面就可以获取到每次返回的列表数据
    // 列表处理完第一页的时候，有些需求需要首页拉取好了，就渲染出来，有此类需求的话，可以使用这个。
    // 不然的话优先仅使用 responseHandler 即可
    finishedFirstPageHandler?: (res: any) => void
    fullyLoaded?: () => void //完全加载取消loading
  }
) => {
  const {
    queryParams,
    pageRecord = 20,
    responseHandler,
    finishedFirstPageHandler,
    fullyLoaded
  } = params

  const page_record = pageRecord
  const page_number = 1
  let hasMore = true

  let query: any = {
    page_number,
    page_record
  }

  if (queryParams) {
    const cloneQuery = cloneDeep(queryParams)

    query = {
      ...query,
      ...cloneQuery
    }
  }

  do {
    console.log(query, queryParams)

    const result = await fetchClass[fetchFnName]({ ...query, ...queryParams })

    if (finishedFirstPageHandler) {
      if (query.page_number === 1) {
        finishedFirstPageHandler(result)
      } else {
        responseHandler(result)
      }
    } else {
      responseHandler(result)
    }

    query.page_number++

    if ((result.data && result.data.length !== page_record) || !result.data) {
      fullyLoaded && fullyLoaded()
      hasMore = false
    }
  } while (hasMore)
}

export default fetchApiAllData
