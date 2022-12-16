export interface IAnimePreview {
    id: number;
    name: string;
    russian: string;
    image: {
        preview: string
    };
    kind: string;
    aired_on: string | null;
    score: number;
}

export interface IAnimeDescription extends IAnimePreview{
    episodes: number,
    episodes_aired: number,
    status: string,
    rating: string,
    description_html: string,
    studios: {
        name: string
    }[]
    genres: {
        name: string,
        russian: string
    }[],
    image: {
        original: string
        preview: string
    };
}