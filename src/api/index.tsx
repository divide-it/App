import express from 'express';

const app = express();

app.get('/api/timestamp', (req, res) =>
    res.json({
        timestamp: new Date().getTime(), //just a timestamp example boys =)
    }),
);

export default app;
