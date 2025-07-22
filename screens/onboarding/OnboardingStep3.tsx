import React, { useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop, Rect, G } from "react-native-svg";
import { theme } from "../../constants/theme";
import { OnboardingQuestionBlock } from "../../components/organisms/OnboardingQuestionBlock";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { Typography } from "../../components/atoms/Typography";
import { t } from "../../localization";
import { position, flexDirection, textAlign } from "../../utils/rtl";

export const OnboardingStep3: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const { width: screenWidth } = Dimensions.get('window');
  const chartWidth = screenWidth - 80; // Account for padding
  const chartHeight = 200;

  useEffect(() => {
    // Animate the chart in with a delay
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500); // Delay to let page load first

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, scaleAnim]);

  const handleContinue = () => {
    navigation.navigate("OnboardingStep4" as never);
  };

  // Create beautiful flowing curve - TRUE edge to edge
  const createBeautifulPath = () => {
    const startX = 0; // At the absolute edge
    const startY = chartHeight - 35; // Start lower for more drama
    const endX = chartWidth; // At the absolute edge
    const endY = 35; // End higher for more dramatic rise
    
    // Create a beautiful S-curve with multiple control points for organic flow
    const midX = chartWidth / 2;
    const midY = chartHeight / 2;
    
    // Control points for smooth, flowing curve - more dramatic sweep
    const cp1x = startX + (chartWidth * 0.3);
    const cp1y = startY - 5;
    const cp2x = midX - 50;
    const cp2y = midY + 20;
    const cp3x = midX + 50;
    const cp3y = midY - 30;
    const cp4x = endX - (chartWidth * 0.3);
    const cp4y = endY + 0;
    
    return `M ${startX} ${startY} 
            C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${midX} ${midY}
            C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${endX} ${endY}`;
  };

  // Create area fill path
  const createAreaPath = () => {
    const mainPath = createBeautifulPath();
    const startX = 0;
    const endX = chartWidth; // Absolute edge to edge
    const bottomY = chartHeight - 5; // Almost to the very bottom
    
    return `${mainPath} L ${endX} ${bottomY} L ${startX} ${bottomY} Z`;
  };

  // Generate random decorative dots along the curve
  const generateDecoativeDots = () => {
    const dots = [];
    const numDots = 12;
    
    for (let i = 0; i < numDots; i++) {
      const progress = (i + 1) / (numDots + 1); // 0 to 1
      const x = 0 + chartWidth * progress; // True edge to edge distribution
      
      // Calculate approximate Y position on curve (simplified)
      const baseY = chartHeight - 35 + (35 - (chartHeight - 35)) * progress;
      const curveOffset = Math.sin(progress * Math.PI) * 20; // Gentle curve effect
      const y = baseY - curveOffset;
      
      // Random variations
      const size = 2 + Math.random() * 3; // 2-5px radius
      const opacity = 0.3 + Math.random() * 0.4; // 0.3-0.7 opacity
      const offsetX = (Math.random() - 0.5) * 15; // Random X offset
      const offsetY = (Math.random() - 0.5) * 25; // Random Y offset
      
      dots.push({
        x: x + offsetX,
        y: y + offsetY,
        size,
        opacity,
        shape: Math.random() > 0.7 ? 'square' : 'circle' // 30% squares, 70% circles
      });
    }
    
    return dots;
  };

  const decorativeDots = generateDecoativeDots();

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t("faithBecomesADailyHabitWithYourWidget")}
        subtitle={t("visualizeHowConsistencyShapesYourSpiritualPath")}
        progress={30}
      >
        <View style={styles.content}>
          {/* Beautiful Animated Chart */}
          <Animated.View 
            style={[
              styles.chartContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            {/* Chart Area with Subtle Background */}
            <LinearGradient
              colors={[
                'rgba(248, 250, 249, 0.2)',
                'rgba(232, 244, 241, 0.2)',
                'rgba(217, 237, 231, 0.2)',
                'rgba(248, 250, 249, 0.2)'
              ]}
              locations={[0, 0.3, 0.7, 1]}
              style={styles.chartArea}
            >
              {/* Beautiful Flowing SVG */}
              <Svg width={chartWidth} height={chartHeight} style={styles.svg}>
                <Defs>
                  <SvgLinearGradient id="gentleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.15" />
                    <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0.02" />
                  </SvgLinearGradient>
                </Defs>
                
                {/* Subtle area fill */}
                <Path
                  d={createAreaPath()}
                  fill="url(#gentleGradient)"
                />
                
                {/* Beautiful flowing line */}
                <Path
                  d={createBeautifulPath()}
                  stroke={theme.colors.primary}
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
                
                {/* Simple start and end circles */}
                <Circle
                  cx="0"
                  cy={chartHeight - 35}
                  r="5"
                  fill={theme.colors.primary}
                  opacity="0.7"
                />
                <Circle
                  cx={chartWidth}
                  cy="35"
                  r="5"
                  fill={theme.colors.primary}
                  opacity="0.9"
                />
                
                {/* Decorative dots for visual appeal */}
                {decorativeDots.map((dot, index) => {
                  if (dot.shape === 'circle') {
                    return (
                      <Circle
                        key={index}
                        cx={dot.x}
                        cy={dot.y}
                        r={dot.size}
                        fill={theme.colors.primary}
                        opacity={dot.opacity}
                      />
                    );
                  } else {
                    return (
                      <G key={index}>
                        <Rect
                          x={dot.x - dot.size}
                          y={dot.y - dot.size}
                          width={dot.size * 2}
                          height={dot.size * 2}
                          fill={theme.colors.primary}
                          opacity={dot.opacity}
                          rx={dot.size * 0.3}
                        />
                      </G>
                    );
                  }
                })}
              </Svg>
            </LinearGradient>

            {/* Simple timeline labels */}
            <View style={styles.timelineLabels}>
              <Typography
                variant="small"
                color={theme.colors.textMuted}
                style={styles.startLabel}
              >
                Beginning
              </Typography>
              <Typography
                variant="small"
                color={theme.colors.textMuted}
                style={styles.endLabel}
              >
                Your Journey
              </Typography>
            </View>

            {/* Inspirational subtitle */}
            <Typography
              variant="caption"
              color={theme.colors.textMuted}
              align="center"
              style={styles.chartSubtitle}
            >
              GROWTH THROUGH CONSISTENCY
            </Typography>
          </Animated.View>

          {/* Inspirational Message */}
          <View style={styles.messageContainer}>
            <Typography variant="body" align="center" style={styles.message}>
              {t("premiumUserWillUnlockPersonalizedFeatures")}
            </Typography>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <PrimaryButton label={t("continue")} onPress={handleContinue} />
          </View>
        </View>
      </OnboardingQuestionBlock>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  chartContainer: {
    flex: 1,
    paddingVertical: theme.spacing.xl,
    alignItems: "center",
  },
  chartArea: {
    width: "100%",
    height: 200,
    borderRadius: theme.radii.xl,
    marginBottom: theme.spacing.lg,
    position: "relative",
    overflow: "hidden",
    ...theme.shadows.md,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  valueLabels: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  valueLabel: {
    position: "absolute",
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    ...theme.shadows.xs,
  },
  timelineLabels: {
    flexDirection: flexDirection(),
    justifyContent: "space-between",
    width: "90%",
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  startLabel: {
    textAlign: "left",
  },
  endLabel: {
    textAlign: "right",
  },
  chartSubtitle: {
    letterSpacing: 1.5,
    marginBottom: theme.spacing.lg,
    fontWeight: '600',
  },
  messageContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  message: {
    lineHeight: 24,
  },
  premium: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.textPrimary,
  },
  buttonContainer: {
    paddingBottom: theme.spacing.lg,
  },
});
