export type Question = {
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correct: string;
};