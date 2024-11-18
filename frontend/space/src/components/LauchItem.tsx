
interface LaunchItemProps {
    name: string;
    date: string;
    status: string;
};

export default function LaunchItem(LaunchItemProps: LaunchItemProps) {
    let name = LaunchItemProps.name
    let date = LaunchItemProps.date
    let status = LaunchItemProps.status

    const getStatusIcon = () => {
        if (status === 'success') return '🟢';
        if (status === 'failure') return '🔴';
    };
    
    return (
        <div className="launch-item">
          <span className="icon">{getStatusIcon()}</span>
          <span className="name">{name}</span>
          <span className="date">{date}</span>
        </div>
    );
}