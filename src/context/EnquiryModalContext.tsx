"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { WhatsAppEnquiryModal } from "@/components/store/WhatsAppEnquiryModal";

interface EnquiryModalOptions {
  productName?: string;
  customMessage?: string;
}

interface EnquiryModalContextType {
  isOpen: boolean;
  productName: string;
  customMessage: string;
  openEnquiryModal: (options?: EnquiryModalOptions) => void;
  closeEnquiryModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const openEnquiryModal = (options?: EnquiryModalOptions) => {
    setProductName(options?.productName || "");
    setCustomMessage(options?.customMessage || "");
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryModalContext.Provider
      value={{
        isOpen,
        productName,
        customMessage,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
      <WhatsAppEnquiryModal
        isOpen={isOpen}
        productName={productName}
        customMessage={customMessage}
        onClose={closeEnquiryModal}
      />
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error("useEnquiryModal must be used within an EnquiryModalProvider");
  }
  return context;
}
