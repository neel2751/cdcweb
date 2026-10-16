import { reviews } from "@/data/home";
import Container from "@/components/ui/Container";
import ReviewCard from "@/components/cards/ReviewCard";
import Reveal from "@/components/motion/Reveal";

export default function ReviewsSection() {
  const loop = [...reviews, ...reviews];

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-24 overflow-hidden pt-10 pb-24">
      <Container className="lg:px-18">
        <Reveal>
          <p className="text-[13px] font-medium text-stone">Client Testimonials</p>
          <h2 id="reviews-title" className="mt-3.5 mb-10 font-serif text-[clamp(36px,3.6vw,52px)] leading-[1.05] font-medium">
            What Our Clients Say
          </h2>
        </Reveal>
      </Container>
      <Reveal delay={0.1}>
        <div className="marquee">
          {loop.map((review, i) => (
            <ReviewCard key={i} review={review} hidden={i >= reviews.length} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}