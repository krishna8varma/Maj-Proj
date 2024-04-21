import os

# Specify the path to your service account key file
credentials_path = 'E:\kaam\coding_stuff\Maj-Proj\travel\backend\client_secret.json'

# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials_path

# Now the environment variable is set and can be used by Google client libraries

# Check if GOOGLE_APPLICATION_CREDENTIALS environment variable is set
credentials_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')

if credentials_path:
    print(f"GOOGLE_APPLICATION_CREDENTIALS is set to: {credentials_path}")
else:
    print("GOOGLE_APPLICATION_CREDENTIALS is not set.")
