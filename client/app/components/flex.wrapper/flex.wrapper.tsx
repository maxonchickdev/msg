export const FlexWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center justify-between mb-3'>{children}</div>
  )
}
