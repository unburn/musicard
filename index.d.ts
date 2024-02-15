interface ClassicOption {
    thumbnailImage?: string;
    backgroundColor?: string;
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

interface ClassicProOption {
    thumbnailImage?: string;
    backgroundColor?: string;
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

interface DynamicOption {
    thumbnailImage?: string,
    backgroundColor?: string,
    progress?: number,
    progressColor?: string,
    progressBarColor?: string,
    name?: string,
    nameColor?: string,
    author?: string,
    authorColor?: string
}

interface MiniOption {
    thumbnailImage?: string,
    backgroundColor?: string,
    menuColor?: string,
    progress?: number,
    progressColor?: string,
    progressBarColor?: string,
    paused?: boolean
}

interface MiniProOption {
    thumbnailImage?: string,
    backgroundColor?: string,
    progress?: string,
    progressColor?: string,
    progressBarColor?: string,
    name?: string,
    nameColor?: string,
    author?: string,
    authorColor?: string
}

export declare function Classic(options: ClassicOption): Promise<Buffer>;
export declare function ClassicPro(options: ClassicProOption): Promise<Buffer>;
export declare function Dynamic(options: DynamicOption): Promise<Buffer>;
export declare function Mini(options: MiniOption): Promise<Buffer>;
export declare function MiniPro(options: MiniProOption): Promise<Buffer>;