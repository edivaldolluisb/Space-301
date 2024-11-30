import { useParams } from 'react-router-dom';

export default function HistoryDetails() {
    const {id} = useParams<{ id: string }>();

    return (
        <></>
    )
}