"""
send mail handling
"""

from dotenv import load_dotenv
from ssl import create_default_context
from smtplib import SMTP_SSL
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import src.database as _databaseter
from string import digits, ascii_letters
from random import choice
from os import environ

load_dotenv()

MAIL_HOST = environ.get("MAIL_HOST")
MAIL_USERNAME = environ.get("MAIL_USERNAME")
MAIL_PASSWORD = environ.get("MAIL_PASSWORD")
MAIL_PORT = environ.get("MAIL_PORT")

async def generate_random_symbols():
  """
  Generate random code to reset password
  """
  symbols = _string.digits + _string.ascii_letters
  return ''.join(choice(symbols) for i in range(10))

async def mail_submit(to: str):
  """
  Mail submit handler
  """
  random_symbols = await generate_random_symbols()

  message = MIMEMultipart("alternative")
  message["Subject"] = "multipart test"
  message["From"] = MAIL_USERNAME
  message["To"] = to
  
  text = f"{random_symbols}"

  part1 = MIMEText(text, "plain")

  message.attach(part1)

  content = create_default_context()
  with SMTP_SSL(MAIL_HOST, MAIL_PORT, context=None) as server:
    server.login(MAIL_USERNAME, MAIL_PASSWORD)
    server.sendmail(MAIL_USERNAME, to, message.as_string())
    update_code_state = await _database.update_code(to, random_symbols)
    if update_code_state:
      return True

  return False
