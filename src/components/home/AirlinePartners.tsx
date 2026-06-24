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
        <SectionHeading
          title="Airlines We Work With"
          subtitle="Partnerships with leading domestic and international carriers"
        />
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {airlines.map((airline) => (
            <div
              key={airline.code}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-white p-3 transition-all hover:border-gold/40 hover:shadow-sm"
            >
              <AirlineLogo code={airline.code} name={airline.name} logo={airline.logo} size="md" />
              <span className="text-center text-[10px] font-medium text-muted-foreground leading-tight">
                {airline.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
