import { HeartPulse, Gauge, Thermometer, User, Donut } from 'lucide-react';

export const getIcon = (name: string) : JSX.Element => {
    if(name === 'Batimento Cardíaco') {
        return <HeartPulse color="red" size={48} />;
    } else if(name === 'Pressão Sanguinea') {
        return <Gauge color="red" size={48} />;
    } else if(name === 'Temperatura corporal') {
        return <Thermometer color="red" size={48} />;
    } else if(name === 'Ritmo respiratório') {
        return <User color="#2684e8" size={48} />;
    }
    return <Donut color="#2684e8" size={48} />
}