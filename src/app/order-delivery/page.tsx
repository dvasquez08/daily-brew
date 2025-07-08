import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function OrderDelivery() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 text-center md:py-32">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-serif text-4xl md:text-5xl">Order for Delivery</h1>
        <p className="max-w-lg text-balance text-muted-foreground md:text-lg">
          Find us on your favorite food delivery apps!
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/skip.jpg"
            alt="Skip the Dishes logo"
            width={100}
            height={100}
          />
          <Button asChild size="lg">
            <Link
              href="https://www.skipthedishes.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Skip the Dishes
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image src="/uber-eats.jpg" alt="Uber Eats logo" width={100} height={100} />
          <Button asChild size="lg">
            <Link
              href="https://www.ubereats.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Uber Eats
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image src="/door-dash.jpg" alt="DoorDash logo" width={100} height={100} />
          <Button asChild size="lg">
            <Link href="https://www.doordash.com/" target="_blank" rel="noopener noreferrer">DoorDash</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
