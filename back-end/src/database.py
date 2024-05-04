"""
db
"""

from sqlite3 import Connection, connect, Cursor
from src.models import Auth_user, Login_user, ForgotPassword, CheckCode, NewPassword
from jwt import encode
from dotenv import load_dotenv
from typing import Union, Tuple
from os import environ

DATABASE_FILE = "./data/users.db"
load_dotenv()

def connect() -> Connection:
	"""
	Connect
	"""
	con = connect(DATABASE_FILE, check_same_thread=False)
	return con

def take_cursor(con: Connection) -> Cursor:
	"""
	Take a cursor
	"""
	cur = con.cursor()
	return cur

def disconnect(con: Connection) -> None:
	"""
	Disconnect
	"""
	con.close()

def create_table() -> None:
	"""
	Create table
	"""
	con = connect()
	cur = take_cursor(con)

	query = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, code TEXT);"
	cur.execute(query)
	con.commit()
	disconnect(con)

async def get_user_by_email(email: str) -> Tuple[any, list]:
	"""
	Get user by email
	"""
	con = connect()
	cur = take_cursor(con)

	query = "SELECT * FROM users;"
	cur.execute(query)
	rows = cur.fetchall()
	disconnect(con)
	print(rows)
	print('user', list(filter(lambda user: user[2] == email, rows)))
	return (any(filter(lambda user: user[2] == email, rows)), list(filter(lambda user: user[2] == email, rows)))

async def create_user(user: Auth_user) -> bool:
	"""
	Create user
	"""
	con = connect()
	cur = take_cursor(con)

	hash_password = encode({"password": user.password}, "secret", algorithm="HS256")

	user_obj = _models.Auth_user(name=user.name, email=user.email, password=hash_password)

	query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?);"
	cur.execute(query, (user_obj.name, user_obj.email, user_obj.password))
	con.commit()
	disconnect(con)
	return True

async def verify_loginning(user: Login_user) -> Union[Auth_user, bool]:
	"""
	Verify loginning
	"""
	con = connect()
	cur = take_cursor(con)

	query = "SELECT * FROM users;"
	cur.execute(query)
	con.commit()
	rows = cur.fetchall()
	disconnect(con)

	for row in rows:
		if user.email == row[2]:
			log_user = _models.Auth_user(name=row[1], email=row[2], password=row[3])
			return log_user
	
	return False

async def update_code(email: str, code: str) -> bool:
	"""
	Update check code
	"""
	con = connect()
	cur = take_cursor(con)

	email_state = await get_user_by_email(email)
	if email_state[0]:
		query = f"UPDATE users SET code = '{code}' WHERE email = '{email}';"
		cur.execute(query)
		con.commit()
		disconnect(con)
		return True
	return False

async def check_if_code_exists(code: str) -> bool:
	"""
	Check if code exists
	"""
	con = connect()
	cur = take_cursor(con)

	query = "SELECT * FROM users;"
	cur.execute(query)
	con.commit()
	rows = cur.fetchall()
	disconnect(con)

	for row in rows:
		if row[4] == code:
			return True
	return False

async def update_password(new_password: str, email: str) -> None:
	"""
	Update password function
	"""
	con = connect()
	cur = take_cursor(con)

	new_password = encode({"password": new_password}, environ.get('SECRET'), algorithm=f"{environ.get('ENCODING')}")

	query = f"UPDATE users SET password = '{new_password}' WHERE email = '{email}';"
	cur.execute(query)
	con.commit()
	disconnect(con)

if __name__ == "__main__":
  	create_table()
