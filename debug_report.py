import json
import os

filepath = 'api/newman/reports/admin-report.json'
with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Print all top-level keys
print("Top-level keys:", list(data.keys()))

# Print run keys if exists
if 'run' in data:
    print("\nKeys in 'run':", list(data['run'].keys()))
    
    # Check stats
    if 'stats' in data['run']:
        print("\nKeys in 'run.stats':", list(data['run']['stats'].keys()))
        print("\nStats object:")
        print(json.dumps(data['run']['stats'], indent=2)[:1000])
    
    # Check executions
    if 'executions' in data['run']:
        print("\nNumber of executions:", len(data['run']['executions']))
        if len(data['run']['executions']) > 0:
            print("Keys in first execution:", list(data['run']['executions'][0].keys()))
