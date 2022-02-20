export type TLanguage = 'en-us' | 'de-de' | 'fr-ca';
export enum ELanguageNames {
	ENGLISH = 'ENGLISH',
	GERMAN = 'GERMAN',
	FRENCH = 'FRENCH',

}

export type ILocales = {
	[key in ELanguageNames]: TLanguage;
};

// default constant
export const LOCALES: ILocales = {
	ENGLISH: 'en-us',
	GERMAN: 'de-de',
	FRENCH: 'fr-ca'
}
