import {App, PluginSettingTab, Setting} from 'obsidian'
import MkdocsPublication from './main'
import {
	hideSettings,
	showSettings,
	autoCleanCondition,
	folderHideShowSettings,
	autoCleanUpSettingsOnCondition, shortcutsHideShow
} from "./settings/style";
import {folderSettings, localHost} from "./settings/interface";
import t from './i18n'

export class MkdocsSettingsTab extends PluginSettingTab {
	plugin: MkdocsPublication;

	constructor(app: App, plugin: MkdocsPublication) {
		super(app, plugin)
		this.plugin = plugin
	}

	display(): void {
		const {containerEl} = this
		containerEl.empty();

		/* ------------------------------ *
		 * 			Github Config		  *
		 * ------------------------------ */

		containerEl.createEl('h1', {text: t('githubConfiguration') as string})
		new Setting(containerEl)
			.setName(t('exportingSettings') as string)
			.setDesc(t('exportingDesc') as string)
			.addDropdown((dropDown) => {
				dropDown
					.addOptions({
						local : 'Local',
						github: 'GitHub',
					})
					.setValue(this.plugin.settings.localFolder)
					.onChange(async(value: string)=> {
						this.plugin.settings.localFolder = value;
						await this.plugin.saveSettings();
						if (value === localHost.local) {
							hideSettings(githubRepoSettings);
							hideSettings(GithubUserName);
							hideSettings(ghTokenSettings);
						} else {
							showSettings(githubRepoSettings);
							showSettings(GithubUserName);
							showSettings(ghTokenSettings);
						}
					})});


		const githubRepoSettings = new Setting(containerEl)
			.setName(t('repoName') as string)
			.setClass('obs-git-publisher')
			.setDesc(t('repoNameDesc') as string)
			.addText((text) =>
				text
					.setPlaceholder('mkdocs-template')
					.setValue(this.plugin.settings.githubRepo)
					.onChange(async (value) => {
						this.plugin.settings.githubRepo = value.trim()
						await this.plugin.saveSettings()
					})
			)
		const GithubUserName = new Setting(containerEl)
			.setName(t('githubUsername') as string)
			.setClass('obs-git-publisher')
			.setDesc(t('githubUsernameDesc') as string)
			.addText((text) =>
				text
					.setPlaceholder(t('githubUsername') as string)
					.setValue(this.plugin.settings.githubName)
					.onChange(async (value) => {
						this.plugin.settings.githubName = value.trim()
						await this.plugin.saveSettings()
					})
			)
		const desc_ghToken = document.createDocumentFragment()
		desc_ghToken.createEl('span', null, (span) => {
			span.innerText = t('ghTokenDesc') as string
			span.createEl('a', null, (link) => {
				link.innerText = t('here') as string
				link.href = 'https://github.com/settings/tokens/new?scopes=repo,workflow'
			})
		})
		const ghTokenSettings = new Setting(containerEl)
			.setName(t('githubToken') as string)
			.setDesc(desc_ghToken)
			.setClass('obs-git-publisher')
			.addText((text) =>
				text
					.setPlaceholder('ghb-15457498545647987987112184')
					.setValue(this.plugin.settings.GhToken)
					.onChange(async (value) => {
						this.plugin.settings.GhToken = value.trim();
						await this.plugin.saveSettings();
					})
			)

		/* ------------------------------ *
		 * 			Upload config		  *
		 * ------------------------------ */
		containerEl.createEl('h2', {text: t('uploadConfig') as string})
		
		containerEl.createEl('h3', {text: t('pathSetting') as string})
		
		new Setting(this.containerEl)
			.setName(t('folderBehavior') as string)
			.setDesc(t('folderBehaviorDesc') as string)
			.addDropdown((dropDown) => {
				dropDown
					.addOptions({
						fixed : t('fixedFolder') as string,
						yaml: t('yaml') as string,
						obsidian: t('obsidianPath') as string
					})
					.setValue(this.plugin.settings.downloadedFolder)
					.onChange(async(value: string)=>{
						this.plugin.settings.downloadedFolder=value;
						
						await folderHideShowSettings(frontmatterKeySettings, rootFolderSettings, autoCleanSetting, value, this.plugin, subFolderSettings)
						if (value === folderSettings.fixed) {
							hideSettings(folderNoteSettings)
						} else {
							showSettings(folderNoteSettings)
							if (value === folderSettings.obsidian) {
								showSettings(subFolderSettings)
							}
						}
						await this.plugin.saveSettings();
					});
			});

		new Setting(this.containerEl)
			.setName(t('defaultFolder') as string)
			.setDesc(t('defaultFolderDesc') as string)
			.addText((text) => {
				text
					.setPlaceholder('docs')
					.setValue(this.plugin.settings.folderDefaultName)
					.onChange(async (value) => {
						this.plugin.settings.folderDefaultName = value.replace(/\/$/, '');
						await autoCleanCondition(value, autoCleanSetting, this.plugin)
						await this.plugin.saveSettings();
					});
			});
		
		const subFolderSettings = new Setting(this.containerEl)
			.setName(t('pathRemoving') as string)
			.setClass('obs-git-publisher')
			.setDesc(t('pathRemovingDesc') as string)
			.addText((text) => {
				text
					.setPlaceholder(t('pathRemovingPlaceholder') as string)
					.setValue(this.plugin.settings.subFolder)
					.onChange(async (value) => {
						this.plugin.settings.subFolder = value.replace(/\/$/, '').trim();
						await this.plugin.saveSettings();
					});
			});

		const frontmatterKeySettings = new Setting(this.containerEl)
			.setName(t('frontmatterKey') as string)
			.setClass('obs-git-publisher')
			.setDesc(t('frontmatterKeyDesc') as string)
			.addText((text) => {
				text
					.setPlaceholder('category')
					.setValue(this.plugin.settings.yamlFolderKey)
					.onChange(async (value) => {
						this.plugin.settings.yamlFolderKey = value.trim();
						await this.plugin.saveSettings();
					});
			});
		const rootFolderSettings = new Setting(this.containerEl)
			.setName(t('rootFolder') as string)
			.setClass('obs-git-publisher')
			.setDesc(t('rootFolderDesc') as string)
			.addText((text)=>{
				text
					.setPlaceholder('docs')
					.setValue(this.plugin.settings.rootFolder)
					.onChange(async(value)=>{
						this.plugin.settings.rootFolder =value.replace(/\/$/, '');
						await autoCleanCondition(value, autoCleanSetting, this.plugin);
						await this.plugin.saveSettings();
					});
			});
		new Setting(this.containerEl)
			.setName(t('useFrontmatterTitle') as string)
			.setDesc(t('useFrontmatterTitleDesc') as string)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.useFrontmatterTitle)
					.onChange(async (value) => {
						this.plugin.settings.useFrontmatterTitle = value;
						await this.plugin.saveSettings();
					});
			});
		/* ------------------------------ *
		 * 		  Text conversion		  *
		 * ------------------------------ */

		containerEl.createEl('h3', {text: t('textConversion') as string})
		containerEl.createEl('h5', {text: t('textHeader') as string})
		new Setting(this.containerEl)
			.setName(t('hardBreakTitle') as string)
			.setDesc(t('hardBreakDesc') as string)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.hardBreak)
					.onChange(async (value) => {
						this.plugin.settings.hardBreak = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(this.containerEl)
			.setName(t('headerDataview') as string)
			.setDesc(t('headerDataviewDesc') as string)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.convertDataview)
					.onChange(async (value) => {
						this.plugin.settings.convertDataview = value;
						await this.plugin.saveSettings();
					});
			});

		containerEl.createEl('h5', {text: t('linkHeader') as string})
		const folderNoteSettings = new Setting(containerEl)
			.setName(t('folderNote') as string)
			.setClass('obs-git-publisher')
			.setDesc(t('folderNoteDesc') as string)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.folderNote)
					.onChange(async (value)=>{
						this.plugin.settings.folderNote=value;
						await this.plugin.saveSettings();
					})
			})
		new Setting(containerEl)
			.setName(t('internalsLinks') as string)
			.setDesc(t('internalsLinksDesc') as string)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.convertForGithub)
					.onChange(async(value)=>{
						this.plugin.settings.convertForGithub = value;
						await this.plugin.saveSettings();
					})
			})

		new Setting(containerEl)
			.setName(t('wikilinks') as string)
			.setDesc(t('wikilinksDesc') as string)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.convertWikiLinks)
					.onChange(async (value)=>{
						this.plugin.settings.convertWikiLinks = value;
						await this.plugin.saveSettings();
					})
			})

		/* ------------------------------ *
		 * 				Embed			  *
		 * ------------------------------ */
		containerEl.createEl('h3', {text: t('embed') as string})


		new Setting(containerEl)
			.setName(t('transferImage') as string)
			.setDesc(t('transferImageDesc') as string)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.embedImage)
					.onChange(async (value) => {
						this.plugin.settings.embedImage = value;
						shortcutsHideShow(value, settingsDefaultImage)
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(t('transferEmbeddedNotes') as string)
			.setDesc(t('transferEmbeddedNotesDesc') as string)
			.addToggle((toggle)=>{
				toggle
					.setValue(this.plugin.settings.embedNotes)
					.onChange(async(value)=>{
						this.plugin.settings.embedNotes = value;
						await this.plugin.saveSettings();
					})
			})

		const settingsDefaultImage = new Setting(containerEl)
			.setName(t('defaultImageFolder') as string)
			.setDesc(t('defaultImageFolderDesc') as string)
			.addText((text)=>{
				text
					.setPlaceholder('docs/images')
					.setValue(this.plugin.settings.defaultImageFolder)
					.onChange(async(value) => {
						this.plugin.settings.defaultImageFolder = value.replace(/\/$/, '');
						await this.plugin.saveSettings();
					});
			});

		containerEl.createEl('h3', {text: 'Github Workflow'})
		new Setting(containerEl)
			.setName(t('githubActionName') as string)
			.setDesc(t('githubActionNameDesc') as string)
			.addText((text)=>{
				text
					.setPlaceholder('ci')
					.setValue(this.plugin.settings.workflowName)
					.onChange(async(value)=> {
						value = value.length>0? value.trim().replace('.yml', '') + '.yml' : value;
						this.plugin.settings.workflowName = value;
						await this.plugin.saveSettings();
					});
			});
		const condition = (this.plugin.settings.downloadedFolder === folderSettings.yaml &&
				(this.plugin.settings.rootFolder.length === 0) ||
				(this.plugin.settings.folderDefaultName.length === 0));

		const autoCleanSetting = new Setting(containerEl)
			.setName(t('autoCleanUp') as string)
			.setDesc(t('autoCleanUpDesc') as string)
			.setDisabled(condition)
			.addToggle((toggle)=>{
				toggle
					.setValue(this.plugin.settings.autoCleanUp)
					.onChange(async(value)=>{
						this.plugin.settings.autoCleanUp = value;
						shortcutsHideShow(value, autoCleanExcludedSettings)
						await this.plugin.saveSettings();
					});
			});

		const autoCleanExcludedSettings = new Setting(containerEl)
			.setName(t('excludedFiles') as string)
			.setDesc(t('excludedFilesDesc') as string)
			.addTextArea((textArea)=>{
				textArea
					.setPlaceholder('docs/assets/js, docs/assets/logo')
					.setValue(this.plugin.settings.autoCleanUpExcluded)
					.onChange(async(value)=>{
						this.plugin.settings.autoCleanUpExcluded = value;
						await this.plugin.saveSettings();
					});
			});

		/* ------------------------------ *
		 * 		Plugin settings			  *
		 * ------------------------------ */
		containerEl.createEl('h1', { text: t('pluginSettings') as string })
		
		new Setting(containerEl)
			.setName(t('shareKey') as string)
			.setDesc(t('shareKeyDesc') as string)
			.addText((text) =>
				text
					.setPlaceholder('share')
					.setValue(this.plugin.settings.shareKey)
					.onChange(async (value) => {
						this.plugin.settings.shareKey = value.trim();
						await this.plugin.saveSettings();
					})
			)
		new Setting(containerEl)
			.setName(t('excludedFolder') as string)
			.setDesc(t('excludedFolderDesc') as string)
			.addTextArea((textArea) =>
				textArea
					.setPlaceholder('_assets, Archive')
					.setValue(this.plugin.settings.ExcludedFolder)
					.onChange(async (value) => {
						this.plugin.settings.ExcludedFolder = value;
						await this.plugin.saveSettings();
					})
			)
		new Setting(containerEl)
			.setName(t('fileMenu') as string)
			.setDesc(t('fileMenuDesc') as string)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.fileMenu)
					.onChange(async (value) => {
						this.plugin.settings.fileMenu = value;
						await this.plugin.saveSettings();
					})
			)
		new Setting(containerEl)
			.setName(t('editorMenu') as string)
			.setDesc(t('editorMenuDesc') as string)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.editorMenu)
					.onChange(async (value) => {
						this.plugin.settings.editorMenu = value;
						await this.plugin.saveSettings();
					})
			)
		new Setting(containerEl)
			.setName(t("copylinkSetting") as string)
			.setDesc(t("copylinkDesc") as string)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.copyLink)
					.onChange(async(value)=>{
						this.plugin.settings.copyLink = value;
						shortcutsHideShow(value, baseLinkSettings);
						shortcutsHideShow(value, pathRemover);
						await this.plugin.saveSettings();
					})
			)
		const baseLinkSettings = new Setting(containerEl)
			.setName(t('baselink') as string)
			.setDesc(t("baselinkDesc") as string)
			.setClass('obs-git-publisher')
			.addText((text) =>{
				text
					.setPlaceholder('my_blog.com')
					.setValue(this.plugin.settings.mainLink)
					.onChange(async(value)=>{
						this.plugin.settings.mainLink = value;
						await this.plugin.saveSettings();
					});
			});
		const pathRemover=new Setting(containerEl)
			.setName(t("linkpathremover") as string)
			.setDesc(t("linkpathremoverDesc") as string)
			.setClass('obs-git-publisher')
			.addText((text)=>{
				text
					.setPlaceholder('docs/')
					.setValue(this.plugin.settings.linkRemover)
					.onChange(async(value)=>{
						this.plugin.settings.linkRemover = value;
						await this.plugin.saveSettings();
					})
			})
		new Setting(containerEl)
			.setName(t('logNoticeHeader') as string)
			.setDesc(t('logNoticeDesc') as string)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.logNotice)
					.onChange(async (value) => {
						this.plugin.settings.logNotice = value;
						await this.plugin.saveSettings();
					})
			)
		

		autoCleanUpSettingsOnCondition(condition, autoCleanSetting, this.plugin);
		this.plugin.settings.downloadedFolder === folderSettings.fixed ? hideSettings(folderNoteSettings):showSettings(folderNoteSettings)
		folderHideShowSettings(frontmatterKeySettings, rootFolderSettings, autoCleanSetting, this.plugin.settings.downloadedFolder, this.plugin, subFolderSettings).then();
		shortcutsHideShow(this.plugin.settings.embedImage, settingsDefaultImage)
		shortcutsHideShow(this.plugin.settings.autoCleanUp, autoCleanExcludedSettings)
		shortcutsHideShow(this.plugin.settings.copyLink, baseLinkSettings)
		shortcutsHideShow(this.plugin.settings.copyLink, pathRemover)
		if (this.plugin.settings.localFolder === localHost.github) {
			showSettings(GithubUserName);
			showSettings(ghTokenSettings);
			showSettings(githubRepoSettings);
		} else {
			hideSettings(GithubUserName);
			hideSettings(ghTokenSettings);
			hideSettings(githubRepoSettings);
		}
	}
}
