type timeType = string;

interface MusicCardOptions {
  author: string;
  name: string;
  color?: string;
  theme?: "classic" | "dynamic";
  brightness?: string;
  thumbnail: string;
  progress?: number;
  starttime?: timeType;
  endtime?: timeType;
}

export declare class MusicCard {
  constructor(options: MusicCardOptions);

  public setName(name: string): this;
  public setAuthor(author: string): this;
  public setColor(color: string): this;
  public setTheme(theme: "classic" | "dynamic"): this;
  public setBrightness(brightness: number): this;
  public setThumbnail(thumbnail: string): this;
  public setProgress(progress: number): this;
  public setStartTime(starttime: string): this;
  public setEndTime(endtime: string): this;

  public build(): Promise<Buffer>;
}
