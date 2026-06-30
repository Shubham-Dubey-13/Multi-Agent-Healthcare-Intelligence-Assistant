import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.config import settings

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Save file
    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {e}")
        
    return {
        "filename": file.filename,
        "extracted_text": "This is mock extracted text from the OCR pipeline.\nPatient Name: John Doe\nTest: Complete Blood Count\nHemoglobin: 13.5 g/dL",
        "analysis_result": {
            "type": "Lab Report",
            "entities": ["Hemoglobin", "Complete Blood Count"]
        }
    }
