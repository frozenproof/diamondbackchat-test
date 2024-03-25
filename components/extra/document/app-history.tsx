import { CardBody, CardContainer, CardItem } from "@/components/effects/3d-card";
import { CardStack } from "@/components/effects/card-stack";
import { StickyScroll } from "@/components/effects/sticky-scroll-reveal";
import { cn } from "@/lib/utils";
import Image from "next/image";

const content = [
  {
    title: "How it began",
    description:  (
      <div>
        <div>
          One day in 2020, I was greeted by a game called Toram Online when I was scrolling during Covid.
          From Toram, I got my first invite to Discord group .
          The single insignificant oppoturnity that gave me the chance of seeing Discord . 
        </div>
        <div>
          Before I get banned for hacking ( IT students jokes go here ), I played the game daily .
        </div>
        The picture is an exact screenshot of the game.
      </div>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center ">
        <Image
          src="/image/ToramOnlineScreenshot2022_01_15_02_07_06.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Why Discord became my design inspiration",
    description:  (
      <div>
        <div>
          Discord is where I first met with such a simple yet easy to use design , and a small group where I can meet friends without distinctions . An user name that I'm sure I can be proud of , Viet Nam.
        </div>
        <div
          className="text-[#41d3f8] text-xl"
        >
          Shoutout to LilWitch for actually putting up with me.
        </div>
      </div>
    ),
    content: (
      <div className="h-full w-full  flex items-center justify-center ">
        <Image
          src="/image/Untitled243-2.jpg"
          width={288}
          height={512}
          className="object-fill"
          alt=""
        />
      </div>
    ),
  },
  {
    title: "Original App Icon",
    description:
      "Many days frowned upon thee for finding the holy grail of app icon.",
    content: (
      <div className="h-full w-full flex items-center justify-center ">
        <Image
          src="/image/original.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "What the development process would have looked like",
    description:
        <div>
          <div>
            I have virtually no experiences with Nextjs fullstack. Aside from the fact I manually decoded and hacked an obsfucated React Website (Story for another day).
          </div>
          <div>
            Knowing I would surely get destroyed by this project, I started reading more books to get an idea .
          </div>
        </div>,
    content: (
      <div className="h-full w-full flex items-center justify-center ">
        <Image
          src="/image/430173140_727844572880579_2756004704308343656_n.jpg"
          width={428}
          height={512}
          className="object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center ">
        Running out of content
      </div>
    ),
  },
];

export const AppHistory = (
) => {
    return (
        <div
          className="w-full h-full p-10"
        >
          <div
              className="h-[8px] w-full flex items-center text-center pt-8"
          >
              <div
                  className="text-center w-full"
              >
                  Development H(ell)istory 
              </div>
          </div>
          <StickyScroll content={content} />
        </div>
    )
}
