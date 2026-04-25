import type { Metadata } from 'next'
import React, { Suspense } from 'react';
import { MainLayout, Card } from '@/app/components';


export const metadata: Metadata = {
  title: 'Partial Prerendering Example | Next.js Starter Kit',
  description: 'Explore Next.js 16 Partial Prerendering (PPR) feature with this interactive example. Learn how to combine static shells with dynamic content streaming for optimal performance.',
  keywords: ['PPR', 'Partial Prerendering', 'Next.js 16', 'streaming', 'performance', 'cache components', 'dynamic content', 'static shell'],
  authors: [{ name: 'Next.js Starter Kit Team' }],
  openGraph: {
    title: 'Partial Prerendering Example - Next.js Starter Kit',
    description: 'Explore Next.js 16 Partial Prerendering (PPR) feature with this interactive example demonstrating static shells with dynamic content streaming.',
    type: 'website',
    siteName: 'Next.js Starter Kit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partial Prerendering Example - Next.js Starter Kit',
    description: 'Explore Next.js 16 Partial Prerendering (PPR) feature with this interactive example.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/ppr-example',
  },
}

type TimePayload = { data: { currentTime: string } };

const LoadingCard = () => (
  <Card title="Loading dynamic time...">
    <p>This dynamic region is loading and will stream in shortly.</p>
  </Card>
);

async function DynamicTime() {
  // Simulate a slow fetch to demonstrate Suspense streaming
  await new Promise((r) => setTimeout(r, 1200));

  const res = await fetch('/api/ppr-example/time', {
    next: {
      revalidate: 600, // time-based revalidation (seconds)
      tags: ['ppr-example-time'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch server time');
  }
  const data: TimePayload = await res.json();

  return (
    <Card title="Dynamic Server Time">
      <p>
        This content uses tag-based revalidation and streams into the static shell.
        Current server time:
      </p>
      <pre>{data.data.currentTime}</pre>
    </Card>
  );
}

export default async function PPRExamplePage() {
  return (
    <MainLayout>
      <Card title="Partial Prerendering Example">
        <p>
          This page demonstrates a static shell with a dynamic region using Next.js
          Partial Prerendering (PPR). The static shell is cached by Cache Components,
          while the dynamic region streams in after the shell using Suspense.
        </p>
      </Card>

      <Suspense fallback={<LoadingCard />}>
        <DynamicTime />
      </Suspense>
    </MainLayout>
  );
}