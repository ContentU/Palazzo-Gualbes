import { type SchemaTypeDefinition } from 'sanity'
import { infoType, linkItemType, photoType, suitesSliderType } from './fields'
import { articleType, categoryType, suiteType } from './documents'
import { aboutPageType, contactPageType, homePageType, journalPageType, roomsPageType, siteSettingsType } from './singletons'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    photoType, linkItemType, suitesSliderType, infoType,
    siteSettingsType, homePageType, aboutPageType, roomsPageType, journalPageType, contactPageType,
    suiteType, articleType, categoryType,
  ],
}
