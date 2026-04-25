'use client';

import { useState } from 'react';
import Image from 'next/image';
import { InputField } from '@/app/components';
import { Teli, User, Mail, Shield } from '@/app/utils/image/icon.image';

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

export const ProfileInfoForm: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: 'Administrator',
    phoneNumber: '+123456789000',
    email: 'habib@example.com',
    role: 'Super Admin',
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const inputFields = [
    {
      label: 'Full Name',
      icon: User,
      placeholder: 'Administrator',
      type: 'text' as const,
      value: formData.fullName,
      field: 'fullName' as keyof ProfileData,
    },
    {
      label: 'Phone Number',
      icon: Teli,
      placeholder: '+123456789000',
      type: 'text' as const,
      value: formData.phoneNumber,
      field: 'phoneNumber' as keyof ProfileData,
    },
    {
      label: 'Email Address',
      icon: Mail,
      placeholder: 'habib@example.com',
      type: 'email' as const,
      value: formData.email,
      field: 'email' as keyof ProfileData,
    },
    {
      label: 'Role',
      icon: Shield,
      placeholder: 'Super Admin',
      type: 'text' as const,
      value: formData.role,
      field: 'role' as keyof ProfileData,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
      {inputFields.map(({ label, icon, placeholder, type, value, field }) => (
        <div key={field} className="w-full">
          <InputField
            label={label}
            leftIcon={
              <Image
                src={icon}
                alt={label}
                width={20}
                height={20}
              />
            }
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
           
          />
        </div>
      ))}
    </div>
  );
};