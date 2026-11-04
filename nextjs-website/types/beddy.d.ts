// Web component della barra di prenotazione Beddy (caricata da cdn.beddy.io)
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "beddy-bar": { lang: string; widgetcode: string };
    }
  }
}
