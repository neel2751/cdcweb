import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import QuickQuoteForm from "@/components/forms/QuickQuoteForm";

export default function HomeCta() {
  return (
    <Container>
      <section id="contact" aria-labelledby="cta-title" className="scroll-mt-24">
        <Reveal className="relative overflow-hidden text-cream">
          <Image
            src="/images/projects/modern-family-home.jpg"
            alt=""
            fill
            sizes="100vw"
            className="ken-burns object-cover object-[50%_60%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[rgba(22,21,18,0.96)] via-[rgba(22,21,18,0.85)] to-[rgba(22,21,18,0.55)]" />
          <div className="relative flex flex-wrap items-center justify-between gap-8 px-7 py-12 sm:px-22 sm:py-20">
            <div>
              <h2 id="cta-title" className="font-serif text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-medium">
                Let’s Build Something Exceptional
              </h2>
              <p className="mt-3.5 text-base text-sand">Your vision. Our expertise. A better tomorrow.</p>
            </div>
            <QuickQuoteForm />
          </div>
        </Reveal>
      </section>
    </Container>
  );
}