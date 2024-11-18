"use client";
import React, {
  ReactNode,
  useEffect,
  useContext,
  useRef,
  createContext,
} from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  ConfigsStore,
  createConfigsStore,
  initConfigsStore,
} from "@/stores/config";
import { useStore } from "zustand";
import { User } from "@/types";

// Register the required chart.js elements
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

interface ChartJSProviderProps {
  children: ReactNode;
}

const ChartJSProvider: React.FC<ChartJSProviderProps> = ({ children }) => {
  useEffect(() => {
    // Optional: additional setup or global configuration for Chart.js
    // Example: ChartJS.defaults.plugins.tooltip.enabled = false;  // Disables tooltips globally
  }, []);

  return <>{children}</>;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QCProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export type ConfigsStoreApi = ReturnType<typeof createConfigsStore>;

export const ConfigsStoreContext = createContext<ConfigsStoreApi | undefined>(
  undefined
);

export interface ConfigsStoreProviderProps {
  children: ReactNode;
  user: User | null;
}

const ConfigsStoreProvider = ({
  children,
  user,
}: ConfigsStoreProviderProps) => {
  const storeRef = useRef<ConfigsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createConfigsStore(initConfigsStore());
  }

  storeRef.current.setState({
    user,
  });

  return (
    <ConfigsStoreContext.Provider value={storeRef.current}>
      {children}
    </ConfigsStoreContext.Provider>
  );
};

export const useConfigsStore = <T,>(
  selector: (store: ConfigsStore) => T
): T => {
  const configsStoreContext = useContext(ConfigsStoreContext);

  if (!configsStoreContext) {
    throw new Error(`useConfigsStore must be used within ConfigsStoreContext`);
  }

  return useStore(configsStoreContext, selector);
};

export { ChartJSProvider, QCProvider, ConfigsStoreProvider };
