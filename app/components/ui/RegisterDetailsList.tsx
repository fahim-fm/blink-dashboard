import React from 'react'
import Image from 'next/image'
type RegisterDetailsListProps = {
    User: string;
    title: string;
    name: string;
}

export const RegisterDetailsList: React.FC<RegisterDetailsListProps> = ({ User,title,name }) => {
  return (
       <div className="max-w-[296px] flex items-center gap-3">
                 <div className="rounded-[64px] bg-border  p-4 backdrop-blur-[8px] rounded-full">
                   <Image src={User} alt="User Icon" width={20} height={20} />
                 </div>
                 <div>
                   <h6 className="font-semibold text-[14px] text-text">
                     {title}
                   </h6>
                   <p className="text-text-muted font-semibold text-[14px]">
                     {name}
                   </p>
                 </div>
               </div>
  )
}

