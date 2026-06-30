from app.utils.medical_data import LAB_TEST_REFERENCE_RANGES

def analyze_values(parsed_values: dict) -> dict:
    results = []
    for test in parsed_values.get("tests", []):
        name = test.get("name")
        val_str = test.get("value", "0")
        try:
            val = float(val_str)
        except:
            val = 0.0
            
        ref = LAB_TEST_REFERENCE_RANGES.get(name)
        status = "Normal"
        if ref:
            if val < ref["min"]: status = "Low"
            elif val > ref["max"]: status = "High"
            
        results.append({
            "name": name,
            "value": val_str,
            "status": status,
            "reference": f"{ref['min']} - {ref['max']} {ref['unit']}" if ref else "Unknown"
        })
        
    return {"analysis": results}
