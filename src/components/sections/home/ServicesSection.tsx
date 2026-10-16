import { services } from "@/data/home";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/cards/ServiceCard";
import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";

export default function ServicesSection() {
  return (
    <Container>
      <section id="services" aria-labelledby="services-title" className="scroll-mt-24 py-24 sm:pt-27.5 sm:pb-25 lg:px-10">
        <div className="mb-14 flex flex-wrap justify-between gap-8">
          <div>
            <Reveal>
              <p className="text-[13px] font-medium text-stone">Our Services</p>
            </Reveal>
            <h2 id="services-title" className="mt-4.5 font-serif text-[clamp(42px,4.4vw,64px)] leading-[1.02] font-medium">
              <SplitWords
                lines={[
                  [{ text: "Tailored" }, { text: "Solutions" }],
                  [{ text: "for" }, { text: "Every" }, { text: "Space", className: "italic text-gold-dark" }],
                ]}
              />
            </h2>
          </div>
          <Reveal className="max-w-90 self-end" delay={0.15}>
            <p className="text-base leading-[1.7] text-stone">
              We offer a complete range of construction and design services, tailored to your needs and lifestyle.
            </p>
            <Button href="/services" variant="outline" className="mt-6" arrowClassName="text-gold-dark">
              View All Services
            </Button>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={(i % 4) * 0.09 + Math.floor(i / 4) * 0.12}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </section>
    </Container>
  );
}