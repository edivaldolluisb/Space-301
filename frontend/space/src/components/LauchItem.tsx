import { Link } from 'react-router-dom';

interface LaunchItemProps {
    id: number;
    name: string;
    date: string;
    status: string;
};

export default function LaunchItem(LaunchItemProps: LaunchItemProps) {
    let id = LaunchItemProps.id
    let name = LaunchItemProps.name
    let date = LaunchItemProps.date
    let status = LaunchItemProps.status

    const getStatusIcon = () => {
        if (status === 'success') return '🟢';
        if (status === 'failure') return '🔴';
    };
    
    return (
        <div className="launch-item">
            <div className="name">
                <span className="icon">{getStatusIcon()}</span>
                <Link to={`/details/${id}`} className="name">
                    {name}
                </Link>
            </div>
            <div className="date">
                <span>{date}</span>
            </div>
        </div>
    );
}