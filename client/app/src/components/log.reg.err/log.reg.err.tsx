import { IRegLogErr } from '../../interfaces/interfaces'
import style from './log.reg.err.module.css'

export const LogRegErr = ({ err }: { err: IRegLogErr }) => {
  return (
    <div className={style.wrapper}>
      <p className={style.err}>
        Status: <span className={style.res_content}>{err.statusCode}</span>
      </p>
      <p className={style.err}>
        Message: <span className={style.res_content}>{err.message}</span>
      </p>
    </div>
  )
}
