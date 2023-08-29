declare module 'musicard' {
    class musicCard {
        constructor();

        setName(name: string): this;
        setAuthor(author: string): this;
        setColor(color: string): this;
        setBrightness(brightness: number): this;
        setThumbnail(thumbnail: string): this;
        setProgress(progress: number): this;
        setStartTime(starttime: string): this;
        setEndTime(endtime: string): this;
        setOutput(output: "png" | "jpeg" | "webp"): this;

        build(): Promise<Buffer>;
    }

    export { musicCard };
}