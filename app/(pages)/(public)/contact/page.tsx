import type { Metadata } from 'next'
import { MainLayout, Card, ContactForm } from '@/app/components'

export const metadata: Metadata = {
  title: 'Contact Us | Next.js Starter Kit',
  description: 'Get in touch with the Next.js Starter Kit team. Contact us for support, questions, or feedback about our modern web application framework. We are here to help you build amazing applications.',
  keywords: ['contact', 'support', 'help', 'feedback', 'get in touch', 'customer service', 'technical support', 'developer support'],
  authors: [{ name: 'Next.js Starter Kit Team' }],
  openGraph: {
    title: 'Contact Us - Next.js Starter Kit',
    description: 'Get in touch with the Next.js Starter Kit team for support and feedback about our modern web application framework.',
    type: 'website',
    siteName: 'Next.js Starter Kit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Next.js Starter Kit',
    description: 'Get in touch with the Next.js Starter Kit team for support and feedback.',
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
    canonical: '/contact',
  },
}

export default function Contact() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Send us a message">
            <ContactForm />
          </Card>

          <div className="space-y-6">
            <Card title="Contact Information">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">hello@nextjsstarter.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    123 Developer Street<br />
                    Code City, CC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </Card>

            <Card title="Office Hours">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}