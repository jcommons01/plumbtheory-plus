// src/pages/api/report-question.ts

console.log('✅ Report-question API route loaded'); // <--- add this line at the top

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, reportText } = req.body;

  if (!question || !reportText) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await addDoc(collection(db, 'questionReports'), {
      question,
      reportText,
      createdAt: Timestamp.now(),
    });

    return res.status(200).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('❌ Firestore error:', error);
    return res.status(500).json({ error: 'Failed to submit report' });
  }
}
