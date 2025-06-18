import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-semibold text-primary">Complete Your Order</h1>
      </section>
      <CheckoutForm />
    </div>
  );
}
