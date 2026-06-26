import { MotionSection } from "@/components/motion/MotionSection";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AirlineLogo } from "@/components/shared/AirlineLogo";
import type { Airline } from "@/types";

interface AirlinePartnersProps {
  airlines: Airline[];
}

export function AirlinePartners({ airlines }: AirlinePartnersProps) {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <MotionSection>
          <SectionHeading
            title="Airlines We Work With"
            subtitle="Partnerships with leading domestic and international carriers"
          />
        </MotionSection>
        <MotionStagger className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {airlines.map((airline) => (
            <MotionStaggerItem key={airline.code}>
            <div
              className="group flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
            >
              <AirlineLogo code={airline.code} name={airline.name} logo={airline.logo} size="lg" />
              <span className="text-center text-[10px] font-medium text-muted-foreground leading-tight">
                {airline.name}
              </span>
            </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
