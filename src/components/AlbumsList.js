import {useAddAlbumMutation, useFetchAlbumsQuery} from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {

    const{data, error, isLoading} = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    }

    let content;
    if (isLoading) {
        content = <Skeleton times={3}/>
    } else if (error) {
        content = <div>Error</div>
    } else {
        content = data.map(album => {
            const header = <div>{album.title}</div>
            return <ExpandablePanel key={album.id} header={header}>
                List of photos
            </ExpandablePanel>
        });
    }

    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Albums for {user.name}</h3>
            <Button onClick={handleAddAlbum} loading={results.isLoading}>
                + add album
            </Button>
        </div>
        <div>
            {content}
        </div>

    </div>
}

export default AlbumsList;