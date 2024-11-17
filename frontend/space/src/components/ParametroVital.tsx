import '../styles/paramero.css';

interface ParametroVitalProps {
    nome: string;
    valor: string | number;
    unidade: string;
    status: string;
}

export default function ParametroVital(props: ParametroVitalProps) {
    return (
        <>
            <div className="parametro-container">
                <div className="parametro-info">
                    <img className="parametro-photo" />
                    <div>{props.nome}</div>
                </div>
                <div className="parametro-valor">
                    {props.valor} <span className="parametro-unidade">{props.unidade}</span>
                </div>
                <div className="parametro-status normal">
                    {props.status}
                </div>
            </div>
        </>
    )
}