import '../styles/profile.css';

interface ProfileProps {
    photo: string;
    name: string;
    id: number;
    setAstronaut: (id: number) => void;
}

export default function Profile(props: ProfileProps) {
    return (
        <>
            <div className="profile" onClick={() => props.setAstronaut(props.id)}>
                <img className="profile-image" src={props.photo} />
                <div>
                    {props.name}
                </div>
            </div>
        </>
    );
}