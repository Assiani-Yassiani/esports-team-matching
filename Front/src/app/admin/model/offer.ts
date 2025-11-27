import { AppOffre } from "./appOffer";


export interface Offre {
  id?: number;
  comments?: string;
  comments2?: string;
  description?: string;
  teamType?: string;
  participation?: boolean;
  remunere?: boolean;
  appOffre?: AppOffre[]; // Liste des AppOffre
  actif?: boolean;
}
