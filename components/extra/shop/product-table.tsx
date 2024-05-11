import * as React from 'react';
// If using TypeScript, add the following snippet to your file as well.
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }

function PricingPage() {
  // Paste the stripe-pricing-table snippet in your React component
  return (
    <stripe-pricing-table pricing-table-id="prctbl_1PFGy3FpVG7djWPcvK2ZG15U"
    publishable-key="pk_test_51PEp2MFpVG7djWPcFlUfDFi3HjIRiQGPNd8uoxtf6O8sQAGKRcaTtuimBWOqgRPVZcJ9cbGVYlpKIWIj2kNu39I300BIgl0MRL">
    </stripe-pricing-table>
  );
}

export default PricingPage;