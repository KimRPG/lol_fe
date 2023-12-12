const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// 경로로 들어오는 모든 url에 대해 root file 제공
app.get('*', (_, res) => {
	res.sendFile(path.join(__dirname, '/build/index.html'))
})

const PORT = 80;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // 정상동작 확인용 주석
});