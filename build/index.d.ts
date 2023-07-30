declare module 'musicard.js' {
    interface MusicCardOptions {
        name: string;
        author: string;
        progress?: number;
        thumbnail?: string;
        color?: string;
        starttime?: string;
        endtime?: string;
        mode?: 'play' | 'pause';
    }

    type MusicCardImage = Buffer;

    export function musicCard(options: MusicCardOptions): Promise<MusicCardImage>;
}