export declare global {
  var paymentEvents: ?Record<
    string,
    { write: (data: string) => void; end: () => void }
  >;
}
