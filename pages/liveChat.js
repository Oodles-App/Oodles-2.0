import React from "react";
import dynamic from "next/dynamic";

const LiveChat = dynamic(() => import("../components/liveChat/LiveChat"), {
  ssr: false,
});

export default function liveChat() {
  return <LiveChat />;
}
