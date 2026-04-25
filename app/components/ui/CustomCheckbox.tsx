interface CustomCheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onChange: () => void
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  indeterminate = false,
  onChange,
}) => {
  return (
    <div
      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center cursor-pointer
        ${checked || indeterminate ? 'bg-green' : 'bg-form border-border'}`}
      onClick={onChange}
    >
      {indeterminate ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      )}
    </div>
  )
}
