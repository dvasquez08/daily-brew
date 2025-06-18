import SmoothieSuggestionClient from '@/components/smoothie-ai/SmoothieSuggestionClient';

export default function SmoothieAiPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-semibold mb-4 text-primary">AI Smoothie Wizard</h1>
        <p className="text-lg text-muted-foreground">
          Let technology help you find your next favorite smoothie! Just tell us your preferences.
        </p>
      </section>
      <SmoothieSuggestionClient />
    </div>
  );
}
