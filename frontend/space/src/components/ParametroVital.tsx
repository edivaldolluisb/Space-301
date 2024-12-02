import '../styles/paramero.css';
import {getIcon} from '../util/icon';

interface ParametroVitalProps {
    nome: string;
    pa_diastolica: number| null;
    pa_sistolica: number| null;
    valor: number|null;
    unidade: string;
    status: string;
}

export default function ParametroVital(props: ParametroVitalProps) {
    return (
        <>
            <div className="parametro-container">
                <div className="parametro-info">
                    {getIcon(props.nome)}
                    <div>{props.nome}</div>
                </div>
                <div className="parametro-valor">
                    {props.pa_diastolica ? Number(props.pa_sistolica).toFixed(1): Number(props.valor).toFixed(1)} 
                    /<span className="parametro-unidade">{props.pa_sistolica ? parseFloat(Number(props.pa_diastolica).toFixed(1)) + props.unidade :
                     props.unidade}</span>
                </div>
                <div className="parametro-status normal">
                    {props.status}
                </div>
            </div>
        </>
    )
}