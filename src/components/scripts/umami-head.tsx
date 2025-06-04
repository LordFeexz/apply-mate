import Script from "next/script";

export default function UmamiHead() {
  return (
    <Script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="15c5723e-1b02-4c0b-9384-373ce459136b"
    />
  );
}
