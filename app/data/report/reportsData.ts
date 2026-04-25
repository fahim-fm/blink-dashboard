// app/(pages)/(dashboard)/data/reportsData.ts
export type ReportCategory = 'profile' | 'chat' | 'match'
export type ReportStatus = 'pending' | 'resolved' | 'rejected'

export interface Report {
  id: string
  title: string
  category: ReportCategory
  status: ReportStatus
  reportedAt: string
  reportedBy: string
  reportedUser: string
  targetId?: string
}

const now = new Date()

export const reportsData: Report[] = [
  {
    id: 'rpt_001',
    title: 'Toxic Player',
    category: 'profile',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 5 * 60 * 1000).toISOString(),
    reportedBy: 'Rahim Uddin',
    reportedUser: 'John Doe',
    targetId: '101',
  },
  {
    id: 'rpt_002',
    title: 'Spam Account',
    category: 'chat',
    status: 'resolved',
    reportedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    reportedBy: 'Maria Lopez',
    reportedUser: 'SpamBot123',
    targetId: '102',
  },
  {
    id: 'rpt_003',
    title: 'Sexual Harassment',
    category: 'match',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Ali Hassan',
    reportedUser: 'PlayerXYZ',
    targetId: '103',
  },
  {
    id: 'rpt_004',
    title: 'Spam Bot',
    category: 'chat',
    status: 'resolved',
    reportedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Sarah Smith',
    reportedUser: 'BotAccount',
    targetId: '104',
  },
  {
    id: 'rpt_005',
    title: 'Fake User',
    category: 'profile',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Rahim Uddin',
    reportedUser: 'FakeUser99',
    targetId: '105',
  },
  {
    id: 'rpt_006',
    title: 'Abusive Language',
    category: 'chat',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
    reportedBy: 'Nusrat Jahan',
    reportedUser: 'AngryGamer',
    targetId: '106',
  },
  {
    id: 'rpt_007',
    title: 'Scam Attempt',
    category: 'profile',
    status: 'resolved',
    reportedAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
    reportedBy: 'Tanvir Ahmed',
    reportedUser: 'CryptoScammer',
    targetId: '107',
  },
  {
    id: 'rpt_008',
    title: 'Inappropriate Username',
    category: 'profile',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 90 * 60 * 1000).toISOString(),
    reportedBy: 'Ayesha Khan',
    reportedUser: 'BadName69',
    targetId: '108',
  },
  {
    id: 'rpt_009',
    title: 'Harassment in Match',
    category: 'match',
    status: 'resolved',
    reportedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Imran Hossain',
    reportedUser: 'ToxicPro',
    targetId: '109',
  },
  {
    id: 'rpt_010',
    title: 'Bot Activity',
    category: 'chat',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Farzana Akter',
    reportedUser: 'AutoReplyBot',
    targetId: '110',
  },
  {
    id: 'rpt_011',
    title: 'Fake Profile Photos',
    category: 'profile',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Shahidul Islam',
    reportedUser: 'CatfishUser',
    targetId: '111',
  },
  {
    id: 'rpt_012',
    title: 'Threatening Messages',
    category: 'chat',
    status: 'rejected',
    reportedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Laura Wilson',
    reportedUser: 'DarkKnight',
    targetId: '112',
  },
  {
    id: 'rpt_013',
    title: 'Match Fixing',
    category: 'match',
    status: 'pending',
    reportedAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Sabbir Rahman',
    reportedUser: 'WinTrader',
    targetId: '113',
  },
  {
    id: 'rpt_014',
    title: 'Impersonation',
    category: 'profile',
    status: 'resolved',
    reportedAt: new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Emily Brown',
    reportedUser: 'FakeAdmin',
    targetId: '114',
  },
  {
    id: 'rpt_015',
    title: 'Spam Links',
    category: 'chat',
    status: 'rejected',
    reportedAt: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Hasan Mahmud',
    reportedUser: 'LinkSpammer',
    targetId: '115',
  },
  {
    id: 'rpt_016',
    title: 'Offensive Content',
    category: 'profile',
    status: 'rejected',
    reportedAt: new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString(),
    reportedBy: 'Priya Sen',
    reportedUser: 'EdgyUser',
    targetId: '116',
  },
]
