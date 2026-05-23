import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  className?: string;
}

export const LucideIcon = ({ name, ...props }: IconProps) => {
  const Icon = (Icons as any)[name] || (Icons as any).CircleHelp || (Icons as any).HelpCircle || (Icons as any).Sparkles;
  if (!Icon) {
    return null;
  }
  return <Icon {...props} />;
};
