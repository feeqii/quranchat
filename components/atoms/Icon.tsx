import React from 'react';
import {
  ArrowLeft,
  Send,
  Clock,
  Bookmark,
  BookOpen,
  RefreshCw,
  Clipboard,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Star,
  StarOff,
  Loader2,
  Home,
  User,
  Users,
  MessageSquare,
  MessageCircle,
  Menu,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Plus,
  Settings,
  Sparkles,
  Search,
  Heart,
  Calendar,
  Volume2,
  Edit,
  Crown,
  Gift,
  Bell,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  Brain,
  Smartphone,
} from 'lucide-react-native';
import { theme } from '../../constants/theme';

export interface IconProps {
  color?: string;
  size?: number;
  style?: any;
  fill?: string;
  strokeWidth?: number;
}

const defaultProps: IconProps = {
  color: theme.colors.textPrimary,
  size: 20,
};

export const Icon = {
  // Navigation
  Back: (props: IconProps) => <ArrowLeft {...defaultProps} {...props} />,
  ChevronRight: (props: IconProps) => <ChevronRight {...defaultProps} {...props} />,
  ChevronLeft: (props: IconProps) => <ChevronLeft {...defaultProps} {...props} />,
  Menu: (props: IconProps) => <Menu {...defaultProps} {...props} />,
  
  // Tab Bar
  Home: (props: IconProps) => <Home {...defaultProps} {...props} />,
  Chat: (props: IconProps) => <MessageSquare {...defaultProps} {...props} />,
  Bookmarks: (props: IconProps) => <Bookmark {...defaultProps} {...props} />,
  Profile: (props: IconProps) => <User {...defaultProps} {...props} />,
  Quran: (props: IconProps) => <BookOpen {...defaultProps} {...props} />,
  Today: (props: IconProps) => <Heart {...defaultProps} {...props} />,
  
  // Actions
  Send: (props: IconProps) => <Send {...defaultProps} {...props} />,
  History: (props: IconProps) => <Clock {...defaultProps} {...props} />,
  Refresh: (props: IconProps) => <RefreshCw {...defaultProps} {...props} />,
  RefreshCw: (props: IconProps) => <RefreshCw {...defaultProps} {...props} />,
  Copy: (props: IconProps) => <Clipboard {...defaultProps} {...props} />,
  Share: (props: IconProps) => <Share2 {...defaultProps} {...props} />,
  Share2: (props: IconProps) => <Share2 {...defaultProps} {...props} />,
  Like: (props: IconProps) => <ThumbsUp {...defaultProps} {...props} />,
  Dislike: (props: IconProps) => <ThumbsDown {...defaultProps} {...props} />,
  Star: (props: IconProps) => <Star {...defaultProps} {...props} />,
  StarOff: (props: IconProps) => <StarOff {...defaultProps} {...props} />,
  Settings: (props: IconProps) => <Settings {...defaultProps} {...props} />,
  BookOpen: (props: IconProps) => <BookOpen {...defaultProps} {...props} />,
  MessageCircle: (props: IconProps) => <MessageCircle {...defaultProps} {...props} />,
  MessageSquare: (props: IconProps) => <MessageSquare {...defaultProps} {...props} />,
  Sparkles: (props: IconProps) => <Sparkles {...defaultProps} {...props} />,
  Search: (props: IconProps) => <Search {...defaultProps} {...props} />,
  Calendar: (props: IconProps) => <Calendar {...defaultProps} {...props} />,
  Volume: (props: IconProps) => <Volume2 {...defaultProps} {...props} />,
  
  // Status
  Loading: (props: IconProps) => <Loader2 {...defaultProps} {...props} />,
  Check: (props: IconProps) => <Check {...defaultProps} {...props} />,
  Close: (props: IconProps) => <X {...defaultProps} {...props} />,
  Add: (props: IconProps) => <Plus {...defaultProps} {...props} />,
  
  // People
  Users: (props: IconProps) => <Users {...defaultProps} {...props} />,
  
  // Profile specific
  Edit: (props: IconProps) => <Edit {...defaultProps} {...props} />,
  Crown: (props: IconProps) => <Crown {...defaultProps} {...props} />,
  Gift: (props: IconProps) => <Gift {...defaultProps} {...props} />,
  Bell: (props: IconProps) => <Bell {...defaultProps} {...props} />,
  HelpCircle: (props: IconProps) => <HelpCircle {...defaultProps} {...props} />,
  FileText: (props: IconProps) => <FileText {...defaultProps} {...props} />,
  Shield: (props: IconProps) => <Shield {...defaultProps} {...props} />,
  LogOut: (props: IconProps) => <LogOut {...defaultProps} {...props} />,
  Brain: (props: IconProps) => <Brain {...defaultProps} {...props} />,
  Widget: (props: IconProps) => <Smartphone {...defaultProps} {...props} />,
}; 