const fileRegArr: Array<[string, RegExp]> = [
  ['image', /(jpe?g|png|gif)$/gi],
  ['word', /(docx?)$/gi],
  ['excel', /(xlsx?)$/gi],
  ['ppt', /(pptx?)$/gi],
  ['pdf', /(pdf)$/gi],
  ['zip', /(zip)$/gi],
  ['unknown', /(unknown)$/gi]
]

export const getFileIcon = (
  name: string,
  iconType: 'light' | 'dark' | 'copyTask' = 'light'
) => {
  const baseUrl =
    'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/file'
  const dict = {
    light: `${baseUrl}/icon-`,
    dark: `${baseUrl}/load/`,
    copyTask: `${baseUrl}/copyTask/`
  }

  const type =
    fileRegArr.find(([_type, reg]) => new RegExp(reg).test(name))?.[0] ??
    'unknown'

  return `${dict[iconType]}${type}.png`
}
