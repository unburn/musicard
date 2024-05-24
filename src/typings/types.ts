import type { loadImage } from "@napi-rs/canvas";

export type ClassicOption = {
    thumbnailImage?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    imageDarkness?: number;
    progress?: number;
    progressColor?: string;
    progressBarColor?: string;
    name?: string;
    nameColor?: string;
    author?: string;
    authorColor?: string;
    startTime?: string;
    endTime?: string;
    timeColor?: string
}

export type ClassicProOption = {
    thumbnailImage?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    imageDarkness?: number;
    progress?: number;
    progressColor?: string;
    progressBarColor?: string;
    name?: string;
    nameColor?: string;
    author?: string;
    authorColor?: string;
    startTime?: string;
    endTime?: string;
    timeColor?: string;
}

export type DynamicOption = {
    thumbnailImage?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    imageDarkness?: number;
    progress?: number;
    progressColor?: string;
    progressBarColor?: string;
    name?: string;
    nameColor?: string;
    author?: string;
    authorColor?: string;
}

export type MiniOption = {
    thumbnailImage: string;
    backgroundColor: string;
    backgroundImage?: string;
    imageDarkness?: number;
    menuColor: string;
    progress: number;
    progressColor: string;
    progressBarColor: string;
    paused: boolean;
}

export type UpcomingOptions = {
    /**
     * Title of the track
     * Title greater than 18 characters will not be displayed (will be splitted)
     */
    title: string;

    /**
     * Color For the Track Title
     * @default #FFFFFF(White)
     */
    titleColor?: string;

    /**
     * Author of the track
     * text provided greeter then 19 characters will be splitted/not displayed
     */
    author: string;

    /**
      * Color For the Track's Author
     * @default #FFFFFF(White)
     */
    authorColor?: string;

    /**
     * Thumbnail of the track (if none specified Default thumbnail will be displayed)
     */
    thumbnailImage?: Parameters<typeof loadImage>[0]

    /**
     * Index of the track to be displayed
     * @default 1
     */
    trackIndex?: number;

    /**
     * Color For the track's Index
     * @default #FFFFFF(White)
     */
    trackIndexTextColor?: string;

    /**
     * Background color for the Track's Index.
     * @default #FFFFFF(White)
     */
    trackIndexBackgroundColor?: string;

    /**
     * Background radii(radius) for the Track's Index
     * @default 10
     */

    trackIndexBackgroundRadii?: number | number[];

    /**
     * Background Color
     * @default #070707
     */
    backgroundColor?: string;

    /**
     * Background Image
     * @optional
     */
    backgroundImage?: Parameters<typeof loadImage>[0];

    /**
     * Darkness for the background Image.
     */
    imageDarkness?: number;
}