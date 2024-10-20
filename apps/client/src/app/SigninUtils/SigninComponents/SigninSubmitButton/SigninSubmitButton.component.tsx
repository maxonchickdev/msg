import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Button } from '@mui/material'
import { FC } from 'react'
import { ISigninSubmitButtonProps } from '../../SigninInterfaces/Signin.interfaces'


export const SigninSubmitButton: FC<ISigninSubmitButtonProps> = ({content}) => {
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