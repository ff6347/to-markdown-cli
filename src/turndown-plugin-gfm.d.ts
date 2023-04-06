declare module 'turndown-plugin-gfm' {
	import TurndownService from 'turndown';
  
	type Filter = string | string[] | ((node: HTMLElement) => boolean);
	type ReplacementFunction = (
	  content: string,
	  node: HTMLElement,
	  options: { fence: string }
	) => string;
  
	interface Rule {
		filter: Filter;
		replacement?: (
		  content: string,
		  node: HTMLElement,
		  options: TurndownService.Options,
		  captureGroups: string[]
		) => string | void | null;
		options?: TurndownService.Options;
	  }
  
	function highlightedCodeBlock(turndownService: any): void;
	function strikethrough(turndownService: any): void;
	function tables(turndownService: any): void;
	function taskListItems(turndownService: any): void;
	function gfm(turndownService: any): void;
  
	export {
	  highlightedCodeBlock,
	  strikethrough,
	  tables,
	  taskListItems,
	  gfm,
	  Rule,
	  Filter,
	  ReplacementFunction,
	};
  }
  