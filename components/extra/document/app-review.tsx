import { CardBody, CardContainer, CardItem } from "@/components/effects/3d-card";
import { CardStack } from "@/components/effects/card-stack";
import { cn } from "@/lib/utils";
export const AppReviews = (
) => {
    return (
        <div
                className="w-full bg-transparent h-full flex flex-col justify-center"
            >
                <div
                    className="w-full bg-transparent h-full flex flex-row  items-center justify-center
                    pt-[88px] py-2
                    "
                >
                    <CardStack items={CARDS} />
                </div>
            </div>
    )
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <span
        className={cn(
          "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
          className
        )}
      >
        {children}
      </span>
    );
  };
   
const CARDS = [
    {
      id: 0,
      name: "LilWitch",
      designation: "Beta tester",
      content: (
        <p>
          This app seems amazing, <Highlight>I want to use nitro</Highlight> without paying .
        </p>
      ),
    },
    {
      id: 1,
      name: "Arash",
      designation: "Senior Toramer",
      content: (
        <p>
          I don't know about apps,therefore I just use it.
        </p>
      ),
    },
    {
      id: 2,
      name: "Cattus",
      designation: "Creator",
      content: (
        <p>
          I deployed this thing for free , and I don't know what I did.
        </p>
      ),
    },
  ];