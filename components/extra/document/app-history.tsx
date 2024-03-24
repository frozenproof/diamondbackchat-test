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
          One day in 2020, I was greeted by a game called Toram Online . The single insignificant oppoturnity that gave me the chance of seeing Discord .
        </div>
        <div>
          The picture is an exact screenshot of the game.
        </div>
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
    title: "Why Discord became my design goal",
    description:  (
      <div>
        <div>
          Discord is where I first met with such a simple yet easy to use design , and a small group where I can meet friends without distinctions . With an user name that I'm sure I can be proud of , Viet Nam.
        </div>
        <div>
          This picture is a memory I always keep in my devices.
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
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center ">
        Version control
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
