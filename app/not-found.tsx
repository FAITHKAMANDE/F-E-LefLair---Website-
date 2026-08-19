import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center pt-24">
      <Container className="text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          The page you&apos;re looking for may have moved. Let&apos;s get you
          back to solid ground.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
