import uuid
from datetime import datetime

def generate_uuid() -> str:
    return str(uuid.uuid4())

def format_datetime(dt: datetime = None) -> str:
    if dt is None:
        dt = datetime.utcnow()
    return dt.isoformat()

def sanitize_filename(filename: str) -> str:
    return "".join([c for c in filename if c.isalpha() or c.isdigit() or c in [' ', '.', '_', '-']]).rstrip()

def calculate_bmi(weight_kg: float, height_cm: float) -> float:
    if height_cm <= 0:
        return 0.0
    height_m = height_cm / 100.0
    return weight_kg / (height_m * height_m)

def calculate_age(date_of_birth: str) -> int:
    try:
        dob = datetime.fromisoformat(date_of_birth)
        today = datetime.utcnow()
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    except Exception:
        return 30
