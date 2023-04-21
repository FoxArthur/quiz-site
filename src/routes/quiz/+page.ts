import type { PageLoad } from './$types';

export const load = (({ }) => {
    return {
        questions: [
            [
                "What happend to the hamster?",
                ["He failed the quiz", "He got was scared for lizzy"],
                "He got was scared for lizzy"
            ],
            [
                "What happend to the winter?",
                ["He failed the quiz", "He got was scared for grizzy"],
                "He failed the quiz"
            ],
            [
                "What happend to the arjuer?",
                ["He failed the quiz", "He got was scared for wizzy"],
                "He got was scared for wizzy"
            ],
        ],
    };
}) satisfies PageLoad;