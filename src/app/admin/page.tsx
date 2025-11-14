
'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import React, {useState} from 'react';

export default function AdminPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCurate = async () => {
    setLoading(true);
    try {
      // AI portfolio curation would go here
      console.log('Curating with prompt:', prompt);
      setPrompt('');
    } catch (error) {
      console.error('Failed to curate portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>AI Portfolio Curator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. 5 images of cinematic street photography"
            />
            <Button onClick={handleCurate} disabled={loading}>
              {loading ? 'Curating...' : 'Curate'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    