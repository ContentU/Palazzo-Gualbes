import type {StructureResolver} from 'sanity/structure'

// Pagine uniche: un solo documento con _id uguale al tipo
const singletons = [
  ['siteSettings', 'Impostazioni sito'],
  ['homePage', 'Home'],
  ['aboutPage', 'Il Palazzo'],
  ['roomsPage', 'Camere'],
  ['journalPage', 'Journal'],
  ['contactPage', 'Contatti'],
] as const

export const singletonTypes = new Set<string>(singletons.map(([type]) => type))

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenuti')
    .items([
      ...singletons.map(([type, title]) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.documentTypeListItem('suite').title('Suite'),
      S.documentTypeListItem('article').title('Articoli'),
      S.documentTypeListItem('category').title('Categorie'),
    ])
