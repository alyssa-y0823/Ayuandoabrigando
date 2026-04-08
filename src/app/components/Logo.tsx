import { Recycle } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-2xl' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-3xl' }
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className={`${s.container} bg-green-600 rounded-full flex items-center justify-center`}>
        <Recycle className={`${s.icon} text-white`} />
      </div>
      {showText && (
        <div>
          <h1 className={`${s.text} font-bold text-gray-900`}>Technify</h1>
          <p className="text-sm text-gray-600">Ayudando Abrigando</p>
        </div>
      )}
    </div>
  );
}
