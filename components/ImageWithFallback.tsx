"use client";

import { useState } from "react";
import Image from "next/image";


export default function ImageWithFallback(props: React.ComponentProps<typeof Image>) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={props.className}
        style={{
          background: "#e5e5e5",
        }}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={props.alt}
      onError={() => setHasError(true)}
    />
  );
}
