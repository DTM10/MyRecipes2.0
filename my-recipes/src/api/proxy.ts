import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  try {
    const response = await fetch(url as string);
    const data = await response.body;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Content-Type',
      response.headers.get('content-type') || 'video/mp4' || 'video/m3u8'
    );
    res.setHeader('x-rapidapi-key', import.meta.env.VITE_RAPID_API_KEY);
    res.setHeader('x-rapidapi-host', 'tasty.p.rapidapi.com');

    if (data) {
      data.pipe(res);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the video' });
  }
};
