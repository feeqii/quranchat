import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../constants/theme";
import { OnboardingQuestionBlock } from "../../components/organisms/OnboardingQuestionBlock";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { Typography } from "../../components/atoms/Typography";
import { t } from "../../localization";
import { position, flexDirection, textAlign } from "../../utils/rtl";

export const OnboardingStep3: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("OnboardingStep4" as never);
  };

  // Generate curve points for the faith growth chart
  const generateCurvePoints = () => {
    const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    const values = [20, 35, 30, 50, 60, 75, 85]; // Growth trajectory

    return months.map((month, index) => ({
      month,
      value: values[index],
      x: (index / (months.length - 1)) * 100, // Percentage across width
      y: 100 - values[index], // Invert Y for SVG coordinates
    }));
  };

  const curvePoints = generateCurvePoints();

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t("faithBecomesADailyHabitWithYourWidget")}
        subtitle={t("visualizeHowConsistencyShapesYourSpiritualPath")}
        progress={30}
      >
        <View style={styles.content}>
          {/* Chart Visualization */}
          <View style={styles.chartContainer}>
            <View style={styles.chartArea}>
              {/* Gradient background simulation */}
              <View style={styles.gradientBackground} />

              {/* Chart curve simulation */}
              <View style={styles.curveContainer}>
                {curvePoints.map((point, index) => (
                  <View
                    key={index}
                    style={[
                      styles.curvePoint,
                      {
                        left: `${point.x}%`,
                        bottom: `${point.value}%`,
                      },
                    ]}
                  />
                ))}
              </View>

              {/* Start and end markers */}
              <View style={[styles.marker, styles.startMarker]} />
              <View style={[styles.marker, styles.endMarker]} />
            </View>

            {/* Month labels */}
            <View style={styles.monthLabels}>
              {curvePoints.map((point, index) => (
                <Typography
                  key={index}
                  variant="small"
                  color={theme.colors.textMuted}
                  style={styles.monthLabel}
                >
                  {point.month}
                </Typography>
              ))}
            </View>

            {/* Chart subtitle */}
            <Typography
              variant="small"
              color={theme.colors.textMuted}
              align="center"
              style={styles.chartSubtitle}
            >
              {t("timeDevotedToScriptureAndStudy")}
            </Typography>
          </View>

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
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    marginBottom: theme.spacing.lg,
    position: "relative",
    overflow: "hidden",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    ...position(0),
    ...position(undefined, 0),
    bottom: 0,
    backgroundColor: theme.colors.primarySoft,
    opacity: 0.3,
  },
  curveContainer: {
    position: "absolute",
    top: 0,
    ...position(0),
    ...position(undefined, 0),
    bottom: 0,
  },
  curvePoint: {
    position: "absolute",
    width: 4,
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    transform: [{ translateX: -2 }, { translateY: 2 }],
  },
  marker: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  startMarker: {
    backgroundColor: theme.colors.primary,
    left: '2%',
    bottom: "20%",
  },
  endMarker: {
    backgroundColor: theme.colors.textPrimary,
    right: '2%',
    top: "15%",
  },
  monthLabels: {
    flexDirection: flexDirection(),
    justifyContent: "space-between",
    width: "90%",
    marginBottom: theme.spacing.md,
  },
  monthLabel: {
    textAlign: "center",
  },
  chartSubtitle: {
    letterSpacing: 1,
    marginBottom: theme.spacing.lg,
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
