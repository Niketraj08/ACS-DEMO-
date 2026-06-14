import * as Fa from 'react-icons/fa';
import * as Hi from 'react-icons/hi';
import * as Md from 'react-icons/md';

const iconMap = { ...Fa, ...Hi, ...Md };

export const DynamicIcon = ({ name, className = 'w-6 h-6', ...props }) => {
  const Icon = iconMap[name] || Fa.FaCode;
  return <Icon className={className} {...props} />;
};

export default DynamicIcon;
