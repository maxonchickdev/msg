import style from './flex.wrapper.module.css'

export const FlexWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.flex_wrapper}>{children}</div>
}
