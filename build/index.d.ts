export declare class musicCard {
    constructor();

    public setName(name: string): this;
    public setAuthor(author: string): this;
    public setColor(color: string): this;
    public setBrightness(brightness: number): this;
    public setThumbnail(thumbnail: string): this;
    public setProgress(progress: number): this;
    public setStartTime(starttime: string): this;
    public setEndTime(endtime: string): this;

    public build(): Promise<Buffer>;
}