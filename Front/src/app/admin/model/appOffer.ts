import { AppResume } from "./appResume";


export interface AppOffre {
    id: number;
    creationDate: string; // LocalDateTime est converti en string au format ISO
    view: boolean;
    status: boolean;
    idr: number;
    appResume: AppResume; // Référence à AppResume
}
