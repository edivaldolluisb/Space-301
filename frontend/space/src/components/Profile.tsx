interface ProfileProps {
    photo: string;
    name: string;
}

export default function Profile(props: ProfileProps) {
    return (
        <>
            <div className="profile">
                <img className="profile-image" src={props.photo} />
                <div>
                    {props.name}
                </div>
            </div>
        </>
    );
}