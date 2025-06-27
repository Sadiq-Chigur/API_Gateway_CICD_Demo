const fs = require('fs');
const path = require('path');

const resourceMap = JSON.parse(fs.readFileSync('resource-map.json', 'utf-8'));
const lambdaDir = path.join(__dirname, 'lambda');

const missingFiles = [];

for (const handler of Object.values(resourceMap)) {
  const [file] = handler.split('.');
  const filePath = path.join(lambdaDir, `${file}.js`);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(filePath);
  }
}

if (missingFiles.length) {
  console.error('❌ Missing Lambda handler files:');
  console.error(missingFiles.join('\n'));
  process.exit(1);
} else {
  console.log('✅ All Lambda handler files found.');
}


//Run it before cdk deploy:
//node validate-resource-map.js && npm run build && cdk deploy