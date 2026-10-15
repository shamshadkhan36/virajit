"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types";
import { getSessionToken } from "@/lib/session";

interface LockItem {
  id: string;
  productId: string;
  lockedUntil: string;
  secondsRemaining: number;
  product?: Product;
}

interface LockContextType {
  sessionToken: string;
  activeLocks: LockItem[];
  currentLockedProduct: Product | null;
  isCheckoutOpen: boolean;
  isLoadingLock: boolean;
  lockError: string | null;
  lockProduct: (product: Product) => Promise<boolean>;
  releaseLock: (productId: string) => Promise<boolean>;
  openCheckout: (product: Product) => void;
  closeCheckout: () => void;
  refreshLocks: () => Promise<void>;
  formatTime: (seconds: number) => string;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export const LockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string>("");
  const [activeLocks, setActiveLocks] = useState<LockItem[]>([]);
  const [currentLockedProduct, setCurrentLockedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isLoadingLock, setIsLoadingLock] = useState<boolean>(false);
  const [lockError, setLockError] = useState<string | null>(null);

  useEffect(() => {
    const token = getSessionToken();
    setSessionToken(token);
  }, []);

  const refreshLocks = useCallback(async () => {
    if (!sessionToken) return;
    try {
      const res = await fetch(`/api/stock/my-locks?sessionToken=${encodeURIComponent(sessionToken)}`);
      const data = await res.json();
      if (data.success) {
        setActiveLocks(data.locks || []);
      }
    } catch (err) {
      console.error("Error refreshing locks:", err);
    }
  }, [sessionToken]);

  // Initial fetch when session token is ready
  useEffect(() => {
    if (sessionToken) {
      refreshLocks();
    }
  }, [sessionToken, refreshLocks]);

  // Countdown timer ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocks((prevLocks) => {
        const updated = prevLocks
          .map((lock) => ({
            ...lock,
            secondsRemaining: Math.max(0, lock.secondsRemaining - 1),
          }))
          .filter((lock) => lock.secondsRemaining > 0);

        // If a lock expired just now
        if (prevLocks.length > updated.length) {
          // Re-fetch to sync
          refreshLocks();
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshLocks]);

  const lockProduct = async (product: Product): Promise<boolean> => {
    setIsLoadingLock(true);
    setLockError(null);

    try {
      const token = sessionToken || getSessionToken();
      const res = await fetch("/api/stock/lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          sessionToken: token,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setLockError(data.error || "Unable to reserve unit. It may be locked by another shopper.");
        setIsLoadingLock(false);
        return false;
      }

      // Successful lock
      await refreshLocks();
      setCurrentLockedProduct(product);
      setIsCheckoutOpen(true);
      setIsLoadingLock(false);
      return true;
    } catch (err: any) {
      setLockError(err.message || "Network error reserving product.");
      setIsLoadingLock(false);
      return false;
    }
  };

  const releaseLock = async (productId: string): Promise<boolean> => {
    try {
      const token = sessionToken || getSessionToken();
      await fetch("/api/stock/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          sessionToken: token,
        }),
      });

      setActiveLocks((prev) => prev.filter((l) => l.productId !== productId));
      if (currentLockedProduct?.id === productId) {
        setIsCheckoutOpen(false);
        setCurrentLockedProduct(null);
      }
      return true;
    } catch (err) {
      console.error("Error releasing lock:", err);
      return false;
    }
  };

  const openCheckout = (product: Product) => {
    setCurrentLockedProduct(product);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <LockContext.Provider
      value={{
        sessionToken,
        activeLocks,
        currentLockedProduct,
        isCheckoutOpen,
        isLoadingLock,
        lockError,
        lockProduct,
        releaseLock,
        openCheckout,
        closeCheckout,
        refreshLocks,
        formatTime,
      }}
    >
      {children}
    </LockContext.Provider>
  );
};

export const useStockLock = () => {
  const context = useContext(LockContext);
  if (!context) {
    throw new Error("useStockLock must be used within a LockProvider");
  }
  return context;
};
