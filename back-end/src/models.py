"""
db models
"""

import pydantic as _pydantic

class Auth_user(_pydantic.BaseModel):
	"""
	Base Auth_user model
	"""
	name: str
	email: str
	password: str

class Login_user(_pydantic.BaseModel):
	"""
	Base Login_user model
	"""
	email: str
	password: str

class ForgotPassword(_pydantic.BaseModel):
	"""
	Base ForgotPassword model
	"""
	email: str

class CheckCode(_pydantic.BaseModel):
	"""
	Base CheckCode model
	"""
	code: str

class NewPassword(_pydantic.BaseModel):
	"""
	Base NewPassword model
	"""
	password: str
	one_more_password: str
	email: str
