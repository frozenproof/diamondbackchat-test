"use client"

import { useQRCode } from 'next-qrcode';
import { useOrigin } from "@/hooks/use-origin";

export default function QRCode({ data, width }:{data: string ; width?: number}) {
  const { Image } = useQRCode();
  const origin = useOrigin();

  return (
    <Image
      text={`${origin}/invite-euphoria/` + data}
      options={{
        type: 'image/jpeg',
        quality: 1,
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: !!width ? width : 200,
        color: {
          dark: '#000',
          light: '#FFFFFF',
        },
      }}
    />
  );
};
