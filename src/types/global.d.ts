export declare global {
  var subscribePaymentEvents: ?Record<string, globalEvents>;

  export type globalEvents = {
    write: (data: string) => void;
    end: () => void;
  };
}
