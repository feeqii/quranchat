import { I18nManager } from 'react-native';
import { getLocale } from '../localization';

/**
 * RTL utility functions for handling right-to-left layouts
 */

export const isRTL = (): boolean => {
  try {
    return getLocale() === 'ar' || I18nManager.isRTL;
  } catch (error) {
    // Fallback to I18nManager if getLocale fails during bundling
    return I18nManager.isRTL;
  }
};

export const forceRTL = (rtl: boolean): void => {
  I18nManager.forceRTL(rtl);
};

export const textAlign = (): 'left' | 'right' => {
  return isRTL() ? 'right' : 'left';
};

export const textAlignReverse = (): 'left' | 'right' => {
  return isRTL() ? 'left' : 'right';
};

export const flexDirection = (): 'row' | 'row-reverse' => {
  return isRTL() ? 'row-reverse' : 'row';
};

export const alignItems = (start: boolean = true): 'flex-start' | 'flex-end' => {
  if (start) {
    return isRTL() ? 'flex-end' : 'flex-start';
  } else {
    return isRTL() ? 'flex-start' : 'flex-end';
  }
};

export const transform = (translateX: number) => {
  return [{ translateX: isRTL() ? -translateX : translateX }];
};

export const marginHorizontal = (left: number, right: number = left) => {
  return isRTL() 
    ? { marginLeft: right, marginRight: left }
    : { marginLeft: left, marginRight: right };
};

export const paddingHorizontal = (left: number, right: number = left) => {
  return isRTL()
    ? { paddingLeft: right, paddingRight: left }
    : { paddingLeft: left, paddingRight: right };
};

export const position = (left?: number, right?: number) => {
  if (left !== undefined && right !== undefined) {
    return isRTL() ? { left: right, right: left } : { left, right };
  }
  if (left !== undefined) {
    return isRTL() ? { right: left } : { left };
  }
  if (right !== undefined) {
    return isRTL() ? { left: right } : { right };
  }
  return {};
};

// Icon direction helper
export const iconDirection = (iconName: string): string => {
  if (isRTL()) {
    if (iconName.includes('Left')) {
      return iconName.replace('Left', 'Right');
    }
    if (iconName.includes('Right')) {
      return iconName.replace('Right', 'Left');
    }
  }
  return iconName;
}; 