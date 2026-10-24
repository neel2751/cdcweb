import type { Metadata } from "next";
import EnquiryReceived from "./EnquiryReceived";

export const metadata: Metadata = {
  title: "Enquiry received",
  robots: { index: false },
};

export default function EnquiryReceivedPage() {
  return <EnquiryReceived />;
}
