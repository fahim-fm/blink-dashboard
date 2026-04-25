import type { Metadata } from 'next'
import { MainLayout, Card } from '@/app/components'

export const metadata: Metadata = {
  title: 'About Us | Next.js Starter Kit',
  description: 'Learn about Next.js Starter Kit - a comprehensive, modern web application framework built with React, Redux, and TypeScript for rapid development. Discover our mission, technology stack, and features.',
  keywords: ['about', 'Next.js', 'React', 'Redux', 'TypeScript', 'web development', 'starter kit', 'modern framework', 'developer tools'],
  authors: [{ name: 'Next.js Starter Kit Team' }],
  openGraph: {
    title: 'About Us - Next.js Starter Kit',
    description: 'Learn about Next.js Starter Kit - a comprehensive, modern web application framework built with React, Redux, and TypeScript.',
    type: 'website',
    siteName: 'Next.js Starter Kit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Next.js Starter Kit',
    description: 'Learn about Next.js Starter Kit - a comprehensive, modern web application framework.',
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
    canonical: '/about',
  },
}

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            Learn more about our Next.js 16 starter project
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Our Mission">
            <p className="text-gray-600 mb-4">
              We believe in creating modern, scalable web applications that are both 
              developer-friendly and user-centric. This starter template represents 
              our commitment to best practices and cutting-edge technology.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Modern development patterns
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Type-safe development
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Scalable architecture
              </li>
            </ul>
          </Card>

          <Card title="Technology Stack">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Frontend</h4>
                <p className="text-sm text-gray-600">Next.js 16, React 19, TypeScript</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Styling</h4>
                <p className="text-sm text-gray-600">Tailwind CSS, CSS Modules</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">State Management</h4>
                <p className="text-sm text-gray-600">Redux Toolkit, React Context</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Build Tools</h4>
                <p className="text-sm text-gray-600">Bun, ESLint, Prettier</p>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Features">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-blue-600 text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">Fast Development</h3>
              <p className="text-sm text-gray-600">
                Hot reloading, TypeScript support, and modern tooling for rapid development.
              </p>
            </div>
            <div className="text-center">
              <div className="text-green-600 text-3xl mb-2">📱</div>
              <h3 className="font-semibold mb-2">Responsive Design</h3>
              <p className="text-sm text-gray-600">
                Mobile-first approach with Tailwind CSS for beautiful, responsive layouts.
              </p>
            </div>
            <div className="text-center">
              <div className="text-purple-600 text-3xl mb-2">🔧</div>
              <h3 className="font-semibold mb-2">Developer Experience</h3>
              <p className="text-sm text-gray-600">
                Excellent DX with TypeScript, ESLint, and organized project structure.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}