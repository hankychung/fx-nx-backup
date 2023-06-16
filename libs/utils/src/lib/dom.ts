const getParentNode = (
  targetNode: HTMLElement,
  selector: string | HTMLElement
) => {
  let node: HTMLElement | null = targetNode
  let checkBingo: (node: HTMLElement) => boolean

  if (typeof selector === 'string') {
    switch (selector[0]) {
      case '#': {
        checkBingo = (n: HTMLElement) => `#${n.id}` === selector
        break
      }
      case '.': {
        checkBingo = (n: HTMLElement) =>
          n.classList.contains(selector.substr(1))
        break
      }
      default: {
        return null
      }
    }
  } else {
    checkBingo = (n: HTMLElement) => n === selector
  }

  while (node) {
    if (checkBingo(node)) {
      return node
    }

    node = node.parentElement
  }
  return null
}

/**
 * 判断是否为html标签
 * @param htmlStr
 * @returns boolean
 */
export function checkHtml(htmlStr: string) {
  const reg = /<[^>]+>/g

  return reg.test(htmlStr)
}

export { getParentNode }
