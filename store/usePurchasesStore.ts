import Purchases, { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAnalyticsStore } from './useAnalyticsStore';

interface PurchasesState {
  offering?: PurchasesOffering;
  weeklyPackage?: PurchasesPackage;
  isEntitled: boolean;
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  purchaseWeekly: () => Promise<void>;
  restorePurchases: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsEntitled: (isEntitled: boolean) => void;
}

export const usePurchasesStore = create<PurchasesState>()(
  persist(
    (set, get) => ({
      isEntitled: false,
      loading: false,
      error: null,

      initialize: async () => {
        try {
          set({ loading: true, error: null });
          
          // 1) Configure with your public SDK key
          const revenueKey = process.env.REVENUECAT_API_KEY || 'appl_oUhTbIgXkHgruNDqkfdAgmlZVbI';
          await Purchases.configure({ apiKey: revenueKey });
          
          // 2) Fetch offerings and select your weekly plan
          const offerings = await Purchases.getOfferings();
          console.log('RevenueCat Offerings:', offerings);
          
          // Try to get the current offering or specific offering
          let offering = offerings.current;
          if (!offering && offerings.all) {
            offering = offerings.all['quranchat_weekly_sub'] || Object.values(offerings.all)[0];
          }
          
          console.log('Selected offering:', offering);
          
          // Find the weekly package
          let weeklyPackage = null;
          if (offering?.availablePackages) {
            weeklyPackage = offering.availablePackages.find(p => 
              p.identifier === '$rc_weekly' || 
              p.product.identifier === 'quranchat_weekly_sub'
            ) || offering.availablePackages[0];
          }
          
          console.log('Selected weekly package:', weeklyPackage);
          
          set({ offering, weeklyPackage });
          
          // 3) Check existing entitlement
          const customerInfo = await Purchases.getCustomerInfo();
          const isEntitled = !!customerInfo.entitlements.active['weekly_access'];
          
          // Log entitlement status
          if (isEntitled) {
            const { logEvent } = useAnalyticsStore.getState();
            logEvent({ name: 'subscription_entitlement_granted' });
          }
          
          set({ isEntitled, loading: false });
        } catch (error) {
          console.error('RevenueCat initialization error:', error);
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to initialize purchases' 
          });
        }
      },

      purchaseWeekly: async () => {
        try {
          set({ loading: true, error: null });
          
          const pkg = get().weeklyPackage;
          if (!pkg) {
            throw new Error('No weekly package found');
          }
          
          const { customerInfo } = await Purchases.purchasePackage(pkg);
          const isEntitled = !!customerInfo.entitlements.active['weekly_access'];
          
          set({ isEntitled, loading: false });
        } catch (error) {
          console.error('Purchase error:', error);
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to purchase subscription' 
          });
        }
      },

      restorePurchases: async () => {
        try {
          set({ loading: true, error: null });
          
          const customerInfo = await Purchases.restorePurchases();
          const isEntitled = !!customerInfo.entitlements.active['weekly_access'];
          
          // Log entitlement restoration
          if (isEntitled) {
            const { logEvent } = useAnalyticsStore.getState();
            logEvent({ name: 'subscription_entitlement_restored' });
          }
          
          set({ isEntitled, loading: false });
        } catch (error) {
          console.error('Restore purchases error:', error);
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to restore purchases' 
          });
        }
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setIsEntitled: (isEntitled) => set({ isEntitled }),
    }),
    {
      name: '@purchases_store',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => AsyncStorage.removeItem(name),
      },
      // Only persist the entitlement status, not the packages/offerings
      partialize: (state) => ({ isEntitled: state.isEntitled }),
    }
  )
); 