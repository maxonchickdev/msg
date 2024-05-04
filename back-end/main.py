"""
back end
"""

from fastapi import FastAPI
from jwt import encode
from fastapi.middleware.cors import CORSMiddleware
from src.models import Auth_user, Login_user, ForgotPassword, CheckCode, NewPassword
from src.database import get_user_by_email, create_user, verify_loginning, check_if_code_exists, update_password
from src.email_handling import mail_submit

app = FastAPI()


origin = "http://localhost:5173/"

app.add_middleware(
	CORSMiddleware,
	allow_origins=origin,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

@app.post("/api/auth/")
async def create_user(user: Auth_user):
	"""
	Define user endpoint
	"""
	db_user = await get_user_by_email(user.email)
	if db_user[0]:
		raise HTTPException(status_code=200, detail="User with this email exists")
	status = await create_user(user)
	return {"detail": str(status)}

@app.post("/api/login/")
async def login_user(user: Login_user):
	"""
	Logining user endpoint
	"""
	is_loginning = await verify_loginning(user)
	if isinstance(is_loginning, _models.Auth_user):
		hash_password = encode({"password": user.password}, "secret", algorithm="HS256")
		if hash_password == is_loginning.password:
			return {'detail': {'name': is_loginning.name, 'email': is_loginning.email, 'redirect': True}}
		else:
			raise _fastapi.HTTPException(status_code=200, detail="Password incorrect")
	else:
		raise _fastapi.HTTPException(status_code=200, detail="User with this email not found")

@app.post("/api/password/")
async def forgot_password(data: ForgotPassword):
	"""
	Forgot password endpoint
	"""
	is_loginning = await get_user_by_email(data.email)
	if is_loginning[0]:
		send_response = await mail_submit(data.email)
		if send_response:
			raise HTTPException(status_code=200, detail="Letter send successfully")
		raise HTTPException(status_code=200, detail="User with this email not found")
	raise HTTPException(status_code=200, detail="User with this email not found")

@app.post("/api/code/")
async def check_code(data: CheckCode):
	"""
	Chaeck code in mail endpoint
	"""
	is_code_correct = await check_if_code_exists(data.code)
	if is_code_correct:
		raise HTTPException(status_code=200, detail="Code correct")
	raise HTTPException(status_code=200, detail="Code incorrect")

@app.post("/api/new-password/")
async def update_password(data: NewPassword):
	"""
	Update password endpoint
	"""
	if data.password != data.one_more_password:
		raise HTTPException(status_code=200, detail="Passwords must be equals")
	is_loginning = await get_user_by_email(data.email)
	if is_loginning[0]:
		await update_password(data.password, data.email)
		raise HTTPException(status_code=200, detail="Password updated successfully")
	raise HTTPException(status_code=200, detail="User with this email not found")
