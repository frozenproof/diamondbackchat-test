import { CardBody, CardContainer, CardItem } from "@/components/effects/3d-card";
import Link from "next/link";

export const HomePageAuth = (
    {isLoggedin}:{
        isLoggedin: Boolean
    }
) => {
    return (
        <div
                className="w-full bg-transparent h-full flex flex-col justify-center"
            >
                <div
                    className="w-full bg-transparent h-full flex flex-row justify-center"
                >
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border text-center">
                            {!isLoggedin&&(<CardItem
                            translateZ={20}
                            as={Link}
                            href={`/check-auth`}
                            className="text-xl font-bold text-neutral-600 dark:text-white text-center w-full"
                            >
                                Sign up today and use animated avatars
                            </CardItem>)}
                            {isLoggedin&&(<CardItem
                            translateZ={20}
                            as={Link}
                            href={`/check-auth`}
                            className="text-xl font-bold text-neutral-600 dark:text-white text-center w-full"
                            >
                                Enter the world
                            </CardItem>)}
                            <CardItem
                            as="p"
                            translateZ="20"
                            className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 text-center w-full"
                            >
                            *where you actually do something instead of just watching 
                            </CardItem>
                            <div className="flex justify-between items-center mt-[8px]">
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
    )
}