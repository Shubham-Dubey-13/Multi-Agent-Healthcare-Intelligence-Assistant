import os
try:
    from PIL import Image
    import pytesseract
except ImportError:
    pass

class OCRAgent:
    """Extracts text from medical documents."""
    
    def extract_text(self, image_path: str) -> str:
        try:
            image = Image.open(image_path)
            text = pytesseract.image_to_string(image)
            return text
        except Exception as e:
            # Mock fallback if OCR fails or is not installed properly
            print(f"OCR Error: {e}")
            return "MOCK EXTRACTED TEXT: \nPatient Name: John Doe\nTest: Complete Blood Count\nResult: WBC 7.5, RBC 4.8"
            
    def parse_prescription(self, text: str) -> dict:
        # Mock parser
        return {"medicines": ["Paracetamol 500mg"], "instructions": ["Take twice daily after meals"]}
        
    def parse_lab_report(self, text: str) -> dict:
        # Mock parser
        return {"tests": [{"name": "WBC", "value": "7.5", "unit": "10^9/L"}]}
