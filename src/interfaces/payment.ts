export type PaymentType = "Bank Transfer" | "Credit Card" | "EWallet";

export interface PaymentMethod {
  name: string;
  fee: number;
  type: PaymentType;
  percentageFee: number;
}

export interface ChargeTopupProps {
  name: string;
  email: string;
}

export type BankName = "BNI" | "BRI" | "BCA" | "MANDIRI" | "PERMATA";

export interface ChargeTopupViaBankProps extends ChargeTopupProps {
  bank: BankName;
}

export interface ChargeTopupViaEWalletProps extends ChargeTopupProps {
  provider: "Gopay" | "ShopeePay" | string;
}

export type TransactionType = "topup" | "payment" | "refund" | "settlement";

export type Currency = "IDR" | "USD";

export type PaymenType = "Bank Transfer" | "Credit Card" | "EWallet" | "Point";

export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancel"
  | "refund"
  | "settlement"
  | "deny"
  | "expire";
