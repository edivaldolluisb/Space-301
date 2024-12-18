import '../styles/profile.css';

interface ProfileProps {
    photo: string;
    name: string;
    id: number;
    setAstronaut: (id: number) => void;
    isActive: boolean;
}

export default function Profile(props: ProfileProps) {
    return (
        <>
            <div className={`profile ${props.isActive ? 'active-astronaut' : ''}`} onClick={() => props.setAstronaut(props.id)}>
                <img className="profile-image" src={props.photo} />
                <div>
                    {props.name}
                </div>
            </div>
        </>
    );
}