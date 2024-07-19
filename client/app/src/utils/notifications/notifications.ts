import { StatusCodes } from '../../utils/status.codes/status.codes'

export const getNotifyIcon = (statusCode: number) => {
  return statusCode === StatusCodes.OK
    ? '✅'
    : statusCode === StatusCodes.CONFLICT
    ? '⚠️'
    : statusCode === StatusCodes.NOT_FOUND
    ? '⚠️'
    : statusCode === StatusCodes.NOT_CONFIRMED
    ? '⚠️'
    : '🚫'
}
