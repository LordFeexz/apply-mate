export declare global {
  var paymentEvents: ?Record<string, globalEvents>;

  export type globalEvents = {
    write: (data: string) => void;
    end: () => void;
  };
}
