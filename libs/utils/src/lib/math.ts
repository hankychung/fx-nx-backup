import { isCN } from '@flyele-nx/i18n'

/**
 * 将数字转换为序数词
 * such as: 1： 1st
 */
export const convertToOrdinal = (num: number): string => {
  if (isCN) return num.toString()

  const lastDigit = num % 10
  const lastTwoDigits = num % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${num}th`
  }

  switch (lastDigit) {
    case 1:
      return `${num}st`
    case 2:
      return `${num}nd`
    case 3:
      return `${num}rd`
    default:
      return `${num}th`
  }
}
