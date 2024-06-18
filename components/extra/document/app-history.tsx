import { StickyScroll } from "@/components/effects/sticky-scroll-reveal";
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
          // src="/image/ToramOnlineScreenshot2022_01_15_02_07_06.png"
          src="https://utfs.io/f/21243a7a-f93a-4c79-8577-0f4d62f47055-u1zhab.png"
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
          Discord is where I first met with such a simple yet easy to use design , and a small group where I can meet friends without distinctions . An user name that I&#39;m sure I can be proud of , Viet Nam.
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
          // src="/image/Untitled243-2.jpg"
          src="https://utfs.io/f/c6c52907-e25a-4e41-ad11-3db03c50a344-k00hu7.jpg"
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
          // src="/image/original.jpg"
          src="https://utfs.io/f/8366f58a-8e16-47b8-9cbb-e59e1e6dbbf0-g6yc01.gif"
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
          // src="/image/430173140_727844572880579_2756004704308343656_n.jpg"
          src="https://utfs.io/f/ae754c12-aac1-4657-86f2-2b08ba7fab71-qffl74.jpg"
          width={428}
          height={512}
          className="object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "What more to say ?",
    description:
      <div
        className=""
      >
        One day I would die, and forget everything . 
        So , before it all over , I will let out a secret .
        I know the very person in this secret will never even think about it , but oh well , I can totally
        <div>
          see
        </div>
        <div>
          why
        </div>
      </div>,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center ">
        What does that even mean ?
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
