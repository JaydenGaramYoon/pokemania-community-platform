import fs from 'fs';
import path from 'path';

const reports = [
    { name: 'Admin', file: 'admin-report.json' },
    { name: 'Auth', file: 'auth-report.json' },
    { name: 'Favourites', file: 'favourites-report.json' },
    { name: 'Game', file: 'game-report.json' },
    { name: 'Profile', file: 'profile-report.json' },
    { name: 'Public', file: 'public-report.json' },
    { name: 'TalkTalk', file: 'talktalk-report.json' },
    { name: 'User', file: 'user-report.json' }
];

const basePath = 'api/newman/reports';

console.log('API 이름 | 총 테스트 | 성공 | 실패 | 합격률(%)');
console.log('---------|-----------|------|------|----------');

reports.forEach(report => {
    const filePath = path.join(basePath, report.file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContent);
    const stats = json.run.stats;
    
    const total = stats.tests.total;
    const passed = stats.tests.passed;
    const failed = stats.tests.failed;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;
    
    console.log(`${report.name} | ${total} | ${passed} | ${failed} | ${passRate}%`);
});
