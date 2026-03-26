# from typing import Optional, Literal
# from pydantic import BaseModel, Field
# import httpx
# from github import Github
# from fastapi import APIRouter, HTTPException, Header, Depends
# from src.core import supabase, ADMIN_KEY

# # Define your enum for automatic validation
# CategoryEnum = Literal[
#     "osint", "binary_exp", "rev_engg", "web", "crypto", 
#     "forensics", "misc", "pwn", "recon", "stego","ai","blockchain","cloudsecurity","hardware","mobile",
#     "general skills","networking","ransomware"
# ]

# """   Under construction :Plan to additionally add GUI and little automation

# router = APIRouter(prefix="/Admin", tags=["Admin"])

# # Updated verification logic
# async def verify_admin(x_admin_key: str = Header(None)):
    
#     if ADMIN_KEY:  # Only enforce if a key actually exists in the config
#         if x_admin_key != ADMIN_KEY:
#             raise HTTPException(status_code=401, detail="Invalid Admin Key")
#     return True

# # ==========================================
# # DELETE ROUTE
# # ==========================================

# @router.delete("/Deletion/{identifier}")
# async def remove_member(identifier: str, _auth=Depends(verify_admin)):
#     try:
#         column = "id" if identifier.isdigit() else "uName"
#         val = int(identifier) if identifier.isdigit() else identifier

#         # 1. Perform the hard delete directly
#         delete_res = supabase.table("mem_list").delete().eq(column, val).execute()

#         # 2. If the data list is empty, the member never existed
#         if not delete_res.data:
#             raise HTTPException(
#                 status_code=404, 
#                 detail=f"No member found with {column}: {identifier}"
#             )

#         # 3. Return the success message and the data that was just destroyed
#         return {
#             "status": "success",
#             "message": f"Member '{identifier}' has been permanently deleted.",
#             "deleted_record": delete_res.data[0]
#         }
        
#     except HTTPException: 
#         raise
#     except Exception as e: 
#         raise HTTPException(status_code=500, detail=str(e))

# # ==========================================
# # UPDATE ROUTE
# # ==========================================
# class UpdateMemberSchema(BaseModel):
#     uName: Optional[str] = None
#     category: Optional[CategoryEnum] = None
#     description: Optional[str] = None
#     avatar_link: Optional[str] = Field(None, alias="avatar-link")

# @router.patch("/Update/{identifier}")
# async def update_member(identifier: str, data: UpdateMemberSchema, _auth=Depends(verify_admin)):
#     try:
#         column = "id" if identifier.isdigit() else "uName"
#         val = int(identifier) if identifier.isdigit() else identifier

#         update_data = data.model_dump(exclude_unset=True)
#         if "avatar_link" in update_data:
#             update_data["avatar-link"] = update_data.pop("avatar_link")

#         if not update_data:
#             raise HTTPException(status_code=400, detail="No update data provided")

#         res = supabase.table("mem_list").update(update_data).eq(column, val).execute()

#         if not res.data:
#             raise HTTPException(status_code=404, detail="Member not found")

#         return {
#             "status": "updated",
#             "matched_column": column,
#             "record": res.data[0] # Shows the data of the ID/uName entered
#         }
#     except HTTPException: raise
#     except Exception as e: raise HTTPException(status_code=500, detail=str(e))

# # ==========================================
# # CREATE ROUTE
# # ==========================================
# class CreateMemberSchema(BaseModel):
#     uName: str = Field(..., alias="Name") 
#     category: CategoryEnum = Field(..., alias="cate")
#     description: Optional[str] = Field(None, alias="desc")
#     avatar_link: Optional[str] = Field(None, alias="avatar-link")

# @router.post("/Create")
# async def create_member(data: CreateMemberSchema, _auth=Depends(verify_admin)):
#     try:
#         new_row = {
#             "uName": data.uName,
#             "category": data.category,
#             "description": data.description,
#             "avatar-link": data.avatar_link
#         }
#         res = supabase.table("mem_list").insert(new_row).execute()
#         return {"status": "created", "data": res.data[0]}
#     except HTTPException: raise
#     except Exception as e: raise HTTPException(status_code=400, detail=str(e))


# """
