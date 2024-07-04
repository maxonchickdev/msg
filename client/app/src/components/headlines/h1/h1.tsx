import style from './h1.module.css'

export const H1 = ({ content }: { content: string }) => {
  return <h1 className={style.h1}>{content}</h1>
}
