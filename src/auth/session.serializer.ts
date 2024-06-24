import { PassportSerializer } from '@nestjs/passport'
import { IUserData } from 'src/interfaces/users.interfaces'

export class SessionSerializer extends PassportSerializer {
	serializeUser(user: IUserData, done: (err: Error, user: IUserData) => void): any {
		done(null, user)
	}

	deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
		done(null, payload)
	}
}