import express, { Request, Response } from 'express';
import si from 'systeminformation';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

type StatsResponse = {
  memory: {
    total: number;
    used: number;
    free: number;
    usagePercent: string;
  };
  cpu: {
    load: string;
  };
  temperature: number | null;
};

app.get('/api/stats', async (_req: Request, res: Response<StatsResponse | { error: string }>) => {
  try {
    const mem = await si.mem();
    const cpu = await si.currentLoad();
    const temp = await si.cpuTemperature();

    const response: StatsResponse = {
      memory: {
        total: mem.total,
        used: mem.used,
        free: mem.free,
        usagePercent: ((mem.used / mem.total) * 100).toFixed(2),
      },
      cpu: {
        load: cpu.currentLoad.toFixed(2),
      },
      temperature: temp.main ?? null,
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});