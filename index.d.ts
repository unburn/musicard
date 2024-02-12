export type Output = {
    status: number,
    message: string
}

export type ClassicParams = {
    thumbnailImage: string,
    backgroundColor: string,
    progress: number,
    progressColor: string,
    progressBarColor: string,
    name: string,
    nameColor: string,
    author: string,
    authorColor: string,
    startTime: string,
    endTime: string
}

export type VibrantParams = {
    thumbnailImage: string,
    backgroundColor: string,
    menuColor: string,
    progress: number,
    progressColor: string,
    progressBarColor: string,
    paused: boolean
}

export declare class Musicard {
    constructor(apiKey: string);
    public classic(params: ClassicParams): Promise<Output>
    public vibrant(params: VibrantParams): Promise<Output>
}