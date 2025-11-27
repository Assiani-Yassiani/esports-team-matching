import { AppTeam } from "./appTeam";


export interface AppResume {
    id?: number;
    creationDate?: string; // LocalDateTime est converti en string au format ISO
    view?: boolean;
    status?: boolean;
    appTeam?: AppTeam;
    ido?: number;
    idto?: number;
    idt?: number;
    link?: string;
}
