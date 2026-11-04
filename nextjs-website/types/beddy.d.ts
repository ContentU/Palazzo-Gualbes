// Web component del booking engine Beddy (caricati da cdn.beddy.io)
import "react";

type BeddyProps = { lang: string; widgetcode: string };

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "beddy-booking-engine": BeddyProps;
      "beddy-bar": BeddyProps;
    }
  }
}
