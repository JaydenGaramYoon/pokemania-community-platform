#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportsDir = 'api/newman/reports';
const results = {};

// 각 리포트 분석
if (fs.existsSync(reportsDir)) {
  fs.readdirSync(reportsDir)
    .filter(f => f.endsWith('-report.json'))
    .forEach(file => {
      const data = JSON.parse(fs.readFileSync(path.join(reportsDir, file), 'utf8'));
      const apiName = file.replace('-report.json', '');
      
      if (data.run && data.run.stats) {
        const stats = data.run.stats;
        const totalAssertions = stats.assertions?.total || 0;
        const failedAssertions = stats.assertions?.failed || 0;
        const passedAssertions = totalAssertions - failedAssertions;
        
        results[apiName] = {
          requests: stats.requests?.total || 0,
          passed: passedAssertions,
          failed: failedAssertions,
          total: totalAssertions,
          failures: (data.run.failures || []).length
        };
      }
    });
}

// 요약 생성
let totalPassed = 0;
let totalFailed = 0;
let tableRows = '';

Object.entries(results)
  .sort()
  .forEach(([api, result]) => {
    totalPassed += result.passed;
    totalFailed += result.failed;
    
    const passRate = result.total > 0 
      ? ((result.passed / result.total) * 100).toFixed(1) 
      : 'N/A';
    
    const status = result.failed === 0 ? 'PASS' : 'FAIL';
    
    tableRows += `| ${api.toUpperCase()} | ${result.requests} | ${result.passed}/${result.total} | ${passRate}% | ${status} |\n`;
  });

const summary = `## API Test Results Summary

**Last Updated:** ${new Date().toISOString()}

| API | Tests | Passed/Total | Pass Rate | Status |
|-----|-------|-------------|-----------|--------|
${tableRows}

**Overall:** ${totalPassed}/${totalPassed + totalFailed} tests passed (${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%)

[View Detailed Reports](../test-reports/)
`;

console.log(summary);

// 출력 파일에 쓰기
fs.writeFileSync('TEST_RESULTS.md', summary);
console.log('\n✅ Test summary saved to TEST_RESULTS.md');
