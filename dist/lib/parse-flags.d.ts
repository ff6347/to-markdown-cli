export interface IParseFlagsOptions {
	data: string;
	inPath?: string;
	outPath?: string;
	toClipboard?: boolean;
	useGfm?: boolean;
}
export declare function parseFlags(options: IParseFlagsOptions): void;
