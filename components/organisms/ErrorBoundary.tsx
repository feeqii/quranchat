import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  title?: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            ⚠️ {this.props.title || 'Error'}
          </Text>
          <Text style={styles.errorMessage}>
            {this.state.error?.message || 'Something went wrong in this section'}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.danger + '20',
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    marginVertical: theme.spacing.sm,
  },
  errorTitle: {
    fontSize: theme.fontSizes.h3,
    fontWeight: 'bold',
    color: theme.colors.danger,
    marginBottom: theme.spacing.sm,
  },
  errorMessage: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
}); 