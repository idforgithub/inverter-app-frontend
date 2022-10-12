export interface Inverter {
    id?: number;
    device: string;
    name: string;
    data: InverterData[];
}

export interface InverterData {
    id?: number;
    acp: number;
    timestamp: string;
    inverterDeviceId?: number;
    x: string;
    y: number;
}