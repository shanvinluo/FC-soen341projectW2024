from Google import Create_Service
import base64
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def sendMessage(message, gmail_to, context, pdf_data=None, pdf_filename=None):
    CLIENT_SECRET_FILE = 'client_secret.json'
    API_NAME = 'gmail'
    API_VERSION = 'v1'
    SCOPES = ['https://mail.google.com/']

    service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

    mimeMessage = MIMEMultipart()
    mimeMessage['to'] = gmail_to
    mimeMessage['subject'] = context
    mimeMessage.attach(MIMEText(message, 'plain'))

    # If PDF data is provided, attach it to the email
    if pdf_data:
        pdf_part = MIMEApplication(pdf_data)
        pdf_part.add_header('Content-Disposition', 'attachment', filename=pdf_filename)
        mimeMessage.attach(pdf_part)

    raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()

    message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()

if(__name__== "__main__"):
    sendMessage("hola","ataiskrv@gmail.com","good day")