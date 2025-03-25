import "server-only";
import BaseThirdPartyRequest from "@/libs/axios";

class MidtransClient extends BaseThirdPartyRequest {
  constructor() {
    super(process.env.MIDTRANS_CORE_API, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.MIDTRANS_SERVER_KEY
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });
  }

  public async cancelOrder(orderIdOrTransactionId: string) {
    return this.Mutation({
      method: "POST",
      url: `/v2/${orderIdOrTransactionId}/cancel`,
    });
  }
}

const midtransClient = new MidtransClient();

export default midtransClient;
