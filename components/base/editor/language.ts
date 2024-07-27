export enum Language {
  English = 'English',
  Dutch = 'Dutch',
  French = 'French',
  German = 'German',
  Portuguese = 'Portuguese',
  Czech = 'Czech',
  Spanish = 'Spanish',
  Polish = 'Polish',
  Vietnamese = 'Vietnamese'
}

export function getLanguageCode(lang: Language) {
  switch (lang) {
    case Language.Dutch:
      return 'nl'
    case Language.French:
      return 'fr'
    case Language.German:
      return 'de'
    case Language.Portuguese:
      return 'pt'
    case Language.Czech:
      return 'cs'
    case Language.Spanish:
      return 'es'
    case Language.Polish:
      return 'pl'
    case Language.Vietnamese:
      return 'vi'
    default:
      return 'en'
  }
}
