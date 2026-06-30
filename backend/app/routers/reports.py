from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

@router.post("/generate-pdf")
async def generate_pdf():
    return {"message": "Mock PDF generated successfully", "url": "/uploads/mock_report.pdf"}

@router.get("/{user_id}")
async def get_reports(user_id: str):
    return [
        {"id": "rep_1", "title": "Monthly Health Summary", "date": "2026-06-01"},
        {"id": "rep_2", "title": "Cardiac Risk Assessment", "date": "2026-05-15"}
    ]
