import React from 'react'
import Image from 'next/image'


type HistoryFormProps = {
    icon: string;
    device: string;
    status?: boolean;
    border?: boolean;
}
export const HistoryForm: React.FC<HistoryFormProps> = ({ icon, device, status=false, border=true }) => {
  return (
    <div className={` flex items-center justify-between  ${border ? 'border-b border-border' : ''} py-[15px] gap-[12px] `}>
          <div className="h-[42px] w-[42px] flex items-center justify-center shrink-0 rounded-[21px]  bg-border">
            <Image src={icon} width={20} height={20} alt="icon" />
          </div>
          <div className=" w-full">
            <h5 className="font-semibold text-[18px]">{device}</h5>
            <p className="text-text-muted font-medium">2 hours ago</p>
          </div>
          <div className="">
            <p className={`font-semibold text-[14px] lg:whitespace-nowrap ${status ? '' : 'invisible'}`} >Current Session</p>
          </div>
        </div>
  )
}

