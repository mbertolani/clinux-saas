import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base'
import csLocale from '@syncfusion/ej2-locale/src/cs.json'
import deLocale from '@syncfusion/ej2-locale/src/de.json'
import esLocale from '@syncfusion/ej2-locale/src/es.json'
import frLocale from '@syncfusion/ej2-locale/src/fr.json'
import nlLocale from '@syncfusion/ej2-locale/src/nl.json'
import plLocale from '@syncfusion/ej2-locale/src/pl.json'
import ptLocale from '@syncfusion/ej2-locale/src/pt.json'
import viLocale from '@syncfusion/ej2-locale/src/vi.json'

import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json'
// nl
import * as gregorian_nl from 'cldr-data/main/nl/ca-gregorian.json'
import * as currencies_nl from 'cldr-data/main/nl/currencies.json'
import * as numbers_nl from 'cldr-data/main/nl/numbers.json'
import * as timeZoneNames_nl from 'cldr-data/main/nl/timeZoneNames.json'

// fr
import * as gregorian_fr from 'cldr-data/main/fr/ca-gregorian.json'
import * as currencies_fr from 'cldr-data/main/fr/currencies.json'
import * as numbers_fr from 'cldr-data/main/fr/numbers.json'
import * as timeZoneNames_fr from 'cldr-data/main/fr/timeZoneNames.json'

// de
import * as gregorian_de from 'cldr-data/main/de/ca-gregorian.json'
import * as currencies_de from 'cldr-data/main/de/currencies.json'
import * as numbers_de from 'cldr-data/main/de/numbers.json'
import * as timeZoneNames_de from 'cldr-data/main/de/timeZoneNames.json'

// pt
import * as gregorian_pt from 'cldr-data/main/pt/ca-gregorian.json'
import * as currencies_pt from 'cldr-data/main/pt/currencies.json'
import * as numbers_pt from 'cldr-data/main/pt/numbers.json'
import * as timeZoneNames_pt from 'cldr-data/main/pt/timeZoneNames.json'

// cs
import * as gregorian_cs from 'cldr-data/main/cs/ca-gregorian.json'
import * as currencies_cs from 'cldr-data/main/cs/currencies.json'
import * as numbers_cs from 'cldr-data/main/cs/numbers.json'
import * as timeZoneNames_cs from 'cldr-data/main/cs/timeZoneNames.json'

// es
import * as gregorian_es from 'cldr-data/main/es/ca-gregorian.json'
import * as currencies_es from 'cldr-data/main/es/currencies.json'
import * as numbers_es from 'cldr-data/main/es/numbers.json'
import * as timeZoneNames_es from 'cldr-data/main/es/timeZoneNames.json'

// pl
import * as gregorian_pl from 'cldr-data/main/pl/ca-gregorian.json'
import * as currencies_pl from 'cldr-data/main/pl/currencies.json'
import * as numbers_pl from 'cldr-data/main/pl/numbers.json'
import * as timeZoneNames_pl from 'cldr-data/main/pl/timeZoneNames.json'

// vi
import * as gregorian_vi from 'cldr-data/main/vi/ca-gregorian.json'
import * as currencies_vi from 'cldr-data/main/vi/currencies.json'
import * as numbers_vi from 'cldr-data/main/vi/numbers.json'
import * as timeZoneNames_vi from 'cldr-data/main/vi/timeZoneNames.json'
import { Language, getLanguageCode } from './language'

const getL10nObject = (language: Language) => {
  switch (language) {
    case Language.Dutch:
      return { nl: nlLocale.nl }
    case Language.French:
      return { fr: frLocale.fr }
    case Language.German:
      return { de: deLocale.de }
    case Language.Portuguese:
      return { pt: ptLocale.pt }
    case Language.Czech:
      return { cs: csLocale.cs }
    case Language.Spanish:
      return { es: esLocale.es }
    case Language.Polish:
      return { pl: plLocale.pl }
    case Language.Vietnamese:
      return { vi: viLocale.vi }
  }

  return null
}

export const localizeSyncfusion = (language: Language) => {
  const lang = getL10nObject(language)
  if (lang) {
    L10n.load(lang)
    setCulture(getLanguageCode(language))
    loadCldrData(language)
  }
}

const loadCldrData = (language: Language) => {
  switch (language) {
    case Language.Dutch:
      loadNlCldr()
      break
    case Language.French:
      loadFrCldr()
      break
    case Language.German:
      loadDeCldr()
      break
    case Language.Portuguese:
      loadPtCldr()
      break
    case Language.Czech:
      loadCsCldr()
      break
    case Language.Spanish:
      loadEsCldr()
      break
    case Language.Polish:
      loadPlCldr()
      break
    case Language.Vietnamese:
      loadViCldr()
      break
  }
}

const loadNlCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_nl,
    numbers_nl,
    timeZoneNames_nl,
    currencies_nl
  )
}
const loadFrCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_fr,
    numbers_fr,
    timeZoneNames_fr,
    currencies_fr
  )
}
const loadDeCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_de,
    numbers_de,
    timeZoneNames_de,
    currencies_de
  )
}
const loadPtCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_pt,
    numbers_pt,
    timeZoneNames_pt,
    currencies_pt
  )
}
const loadCsCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_cs,
    numbers_cs,
    timeZoneNames_cs,
    currencies_cs
  )
}
const loadEsCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_es,
    numbers_es,
    timeZoneNames_es,
    currencies_es
  )
}
const loadPlCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_pl,
    numbers_pl,
    timeZoneNames_pl,
    currencies_pl
  )
}
const loadViCldr = () => {
  loadCldr(
    numberingSystems,
    gregorian_vi,
    numbers_vi,
    timeZoneNames_vi,
    currencies_vi
  )
}
