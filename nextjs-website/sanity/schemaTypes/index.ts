import { type SchemaTypeDefinition } from 'sanity'
import { infoType, linkItemType, photoType, suitesSliderType } from './fields'
import { articleType, categoryType, suiteType } from './documents'
import {
  aboutPageType, contactPageType, experiencePageType, homePageType, journalPageType, roomsPageType, servicesPageType, siteSettingsType, storyPageType,
} from './singletons'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    photoType, linkItemType, suitesSliderType, infoType,
    siteSettingsType, homePageType, aboutPageType, storyPageType, roomsPageType, servicesPageType, experiencePageType, journalPageType, contactPageType,
    suiteType, articleType, categoryType,
  ],
}
