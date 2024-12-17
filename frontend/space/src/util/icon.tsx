import { HeartPulse, Gauge, Thermometer, Donut, Wind, Leaf } from 'lucide-react';

export const getIcon = (name: string): JSX.Element => {
    if (name === 'Batimento Cardíaco') {
        return <HeartPulse color="red" size={48} />;
    } else if (name === 'Pressão Sanguínea') {
        return <Gauge color="red" size={48} />;
    } else if (name === 'Temperatura Corporal') {
        return <Thermometer color="red" size={48} />;
    } else if (name === 'Respiração') {
        return <Wind color="#2684e8" size={48} />;
    } else if (name === 'Oxigênio no Sangue') {
        return <Leaf color="#2684e8" size={48} />;
    }
    return <Donut color="#2684e8" size={48} />
}