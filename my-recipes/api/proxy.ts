// import type { VercelRequest, VercelResponse } from '@vercel/node';
// import fetch from 'node-fetch';

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   const { url } = req.query;

//   if (!url || Array.isArray(url)) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const response = await fetch(url, {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         // 'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
//         // 'x-rapidapi-host': 'tasty.p.rapidapi.com',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.statusText}`);
//     }

//     res.setHeader(
//       'Content-Type',
//       response.headers.get('content-type') || 'application/octet-stream'
//     );

//     response.body?.pipe(res);
//   } catch (error: unknown) {
//     res.status(500).json({ error });
//   }
// }

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;

  if (!url || Array.isArray(url)) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url as string, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    res.setHeader(
      'Content-Type',
      response.headers.get('content-type') || 'application/octet-stream'
    );

    response.body?.pipe(res);
  } catch (error: unknown) {
    res.status(500).json({ error });
  }
}
