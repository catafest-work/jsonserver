import { spawn } from 'child_process';
const ls = spawn('cmd.exe', ['/c', 'dir']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
}); 

const command = spawn('json-server', ['--watch', 'db.json']);
command.on('error', (err) => {
  console.error(`Failed to start command: ${err}`);
});

command.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

command.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

command.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
command.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

command.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

command.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
