import { Inquiry } from '@/app/types/inquiry'

export const inquiriesData: Inquiry[] = [
  {
    id: 'inq_001',
    title: 'Pricing details for subscription',
    contactEmail: 'alice@example.com',
    inquiryTime: '2025-12-28T10:15:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Alice Johnson',
    userId: 'user_001',
    phone: '+1234567890',
    messages: [
      { sender: 'user', message: 'Hi, can you explain the pricing plans?', timestamp: '2025-12-28T10:16:00Z' }
    ]
  },
  {
    id: 'inq_002',
    title: 'Feature request for dashboard',
    contactEmail: 'bob@example.com',
    inquiryTime: '2025-12-27T14:30:00Z',
    status: 'complete',
    resolvedTime: '2025-12-28T09:00:00Z',
    userName: 'Bob Smith',
    userId: 'user_002',
    phone: '+9876543210',
    messages: [
      { sender: 'user', message: 'It would be great if dashboard had charts', timestamp: '2025-12-27T14:35:00Z' },
      { sender: 'admin', message: 'Thanks for the suggestion! We will consider it', timestamp: '2025-12-27T15:00:00Z' }
    ]
  },
  {
    id: 'inq_003',
    title: 'Account access issue',
    contactEmail: 'carol@example.com',
    inquiryTime: '2025-12-29T08:45:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Carol Lee',
    userId: 'user_003',
    phone: '+1928374650',
    messages: [
      { sender: 'user', message: 'I am having trouble with my recent payment. The transaction was completed but I did not receive my diamonds. Could you please help me resolve this issue? My transaction ID is TXN-12345-ABC.', timestamp: '2025-12-29T08:50:00Z' }
    ]
  },
  {
    id: 'inq_004',
    title: 'Refund request for last payment',
    contactEmail: 'david@example.com',
    inquiryTime: '2025-12-26T09:20:00Z',
    status: 'complete',
    resolvedTime: '2025-12-27T11:00:00Z',
    userName: 'David Kim',
    userId: 'user_004',
    phone: '+1122334455',
    messages: [
      { sender: 'user', message: 'I need a refund for my last payment', timestamp: '2025-12-26T09:25:00Z' },
      { sender: 'admin', message: 'Refund has been processed', timestamp: '2025-12-27T10:50:00Z' }
    ]
  },
  {
    id: 'inq_005',
    title: 'Bug in notification settings',
    contactEmail: 'eva@example.com',
    inquiryTime: '2025-12-28T12:10:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Eva Green',
    userId: 'user_005',
    phone: '+5566778899',
    messages: [
      { sender: 'user', message: 'Notifications do not save after update', timestamp: '2025-12-28T12:15:00Z' }
    ]
  },
  {
    id: 'inq_006',
    title: 'Request for new report feature',
    contactEmail: 'frank@example.com',
    inquiryTime: '2025-12-25T16:00:00Z',
    status: 'complete',
    resolvedTime: '2025-12-26T08:30:00Z',
    userName: 'Frank Moore',
    userId: 'user_006',
    phone: '+9988776655',
    messages: [
      { sender: 'user', message: 'Can we have exportable PDF reports?', timestamp: '2025-12-25T16:05:00Z' },
      { sender: 'admin', message: 'Feature added to roadmap', timestamp: '2025-12-26T08:00:00Z' }
    ]
  },
  {
    id: 'inq_007',
    title: 'Login page not responsive on mobile',
    contactEmail: 'grace@example.com',
    inquiryTime: '2025-12-29T07:30:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Grace Liu',
    userId: 'user_007',
    phone: '+2233445566',
    messages: [
      { sender: 'user', message: 'Login page breaks on small screens', timestamp: '2025-12-29T07:35:00Z' }
    ]
  },
  {
    id: 'inq_008',
    title: 'Unable to upload profile picture',
    contactEmail: 'henry@example.com',
    inquiryTime: '2025-12-28T14:50:00Z',
    status: 'complete',
    resolvedTime: '2025-12-29T09:00:00Z',
    userName: 'Henry Adams',
    userId: 'user_008',
    phone: '+6677889900',
    messages: [
      { sender: 'user', message: 'Profile picture upload fails', timestamp: '2025-12-28T14:55:00Z' },
      { sender: 'admin', message: 'Issue fixed, please try again', timestamp: '2025-12-29T08:50:00Z' }
    ]
  },
  {
    id: 'inq_009',
    title: 'Payment confirmation email not received',
    contactEmail: 'isabella@example.com',
    inquiryTime: '2025-12-27T11:20:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Isabella Young',
    userId: 'user_009',
    phone: '+3344556677',
    messages: [
      { sender: 'user', message: 'I did not get payment confirmation', timestamp: '2025-12-27T11:25:00Z' }
    ]
  },
  {
    id: 'inq_010',
    title: 'Feature suggestion: dark mode',
    contactEmail: 'jack@example.com',
    inquiryTime: '2025-12-26T15:45:00Z',
    status: 'complete',
    resolvedTime: '2025-12-27T10:15:00Z',
    userName: 'Jack Brown',
    userId: 'user_010',
    phone: '+7788990011',
    messages: [
      { sender: 'user', message: 'It would be great to have dark mode', timestamp: '2025-12-26T15:50:00Z' },
      { sender: 'admin', message: 'Dark mode implemented', timestamp: '2025-12-27T10:00:00Z' }
    ]
  },
  {
    id: 'inq_011',
    title: 'Issue with two-factor authentication',
    contactEmail: 'karen@example.com',
    inquiryTime: '2025-12-30T09:15:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Karen White',
    userId: 'user_011',
    phone: '+1010101010',
    messages: [
      { sender: 'user', message: 'I cannot receive 2FA codes on my phone', timestamp: '2025-12-30T09:16:00Z' }
    ]
  },
  {
    id: 'inq_012',
    title: 'Request to change registered email',
    contactEmail: 'leo@example.com',
    inquiryTime: '2025-12-29T13:40:00Z',
    status: 'complete',
    resolvedTime: '2025-12-30T10:00:00Z',
    userName: 'Leo Martin',
    userId: 'user_012',
    phone: '+2020202020',
    messages: [
      { sender: 'user', message: 'I want to update my account email', timestamp: '2025-12-29T13:45:00Z' },
      { sender: 'admin', message: 'Your email has been updated successfully', timestamp: '2025-12-30T09:55:00Z' }
    ]
  },
  {
    id: 'inq_013',
    title: 'Unable to download invoice PDF',
    contactEmail: 'maria@example.com',
    inquiryTime: '2025-12-28T11:20:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Maria Gonzalez',
    userId: 'user_013',
    phone: '+3030303030',
    messages: [
      { sender: 'user', message: 'PDF invoice download fails', timestamp: '2025-12-28T11:25:00Z' }
    ]
  },
  {
    id: 'inq_014',
    title: 'Suggestion: add monthly summary report',
    contactEmail: 'nathan@example.com',
    inquiryTime: '2025-12-27T10:10:00Z',
    status: 'complete',
    resolvedTime: '2025-12-28T08:30:00Z',
    userName: 'Nathan Clark',
    userId: 'user_014',
    phone: '+4040404040',
    messages: [
      { sender: 'user', message: 'It would be nice to have a monthly summary report', timestamp: '2025-12-27T10:15:00Z' },
      { sender: 'admin', message: 'Feature added to the roadmap', timestamp: '2025-12-28T08:20:00Z' }
    ]
  },
  {
    id: 'inq_015',
    title: 'Account suspension explanation',
    contactEmail: 'olivia@example.com',
    inquiryTime: '2025-12-26T16:50:00Z',
    status: 'pending',
    resolvedTime: 'N/A',
    userName: 'Olivia Taylor',
    userId: 'user_015',
    phone: '+5050505050',
    messages: [
      { sender: 'user', message: 'I am having trouble with my recent payment. The transaction was completed but I did not receive my diamonds. Could you please help me resolve this issue? My transaction ID is TXN-12345-ABC.', timestamp: '2025-12-26T16:55:00Z' }
    ]
  }
]
