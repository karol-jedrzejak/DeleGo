import NewsIndex from "@/pages/news/Index.tsx";

export const NEWS = {
    INDEX: {
        PATH:  '/news',
        LINK:  '/news',
        COMPONENT: NewsIndex,
        PERMISSIONS: null
    },
} as const;
