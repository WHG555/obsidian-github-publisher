export default {
	/* ------------ *
	 *	 Commands   *
	 * ------------ */
	shareActiveFile: "Share active file",
	publisherDeleteClean: "Remove unshared and deleted file in repository",
	uploadAllNotes: "Upload all shared notes",
	uploadNewNotes: "Upload new shared notes",
	uploadAllNewEditedNote: "Upload all new and edited note since last upload",
	uploadAllEditedNote: "Upload all edited note since last upload",
	shareViewFiles:(viewFile:string): string => `Share "${viewFile}" with Github Publisher`,

	/* ------------ *
	 *	 Settings   *
	 * ------------ */
	exportingSettings: "Host configuration",
	exportingDesc: "Use a local folder or GitHub to host your blog.",
	githubConfiguration: "Github Configuration",
	repoName: "Repo Name",
	repoNameDesc: "The name of the repository where you store your blog.",
	mkdocsTemplate: "mkdocs-template",
	githubUsername: "Github Username",
	githubUsernameDesc: "Your github username.",
	ghTokenDesc: "A github token with repository permission. You can generate it ",
	here: "here.",
	githubToken: "Github Token",

	// ---
	// # Upload configuration # //
	uploadConfig: "Upload configuration",
	pathSetting: "Path settings",
	folderBehavior: "Folder behavior",
	folderBehaviorDesc: "Choose between a fixed folder, the value of a frontmatter key or your obsidian relative path.",
	fixedFolder: "Fixed Folder",
	yaml: "YAML frontmatter",
	obsidianPath: "Obsidian Path",
	defaultFolder: "Default Folder",
	defaultFolderDesc: "Set the default reception folder",
	defaultFolderPlaceholder: "docs",
	pathRemoving: "Path removing",
	pathRemovingDesc: "Allow to publish only subfolder by removing the path before that :",
	pathRemovingPlaceholder: "GardenSketch",
	frontmatterKey: "Frontmatter key",
	frontmatterKeyDesc: "Set the key where to get the value of the folder",
	frontmatterKeyPlaceholder: "category",
	rootFolder: "Root folder",
	rootFolderDesc: "Append this path to the folder set by the frontmatter key.",

	// ---
	// # Text conversion # //
	textConversion: "Text conversion",
	textHeader: "Text",
	linkHeader: "Links",
	folderNote: "Folder note",
	folderNoteDesc: "Rename files to \"index.md\" if it has the same name as their parent folder/category (also works if the note is out of the folder).",
	internalsLinks: "Internals Links",
	internalsLinksDesc: "Convert the internal link in shared file to match the folder settings",
	wikilinks: "Wikilinks",
	wikilinksDesc: "Convert Wikilinks to MDlinks, without changing the contents",
	hardBreakTitle: "Markdown hard line break",
	hardBreakDesc: "Add a markdown hard line break (double whitespace) after each line.",
	headerDataview: "Dataview",
	headerDataviewDesc: "Convert dataview to markdown.",
	useFrontmatterTitle: "Use frontmatter title",
	useFrontmatterTitleDesc: "Use frontmatter \"title\" field instead of the file name.",

	// ---
	// # Embed # //
	embed: "Embed",
	transferImage: "Transfer image",
	transferImageDesc: "Send image embedded in a file to github",
	transferEmbeddedNotes: "Transfer embedded notes",
	transferEmbeddedNotesDesc: "Send embedded notes in a shared file to github. Only shared files will be send!",
	defaultImageFolder: "Default image folder",
	defaultImageFolderDesc: "To use a folder different from default",

	// ---
	// # Github Workflow # //
	githubActionName: "Github action name",
	githubActionNameDesc: "If you want to activate a github action when the plugin push the file, set the name of the file (in your .github/worfklows folder).",
	autoCleanUp: "Auto clean up",
	autoCleanUpDesc: "If the plugin must remove from github the removed files (stop share or deleted)",
	excludedFiles: "Excluded files",
	excludedFilesDesc: "If you want to exclude some folder from the auto clean up, set their path.",

	// ---
	// # Plugin settings # //
	pluginSettings: "Plugin Settings",
	shareKey: "Share Key",
	shareKeyDesc: "The frontmatter key to publish your file on the website.",
	excludedFolder: "Excluded Folder",
	excludedFolderDesc: "Never publish file in these folder, regardless of the share key. Separate folder name by comma.",
	fileMenu: "File Menu",
	fileMenuDesc: "Add an sharing commands in the file menu",
	editorMenu: "Editor Menu",
	editorMenuDesc: "Add a sharing commands in the right-click menu",
	copylinkSetting: "Copy link",
	copylinkDesc: "Send a link to your note in your clipboard",
	baselink: "Blog link",
	baselinkDesc: "Create the clipboard link with this base. By default : https://username.github.io/repo/",
	linkpathremover: "Remove link part",
	linkpathremoverDesc: "Remove this part from the created links. Separate by comma if multiple value must be removed.",
	logNoticeHeader: 'Notice every error',
	logNoticeDesc: 'On mobile, it can be hard to debug the plugin. Enable this option to log every error in a Notice.',

	/* ------------ *
	 *	 Notice   *
	 * ------------ */
	unablePublishNote: (fileInfo: string): string => `Unable to publish note ${fileInfo}，skipping it`,
	errorPublish: (repoInfo: string): string => `Error publishing to ${repoInfo}.`,
	unablePublishMultiNotes: "Unable to publish multiple notes, something went wrong.",
	startingClean: (repoInfo: string): string => `Starting cleaning ${repoInfo}`,
	scanningRepo: "Scanning the repository, may take a while...",
	foundNoteToSend: (noteLength: string)=> `Found ${noteLength} new notes to send`,
	noNewNote: "No new notes to share.",
	successfullPublish:(noticeValue: string[])=>`Successfully published ${noticeValue[0]} to ${noticeValue[1]}.`,
	waitingWorkflow: "Now, waiting for the workflow to be completed...",
	sendMessage:(noticeValue: string[])=>`Send ${noticeValue[0]} to ${noticeValue[1]}${noticeValue[2]}`
}
