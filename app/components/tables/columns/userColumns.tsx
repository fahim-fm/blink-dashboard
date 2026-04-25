import Image from 'next/image'
import {
  Edit,
  Restore,
  Unavailable,
  View,
} from '@/app/utils/image/icon.image'
import Badge from '../../ui/Badge'
import { User } from '@/app/types/user'

export const userColumns = (
  usersLoading: boolean,
  onStatusChange: (id: number, status: 'Active' | 'Blocked') => void,
  onViewUser: (user: User) => void,
  onEditUser?: (user: User) => void 
) => [
  { key: 'id', header: 'ID' },
  { key: 'idCode', header: 'ID Code' },
  { key: 'name', header: 'User Name' },
  { key: 'email', header: 'Email' },
  { key: 'country', header: 'Country' },
  {
    key: 'status',
    header: 'Status',
    render: (user: User) =>
      user.status === 'Active' ? (
        <Badge status="active" className="w-[74px]" />
      ) : (
        <Badge status="blocked" className="w-[74px]" />
      ),
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (user: User) => (
      <div className="flex lg:gap-4 gap-2 items-center">
        {/* Block / Restore */}
        <button
          disabled={usersLoading}
          onClick={() =>
            onStatusChange(
              user.id,
              user.status === 'Active' ? 'Blocked' : 'Active'
            )
          }
          className="hover:opacity-80 transition disabled:opacity-50 shrink-0"
        >
          <Image
            src={user.status === 'Active' ? Unavailable : Restore}
            alt={user.status === 'Active' ? 'Block' : 'Restore'}
            className='h-[16px] w-[16px] md:h-[20px] md:w-[20px]'
            
          />
        </button>

        {/* View */}
        <button
          disabled={usersLoading}
          onClick={() => onViewUser(user)}
          className="hover:opacity-80 transition disabled:opacity-50 shrink-0"
        >
          <Image
            src={View}
            alt="View"
            className='h-[16px] w-[16px] md:h-[20px] md:w-[20px]'
            
          />
        </button>

        {/* Edit */}
        {onEditUser && (
          <button
            disabled={usersLoading}
            onClick={() => onEditUser(user)}
            className="hover:opacity-80 transition disabled:opacity-50 shrink-0"
          >
            <Image
              src={Edit}
              alt="Edit"
              className='h-[16px] w-[16px] md:h-[20px] md:w-[20px]'
              
            />
          </button>
        )}
      </div>
    ),
  },
]
