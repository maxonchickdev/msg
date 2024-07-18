import { Input } from '@nextui-org/input'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  IVerificationCode,
  ValidationFormProps
} from '../../utils/interfaces/interfaces'
import { ButtonColors, SubmitButton } from '../submit.button/submit.button'

export const ValidateCodeForm: FC<ValidationFormProps> = ({
  onSubmitCode,
  isLoading,
  isDisabled
}) => {
  const { handleSubmit, control } = useForm<IVerificationCode>({
    mode: 'onChange'
  })
  return (
    <form onSubmit={handleSubmit(onSubmitCode)} className='mt-5'>
      <Controller
        control={control}
        rules={{ required: true }}
        name='code'
        render={({ field: { value, onChange } }) => (
          <Input
            type='text'
            label='Validation code'
            placeholder='Enter code'
            defaultValue={value}
            onChange={onChange}
          />
        )}
      />
      <SubmitButton
        isLoading={isLoading}
        isDisabled={isDisabled}
        content='Submit'
        color={ButtonColors.Primary}
      />
    </form>
  )
}
