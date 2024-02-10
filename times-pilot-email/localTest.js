const { userInfo } = require('./index');

userInfo();

// Make sure the process exits after all async operations are completed:
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});