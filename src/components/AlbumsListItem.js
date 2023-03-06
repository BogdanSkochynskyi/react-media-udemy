import {GoTrashcan} from "react-icons/go";
import {useDeleteAlbumMutation} from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

function AlbumsListItem({album, user}) {
    const [deleteAlbum, results] = useDeleteAlbumMutation();
    const handleClick = () => {
        deleteAlbum({album, user});
    }

    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleClick}>
            <GoTrashcan/>
        </Button>{album.title}
    </>
    return <ExpandablePanel header={header}>
        List of photos
    </ExpandablePanel>
}

export default AlbumsListItem;