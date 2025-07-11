import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from '../atoms/Typography';
import { theme } from '../../constants/theme';
import { useTodayStore } from '../../store/useTodayStore';

interface DailyStreakCalendarOrganismProps {
  onDayPress?: (day: number) => void;
}

export const DailyStreakCalendarOrganism: React.FC<DailyStreakCalendarOrganismProps> = ({
  onDayPress,
}) => {
  const { streakDays, journeyCompleted, selectedDate, setSelectedDate, getReflectionForDate } = useTodayStore();
  
  // Get current date info
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Get first day of the month and number of days in the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  
  // Generate week around current day (show 7 days starting from 3 days before today)
  const startDay = Math.max(1, currentDay - 3);
  const endDay = Math.min(daysInMonth, startDay + 6);
  const weekDays = [];
  
  for (let day = startDay; day <= endDay; day++) {
    weekDays.push(day);
  }
  
  // Fill to always show 7 days if possible
  while (weekDays.length < 7 && weekDays[0] > 1) {
    weekDays.unshift(weekDays[0] - 1);
  }
  while (weekDays.length < 7 && weekDays[weekDays.length - 1] < daysInMonth) {
    weekDays.push(weekDays[weekDays.length - 1] + 1);
  }
  
  // Day names
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const getDayOfWeek = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.getDay();
  };
  
  const isDayCompleted = (day: number) => streakDays.includes(day);
  const isToday = (day: number) => day === currentDay;
  const isTodayCompleted = journeyCompleted && isToday(currentDay);
  
  // Get selected day (if null, default to today)
  const getSelectedDay = () => {
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      if (selectedDateObj.getMonth() === currentMonth && selectedDateObj.getFullYear() === currentYear) {
        return selectedDateObj.getDate();
      }
    }
    return null; // No selection or selected date is not in current month
  };
  
  const selectedDay = getSelectedDay();
  const isSelected = (day: number) => selectedDay === day;
  
  const handleDayPress = (day: number) => {
    // Create date string for the selected day using local date formatting to avoid timezone issues
    const year = currentYear;
    const month = (currentMonth + 1).toString().padStart(2, '0'); // Month is 0-indexed, so add 1
    const dayStr = day.toString().padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    
    // If tapping today, clear selection (return to today view)
    if (day === currentDay) {
      setSelectedDate(null);
    } else {
      setSelectedDate(dateString);
    }
    
    // Call optional parent callback
    if (onDayPress) {
      onDayPress(day);
    }
  };
  
  const renderDay = (day: number) => {
    const dayOfWeek = getDayOfWeek(day);
    const completed = isDayCompleted(day);
    const today = isToday(day);
    const selected = isSelected(day);
    const todayCompleted = isTodayCompleted;
    // Create consistent date string for reflection lookup
    const year = currentYear;
    const month = (currentMonth + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const dateStringForReflection = `${year}-${month}-${dayStr}`;
    const hasReflection = getReflectionForDate(dateStringForReflection) !== null;
    
    return (
      <View key={day} style={styles.dayContainer}>
        <Typography
          variant="caption"
          color={theme.colors.textMuted}
          style={styles.dayName}
        >
          {dayNames[dayOfWeek]}
        </Typography>
        
        <TouchableOpacity
          style={[
            styles.dayCircle,
            completed && styles.dayCompleted,
            today && styles.dayToday,
            today && todayCompleted && styles.dayTodayCompleted,
            selected && !today && styles.daySelected,
            hasReflection && !completed && !today && styles.dayWithReflection,
          ]}
          onPress={() => handleDayPress(day)}
          activeOpacity={0.7}
        >
          <Typography
            variant="body"
            color={
              today && todayCompleted 
                ? theme.colors.textOnDark
                : selected && !today
                ? theme.colors.primary
                : completed 
                ? theme.colors.primary
                : today 
                ? theme.colors.primary
                : hasReflection
                ? theme.colors.primary
                : theme.colors.textSecondary
            }
            style={[
              styles.dayNumber,
              (completed || today || selected || hasReflection) && styles.dayNumberBold,
            ]}
          >
            {day}
          </Typography>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.containerWrapper}>
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9', '#FFFFFF']} // More subtle gradient like category cards
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.calendarHeader}>
          <Typography
            variant="title"
            color={theme.colors.textPrimary}
            style={styles.monthTitle}
          >
            {now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Typography>
          
          <View style={styles.streakInfo}>
            <View style={styles.streakDot} />
            <Typography
              variant="caption"
              color={theme.colors.textMuted}
              style={styles.streakText}
            >
              {streakDays.length} day{streakDays.length !== 1 ? 's' : ''} this month
            </Typography>
          </View>
        </View>
        
        <View style={styles.weekContainer}>
          {weekDays.map(renderDay)}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  container: {
    borderRadius: 20,
    padding: 24,
  },
  calendarHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  monthTitle: {
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
    fontSize: 18,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  streakText: {
    opacity: 0.8,
    fontWeight: '500',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dayName: {
    marginBottom: theme.spacing.xs,
    fontSize: 12,
    opacity: 0.7,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayCompleted: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
  },
  dayToday: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  dayTodayCompleted: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  daySelected: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    transform: [{ scale: 1.1 }], // Slightly larger for emphasis
  },
  dayWithReflection: {
    backgroundColor: 'rgba(60, 140, 126, 0.1)', // Very subtle primary background
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed', // Subtle indication of reflection availability
  },
  dayNumber: {
    fontSize: theme.fontSizes.body,
  },
  dayNumberBold: {
    fontWeight: '600',
  },
}); 