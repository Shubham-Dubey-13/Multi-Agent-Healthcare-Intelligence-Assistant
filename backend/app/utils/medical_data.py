SYMPTOM_TO_CONDITION = {
    "fever": ["Viral Infection", "Flu", "Dengue", "Malaria"],
    "headache": ["Migraine", "Tension Headache", "Sinusitis"],
    "cough": ["Common Cold", "Bronchitis", "Asthma", "Pneumonia"],
    "fatigue": ["Anemia", "Thyroid Disorder", "Depression", "Sleep Apnea"],
    "nausea": ["Food Poisoning", "Gastritis", "Migraine", "Pregnancy"]
}

CONDITION_TO_SPECIALIST = {
    "Viral Infection": "General Physician",
    "Flu": "General Physician",
    "Dengue": "Infectious Disease Specialist",
    "Malaria": "Infectious Disease Specialist",
    "Migraine": "Neurologist",
    "Tension Headache": "General Physician",
    "Sinusitis": "ENT Specialist",
    "Common Cold": "General Physician",
    "Bronchitis": "Pulmonologist",
    "Asthma": "Pulmonologist",
    "Pneumonia": "Pulmonologist",
    "Anemia": "Hematologist",
    "Thyroid Disorder": "Endocrinologist",
    "Depression": "Psychiatrist",
    "Sleep Apnea": "Sleep Specialist",
    "Food Poisoning": "Gastroenterologist",
    "Gastritis": "Gastroenterologist",
    "Pregnancy": "Obstetrician/Gynecologist"
}

COMMON_MEDICATIONS = [
    "Paracetamol", "Ibuprofen", "Amoxicillin", "Cetirizine", "Omeprazole", "Metformin"
]

MEDICAL_ABBREVIATIONS = {
    "BP": "Blood Pressure",
    "HR": "Heart Rate",
    "CBC": "Complete Blood Count",
    "BMI": "Body Mass Index",
    "RBC": "Red Blood Cells",
    "WBC": "White Blood Cells"
}

LAB_TEST_REFERENCE_RANGES = {
    "WBC": {"min": 4.5, "max": 11.0, "unit": "10^9/L"},
    "RBC": {"min": 4.5, "max": 5.9, "unit": "10^12/L"},
    "Hemoglobin": {"min": 13.5, "max": 17.5, "unit": "g/dL"},
    "Platelets": {"min": 150, "max": 450, "unit": "10^9/L"},
    "Glucose": {"min": 70, "max": 99, "unit": "mg/dL"},
    "Cholesterol": {"min": 125, "max": 200, "unit": "mg/dL"}
}
