import React from "react";
import dynamic from "next/dynamic";

const LiveChat = dynamic(() => import("../../components/liveChat/LiveChat"), {
  ssr: false,
});

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

export default function liveChat(props) {
  return <LiveChat channelName={props.id} />;
}
