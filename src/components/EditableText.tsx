import type { ElementType } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (next: string) => void;
  isEditing: boolean;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  ariaLabel?: string;
}

export function EditableText({
  value,
  onChange,
  isEditing,
  as: Component = 'span',
  className = '',
  multiline = false,
  ariaLabel,
}: EditableTextProps) {
  if (!isEditing) {
    return <Component className={className}>{value}</Component>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel || 'Editable text'}
        rows={Math.max(2, Math.ceil(value.length / 55))}
        className={`w-full resize-y rounded-lg border border-[#E5C76B]/40 bg-[#0D1426]/80 px-3 py-2 text-inherit focus:border-[#E5C76B] focus:outline-none ${className}`}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel || 'Editable text'}
      className={`w-full rounded-lg border border-[#E5C76B]/40 bg-[#0D1426]/80 px-3 py-1 text-inherit focus:border-[#E5C76B] focus:outline-none ${className}`}
    />
  );
}
