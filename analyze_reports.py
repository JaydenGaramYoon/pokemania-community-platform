import json
import os

reports = [
    ('Admin', 'admin-report.json'),
    ('Auth', 'auth-report.json'),
    ('Favourites', 'favourites-report.json'),
    ('Game', 'game-report.json'),
    ('Profile', 'profile-report.json'),
    ('Public', 'public-report.json'),
    ('TalkTalk', 'talktalk-report.json'),
    ('User', 'user-report.json')
]

base_path = 'api/newman/reports'

print("API 이름 | 총 테스트 | 성공 | 실패 | 합격률(%)")
print("---------|-----------|------|------|----------")

for name, filename in reports:
    filepath = os.path.join(base_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Extract stats from run.stats
    stats = data['run']['stats']
    
    # Total tests = tests.total
    total = stats['tests']['total']
    
    # Failed tests = assertions.failed
    failed = stats['assertions']['failed']
    
    # Passed tests = total - failed
    passed = total - failed
    
    # Pass rate
    pass_rate = ((passed / total) * 100) if total > 0 else 0
    
    print(f"{name} | {total} | {passed} | {failed} | {pass_rate:.2f}%")
