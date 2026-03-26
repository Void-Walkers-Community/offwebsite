import json
import requests
import time
from datetime import datetime
from http.server import BaseHTTPRequestHandler
from supabase import create_client, Client

# Importing your credentials from core.py
from core import team_id, SUPABASE_URL, SUPABASE_KEY

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        headers = {'User-Agent': 'Vercel-CTF-Sync-Bot'}
        current_year = datetime.now().year
        
        # Check both 2025 and the current year
        years_to_check = [2025, current_year]
        to_upsert = []

        for year in years_to_check:
            res = requests.get(f"https://ctftime.org/api/v1/results/{year}/", headers=headers)
            
            if res.status_code == 200:
                results = res.json()
                
                for event_id, details in results.items():
                    for score in details.get("scores", []):
                        # Force string comparison
                        if str(score.get("team_id")) == str(team_id):
                            
                            event_name = f"CTF Event {event_id}" 
                            try:
                                ev_res = requests.get(f"https://ctftime.org/api/v1/events/{event_id}/", headers=headers)
                                if ev_res.status_code == 200:
                                    event_name = ev_res.json().get("title", event_name)
                                
                                # 0.5s delay to prevent Vercel/CTFTime from blocking the request
                                time.sleep(0.5) 
                            except Exception as e:
                                print(f"Could not fetch name for {event_id}: {e}")
                            
                            to_upsert.append({
                                "event_id": int(event_id),
                                "data": {
                                    "name": event_name,
                                    "rank": score.get("place"),
                                    "points": score.get("points")
                                }
                            })

        # Batch Upsert New Data
        if to_upsert:
            try:
                supabase.table("ctf_ranks").upsert(to_upsert).execute()
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(f"Upsert Error: {e}".encode())
                return

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({
            "status": "success", 
            "total_processed": len(to_upsert)
        }).encode())