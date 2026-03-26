import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Initialize everything once here
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
ADMIN_KEY = os.getenv("ADMIN_SECRET_KEY")
team_id=420523
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)