import { StatusCodes } from '../../utils/status.codes/status.codes'

export const getNotifyIcon = (statusCode: number) => {
  return statusCode === StatusCodes.SUCCESSFUL_STATUS_CODE
    ? '✅'
    : statusCode ===
      (StatusCodes.CONFLICT_STATUS_CODE || StatusCodes.NOT_FOUND_STATUS_CODE)
    ? '⚠️'
    : '🚫'
}
