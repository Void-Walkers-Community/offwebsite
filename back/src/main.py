import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.core import supabase, team_id 
# from src.Admin import router as admin_router
import time
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(admin_router)

CTFTIME_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Path Logic: src/backend/ -> src/ -> root/
DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "ctf_database.json"))


@app.get("/Members")
def read_members():
    try:
        # FIX: Pass columns as a single comma-separated string
        res = supabase.table("mem_list").select("uName, category, description").execute()
        
        # FastAPI will automatically convert this list of dictionaries to JSON
        return res.data 
        
    except Exception as e:
        # If Supabase throws an error (e.g., table doesn't exist), return a clean 500 error
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/Achievements")
async def get_achievements():
    try:
        # Fetch only the 'data' column from the 'ctf_ranks' table
        response = supabase.table("ctf_ranks").select("data").execute()
        
        # Flatten the list of dicts: [{"data": {...}}, {"data": {...}}] -> [{...}, {...}]
        achievements = [row.get('data', {}) for row in response.data]
        
        return {
            "status": "success",
            "count": len(achievements),
            "data": achievements
        }
        
    except Exception as e:
        print(f"Error fetching achievements: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch achievements from database")
    
    
@app.get("/Events")
async def get_future_events():
    try:
        # Define the time window (from now until 30 days in the future)
        start_at = int(time.time())
        limit = 10
        
        url = f"https://ctftime.org/api/v1/events/?limit={limit}&start={start_at}"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=CTFTIME_HEADERS)
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Failed to fetch from CTFtime")
            
            events = response.json()
            return {
                "status": "success",
                "count": len(events),
                "events": events
            }
            
    except Exception as e:
        print(f"CTFtime API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
