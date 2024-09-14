import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Button } from '@mui/material'
import { FC } from 'react'
import { ISignupSubmitButtonProps } from '../../SignupInterfaces/Signup.interfaces'

export const SignupFormSubmitButton: FC<ISignupSubmitButtonProps> = ({content}) => {
	return (
		<Button
        type="submit"
        fullWidth
        variant="outlined"
        endIcon={<KeyboardArrowUpIcon color="info" />}
      >
        {content}
      </Button>
	)
} 